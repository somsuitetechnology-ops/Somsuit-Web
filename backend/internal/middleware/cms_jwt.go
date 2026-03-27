package middleware

import (
	"net/http"
	"strings"

	"somsuite/backend/internal/services"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// CMSJWTAuth requires a valid Bearer JWT for CMS API routes when auth is enabled.
// When the auth service has no secret configured, it becomes a no-op (backward compatible).
func CMSJWTAuth(auth *services.CmsAuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		if auth == nil || !auth.Enabled() {
			c.Next()
			return
		}
		h := c.GetHeader("Authorization")
		const p = "Bearer "
		if !strings.HasPrefix(h, p) {
			response.Error(c, http.StatusUnauthorized, "authentication required")
			c.Abort()
			return
		}
		raw := strings.TrimSpace(strings.TrimPrefix(h, p))
		if raw == "" {
			response.Error(c, http.StatusUnauthorized, "authentication required")
			c.Abort()
			return
		}
		claims, err := auth.ParseToken(raw)
		if err != nil {
			response.Error(c, http.StatusUnauthorized, "invalid or expired token")
			c.Abort()
			return
		}
		c.Set("cmsUserID", claims.Subject)
		c.Set("cmsEmail", claims.Email)
		c.Set("cmsRole", claims.Role)
		c.Next()
	}
}
