package handlers

import (
	"net/http"

	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type createCategoryBody struct {
	Name string `json:"name" binding:"required"`
}

type updateCategoryBody struct {
	Name string `json:"name" binding:"required"`
}

// ListCategories handles GET /categories
func (h *Handlers) ListCategories(c *gin.Context) {
	items, err := h.categories.List(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list categories")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// CreateCategory handles POST /categories
func (h *Handlers) CreateCategory(c *gin.Context) {
	var body createCategoryBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	item, err := h.categories.Create(c.Request.Context(), body.Name)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateCategory handles PUT /categories/:id
func (h *Handlers) UpdateCategory(c *gin.Context) {
	id := c.Param("id")
	var body updateCategoryBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	item, err := h.categories.Update(c.Request.Context(), id, body.Name)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteCategory handles DELETE /categories/:id
func (h *Handlers) DeleteCategory(c *gin.Context) {
	id := c.Param("id")
	if err := h.categories.Delete(c.Request.Context(), id); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}
