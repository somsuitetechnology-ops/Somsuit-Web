package handlers

import (
	"net/http"

	"somsuite/backend/internal/models"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// ListCustomers handles GET /customers
func (h *Handlers) ListCustomers(c *gin.Context) {
	items, err := h.customers.List(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list customers")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// GetCustomer handles GET /customers/:id
func (h *Handlers) GetCustomer(c *gin.Context) {
	item, err := h.customers.Get(c.Request.Context(), c.Param("id"))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// CreateCustomer handles POST /customers
func (h *Handlers) CreateCustomer(c *gin.Context) {
	var body models.Customer
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = ""
	item, err := h.customers.Create(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateCustomer handles PUT /customers/:id
func (h *Handlers) UpdateCustomer(c *gin.Context) {
	id := c.Param("id")
	var body models.Customer
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = id
	item, err := h.customers.Update(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteCustomer handles DELETE /customers/:id
func (h *Handlers) DeleteCustomer(c *gin.Context) {
	if err := h.customers.Delete(c.Request.Context(), c.Param("id")); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}
