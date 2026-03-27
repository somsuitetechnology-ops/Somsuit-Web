package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// JSON writes a JSON body with the given HTTP status.
func JSON(c *gin.Context, status int, payload any) {
	c.JSON(status, payload)
}

// Error writes a standard error envelope: {"error":"..."}.
func Error(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{"error": message})
}

// NoContent sends 204 without a body.
func NoContent(c *gin.Context) {
	c.Status(http.StatusNoContent)
}
