package handlers

import (
	"net/http"

	"somsuite/backend/internal/models"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// ListSalaries handles GET /salaries?employeeId=
func (h *Handlers) ListSalaries(c *gin.Context) {
	empID := c.Query("employeeId")
	items, err := h.salaries.List(c.Request.Context(), empID)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list salaries")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// GetSalary handles GET /salaries/:id
func (h *Handlers) GetSalary(c *gin.Context) {
	item, err := h.salaries.Get(c.Request.Context(), c.Param("id"))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// CreateSalary handles POST /salaries
func (h *Handlers) CreateSalary(c *gin.Context) {
	var body models.SalaryRecord
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = ""
	body.Employee = nil
	item, err := h.salaries.Create(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateSalary handles PUT /salaries/:id
func (h *Handlers) UpdateSalary(c *gin.Context) {
	id := c.Param("id")
	var body models.SalaryRecord
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = id
	body.Employee = nil
	item, err := h.salaries.Update(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteSalary handles DELETE /salaries/:id
func (h *Handlers) DeleteSalary(c *gin.Context) {
	if err := h.salaries.Delete(c.Request.Context(), c.Param("id")); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}
