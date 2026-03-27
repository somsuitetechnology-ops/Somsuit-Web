package handlers

import (
	"errors"
	"net/http"

	"somsuite/backend/internal/services"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// AuthStatus handles GET /auth/status (public) — whether JWT protection is active.
func (h *Handlers) AuthStatus(c *gin.Context) {
	enabled := h.auth != nil && h.auth.Enabled()
	response.JSON(c, http.StatusOK, gin.H{"cmsAuthEnabled": enabled})
}

type loginBody struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Login handles POST /auth/login (public).
func (h *Handlers) Login(c *gin.Context) {
	if h.auth == nil || !h.auth.Enabled() {
		response.Error(c, http.StatusServiceUnavailable, "CMS authentication is not enabled (set CMS_JWT_SECRET)")
		return
	}
	var body loginBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	token, user, err := h.auth.Login(c.Request.Context(), body.Email, body.Password)
	if err != nil {
		if errors.Is(err, services.ErrCmsAuthInvalid) {
			response.Error(c, http.StatusUnauthorized, "invalid email or password")
			return
		}
		response.Error(c, http.StatusInternalServerError, "login failed")
		return
	}
	response.JSON(c, http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
			"role":  user.Role,
		},
	})
}

// Me handles GET /auth/me (protected when JWT middleware is applied).
func (h *Handlers) Me(c *gin.Context) {
	if h.auth == nil || !h.auth.Enabled() {
		response.Error(c, http.StatusServiceUnavailable, "CMS authentication is not enabled")
		return
	}
	id := c.GetString("cmsUserID")
	if id == "" {
		response.Error(c, http.StatusUnauthorized, "authentication required")
		return
	}
	user, err := h.auth.UserByID(c.Request.Context(), id)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to load user")
		return
	}
	if user == nil {
		response.Error(c, http.StatusUnauthorized, "user not found")
		return
	}
	response.JSON(c, http.StatusOK, gin.H{
		"id":    user.ID,
		"email": user.Email,
		"name":  user.Name,
		"role":  user.Role,
	})
}
