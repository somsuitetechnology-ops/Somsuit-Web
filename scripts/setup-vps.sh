#!/usr/bin/env bash
# Run ON the VPS as root after: ssh root@YOUR_SERVER_IP
# Usage: DOMAIN=app.example.com bash scripts/setup-vps.sh
# Optional: GIT_REPO=https://github.com/somsuitetechnology-ops/Somsuit-Web.git APP_DIR=/var/www/somsuite

set -euo pipefail

DOMAIN="${DOMAIN:-}"
GIT_REPO="${GIT_REPO:-https://github.com/somsuitetechnology-ops/Somsuit-Web.git}"
APP_DIR="${APP_DIR:-/var/www/somsuite}"
NODE_MAJOR="${NODE_MAJOR:-22}"

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

echo "==> APT update & base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl ca-certificates git ufw nginx

echo "==> Firewall (SSH + HTTP + HTTPS)"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
yes | ufw enable || true

echo "==> Node.js ${NODE_MAJOR}.x"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 18 ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

echo "==> PM2"
npm install -g pm2

echo "==> App directory & clone"
mkdir -p "$(dirname "$APP_DIR")"
if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" pull --ff-only
elif [[ ! -e "$APP_DIR" ]]; then
  git clone "$GIT_REPO" "$APP_DIR"
else
  echo "ERROR: $APP_DIR exists but is not a git repo. Move or remove it, then re-run."
  exit 1
fi

cd "$APP_DIR"

if [[ ! -f .env ]]; then
  if [[ -f .env.example ]]; then
    cp .env.example .env
    echo "Created .env from .env.example — EDIT IT: nano $APP_DIR/.env"
  else
    echo "WARNING: No .env — create $APP_DIR/.env before production use."
  fi
fi

echo "==> npm install & build"
npm ci
npm run build

echo "==> PM2 app"
pm2 delete somsuite 2>/dev/null || true
pm2 start npm --name somsuite -- start
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || pm2 startup

if [[ -n "$DOMAIN" ]]; then
  echo "==> Nginx site for $DOMAIN"
  cat >"/etc/nginx/sites-available/somsuite" <<NGX
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGX
  ln -sf /etc/nginx/sites-available/somsuite /etc/nginx/sites-enabled/somsuite
  rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
  nginx -t
  systemctl reload nginx
  echo "==> SSL (optional): apt install certbot python3-certbot-nginx && certbot --nginx -d $DOMAIN"
else
  echo "Skip Nginx vhost (set DOMAIN=your.domain.com to configure)."
  echo "App listens on http://127.0.0.1:3000 — point Nginx or open port 3000 manually."
fi

echo "==> Done. Check: curl -sI http://127.0.0.1:3000 | head -5"
echo "    Logs: pm2 logs somsuite"
