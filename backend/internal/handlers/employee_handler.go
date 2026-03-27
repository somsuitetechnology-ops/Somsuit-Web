package handlers

import (
	"net/http"

	"somsuite/backend/internal/models"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// ListEmployees handles GET /employees
func (h *Handlers) ListEmployees(c *gin.Context) {
	items, err := h.employees.List(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list employees")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// GetEmployee handles GET /employees/:id
func (h *Handlers) GetEmployee(c *gin.Context) {
	item, err := h.employees.Get(c.Request.Context(), c.Param("id"))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// CreateEmployee handles POST /employees
func (h *Handlers) CreateEmployee(c *gin.Context) {
	var body models.Employee
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = ""
	body.Contracts = nil
	body.Salaries = nil
	item, err := h.employees.Create(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateEmployee handles PUT /employees/:id
func (h *Handlers) UpdateEmployee(c *gin.Context) {
	id := c.Param("id")
	var body models.Employee
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = id
	body.Contracts = nil
	body.Salaries = nil
	item, err := h.employees.Update(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteEmployee handles DELETE /employees/:id
func (h *Handlers) DeleteEmployee(c *gin.Context) {
	if err := h.employees.Delete(c.Request.Context(), c.Param("id")); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}
