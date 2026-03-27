package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/joho/godotenv"
)

// Branding is used on quotation PDFs and optional print views.
type Branding struct {
	CompanyName    string
	CompanyTagline string
	CompanyAddress string
	// CompanyLocalityLine is the second line under company street (e.g. "Atlanta, GA 30301, USA") when COMPANY_ADDRESS has no newline.
	CompanyLocalityLine string
	CompanyPhone        string
	CompanyEmail        string
	// ProjectToolsLabel replaces PM tool placeholders in client onboarding PDFs (e.g. "Slack, Jira").
	ProjectToolsLabel string
	// OnboardingFeeText replaces $[Amount] in PDFs when set; otherwise neutral wording is used.
	OnboardingFeeText string
	LogoPath          string // optional path on server to PNG/JPG for PDF header
}

// Config holds application configuration loaded from the environment.
type Config struct {
	ServerPort           string
	DSN                  string
	CORSOrigins          []string
	Branding             Branding
	CMSJWTSecret         string // HS256 secret; if empty, CMS API auth is disabled
	CMSBootstrapEmail    string
	CMSBootstrapPassword string // first-run only; create admin if no cms_users exist
	// Optional UUID of a CMS project used when POST /public/requests omits projectId (e.g. Contact Us form).
	GeneralInquiriesProjectID string
}

// Load reads .env from disk (if present) and builds Config from environment variables.
// Tries ./.env then ../.env so `go run` works from backend/ or backend/cmd/.
func Load() (*Config, error) {
	// Overload (not Load) so values from .env replace any broken vars from systemd EnvironmentFile
	_ = godotenv.Overload()
	_ = godotenv.Overload("../.env")

	host := strings.TrimSpace(getEnv("DATABASE_HOST", "localhost"))
	// Default 5432 matches standard PostgreSQL; use DATABASE_PORT=5434 if your local DB uses that.
	port := strings.TrimSpace(getEnv("DATABASE_PORT", "5432"))
	user := strings.TrimSpace(getEnv("DATABASE_USER", "somsuit"))
	pass := strings.TrimSpace(getEnv("DATABASE_PASSWORD", "Somsuit@2026"))
	name := strings.TrimSpace(getEnv("DATABASE_NAME", "somsuit_db"))
	ssl := strings.TrimSpace(getEnv("DATABASE_SSLMODE", "disable"))

	// libpq keyword format with quoted password — avoids @ / : / etc. breaking URL userinfo
	dsn := buildPostgresDSN(host, port, user, pass, name, ssl)

	originsStr := getEnv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173")
	var origins []string
	for _, o := range strings.Split(originsStr, ",") {
		if t := strings.TrimSpace(o); t != "" {
			origins = append(origins, t)
		}
	}

	logoPath := strings.TrimSpace(getEnv("COMPANY_LOGO_PATH", ""))
	if logoPath == "" {
		logoPath = findDefaultLogoPath()
	}

	return &Config{
		ServerPort:           getEnv("SERVER_PORT", "8081"),
		DSN:                  dsn,
		CORSOrigins:          origins,
		CMSJWTSecret:         getEnv("CMS_JWT_SECRET", ""),
		CMSBootstrapEmail:         getEnv("CMS_BOOTSTRAP_EMAIL", ""),
		CMSBootstrapPassword:      getEnv("CMS_BOOTSTRAP_PASSWORD", ""),
		GeneralInquiriesProjectID: strings.TrimSpace(getEnv("CMS_GENERAL_INQUIRIES_PROJECT_ID", "")),
		Branding: Branding{
			CompanyName:         getEnv("COMPANY_NAME", "Somsuite Technology"),
			CompanyTagline:      getEnv("COMPANY_TAGLINE", "Innovative technology solutions"),
			CompanyAddress:      getEnv("COMPANY_ADDRESS", ""),
			CompanyLocalityLine: strings.TrimSpace(getEnv("COMPANY_LOCALITY", "")),
			CompanyPhone:        getEnv("COMPANY_PHONE", ""),
			CompanyEmail:        getEnv("COMPANY_EMAIL", ""),
			ProjectToolsLabel:     strings.TrimSpace(getEnv("COMPANY_PM_TOOLS", "")),
			OnboardingFeeText:     strings.TrimSpace(getEnv("ONBOARDING_FEE_TEXT", "")),
			LogoPath:              logoPath,
		},
	}, nil
}

// findDefaultLogoPath resolves public/logo.png when COMPANY_LOGO_PATH is unset.
// Tries cwd-relative paths (repo root vs backend/), paths next to the executable, and legacy relatives.
func findDefaultLogoPath() string {
	var candidates []string
	add := func(p string) {
		if p == "" {
			return
		}
		if abs, err := filepath.Abs(p); err == nil {
			candidates = append(candidates, abs)
			return
		}
		candidates = append(candidates, p)
	}

	if wd, err := os.Getwd(); err == nil {
		add(filepath.Join(wd, "public", "logo.png"))
		add(filepath.Join(wd, "..", "public", "logo.png"))
		add(filepath.Join(wd, "..", "..", "public", "logo.png"))
	}
	if exe, err := os.Executable(); err == nil {
		dir := filepath.Dir(exe)
		add(filepath.Join(dir, "public", "logo.png"))
		add(filepath.Join(dir, "..", "public", "logo.png"))
		add(filepath.Join(dir, "..", "..", "public", "logo.png"))
	}
	add("public/logo.png")
	add(filepath.Join("..", "public", "logo.png"))
	add(filepath.Join("..", "..", "public", "logo.png"))
	add(filepath.Join("..", "..", "..", "public", "logo.png"))

	seen := make(map[string]struct{})
	for _, c := range candidates {
		if c == "" {
			continue
		}
		if _, ok := seen[c]; ok {
			continue
		}
		seen[c] = struct{}{}
		if st, err := os.Stat(c); err == nil && !st.IsDir() {
			return c
		}
	}
	return ""
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func quoteLibpqPassword(s string) string {
	return "'" + strings.ReplaceAll(s, "'", "''") + "'"
}

func buildPostgresDSN(host, port, user, password, dbname, sslmode string) string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, quoteLibpqPassword(password), dbname, sslmode,
	)
}
