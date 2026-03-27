package services

import (
	"context"
	"errors"
	"strings"
	"time"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrCmsAuthInvalid = errors.New("invalid email or password")
	ErrCmsAuthConfig  = errors.New("cms auth is not configured")
)

type CmsAuthService struct {
	repo   repositories.CmsUserRepository
	secret string
}

func NewCmsAuthService(repo repositories.CmsUserRepository, jwtSecret string) *CmsAuthService {
	return &CmsAuthService{repo: repo, secret: jwtSecret}
}

type CmsJWTClaims struct {
	Email string `json:"email"`
	Role  string `json:"role"`
	jwt.RegisteredClaims
}

func (s *CmsAuthService) Enabled() bool {
	return strings.TrimSpace(s.secret) != ""
}

// Login checks credentials and returns a signed JWT and public user profile.
func (s *CmsAuthService) Login(ctx context.Context, email, password string) (token string, user *models.CmsUser, err error) {
	if !s.Enabled() {
		return "", nil, ErrCmsAuthConfig
	}
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" || password == "" {
		return "", nil, ErrCmsAuthInvalid
	}
	u, err := s.repo.FindByEmail(ctx, email)
	if err != nil {
		return "", nil, err
	}
	if u == nil {
		return "", nil, ErrCmsAuthInvalid
	}
	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)); err != nil {
		return "", nil, ErrCmsAuthInvalid
	}
	now := time.Now()
	claims := CmsJWTClaims{
		Email: u.Email,
		Role:  u.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   u.ID,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(7 * 24 * time.Hour)),
		},
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err = t.SignedString([]byte(s.secret))
	if err != nil {
		return "", nil, err
	}
	return token, u, nil
}

// ParseToken validates a Bearer JWT and returns claims.
// UserByID loads a CMS user for /auth/me.
func (s *CmsAuthService) UserByID(ctx context.Context, id string) (*models.CmsUser, error) {
	return s.repo.FindByID(ctx, id)
}

func (s *CmsAuthService) ParseToken(tokenString string) (*CmsJWTClaims, error) {
	if !s.Enabled() {
		return nil, ErrCmsAuthConfig
	}
	token, err := jwt.ParseWithClaims(tokenString, &CmsJWTClaims{}, func(t *jwt.Token) (interface{}, error) {
		if t.Method != jwt.SigningMethodHS256 {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(s.secret), nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*CmsJWTClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}

// HashPassword returns a bcrypt hash for storing new users.
func HashCMSPassword(plain string) (string, error) {
	b, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(b), nil
}
