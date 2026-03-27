package handlers

import (
	"net/http"

	"somsuite/backend/internal/models"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// ListOfferedServices handles GET /offered-services
func (h *Handlers) ListOfferedServices(c *gin.Context) {
	items, err := h.offeredCatalog.List(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list offered services")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// GetOfferedService handles GET /offered-services/:id
func (h *Handlers) GetOfferedService(c *gin.Context) {
	item, err := h.offeredCatalog.Get(c.Request.Context(), c.Param("id"))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// CreateOfferedService handles POST /offered-services
func (h *Handlers) CreateOfferedService(c *gin.Context) {
	var body models.OfferedService
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = ""
	item, err := h.offeredCatalog.Create(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateOfferedService handles PUT /offered-services/:id
func (h *Handlers) UpdateOfferedService(c *gin.Context) {
	id := c.Param("id")
	var body models.OfferedService
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = id
	item, err := h.offeredCatalog.Update(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteOfferedService handles DELETE /offered-services/:id
func (h *Handlers) DeleteOfferedService(c *gin.Context) {
	if err := h.offeredCatalog.Delete(c.Request.Context(), c.Param("id")); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}
