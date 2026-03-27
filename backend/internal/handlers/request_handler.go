package handlers

import (
	"net/http"
	"strings"

	"somsuite/backend/internal/services"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type createRequestBody struct {
	Name        string `json:"name" binding:"required"`
	Service     string `json:"service" binding:"required"`
	Description string `json:"description"`
	ProjectID   string `json:"projectId" binding:"required"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Company     string `json:"company"`
}

type updateRequestBody struct {
	Name        string `json:"name" binding:"required"`
	Service     string `json:"service" binding:"required"`
	Description string `json:"description"`
	ProjectID   string `json:"projectId" binding:"required"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Company     string `json:"company"`
}

type publicCreateRequestBody struct {
	Name        string `json:"name" binding:"required"`
	Service     string `json:"service" binding:"required"`
	Description string `json:"description"`
	ProjectID   string `json:"projectId"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Company     string `json:"company"`
}

// ListRequests handles GET /requests?projectId=
func (h *Handlers) ListRequests(c *gin.Context) {
	var projID *string
	if v := c.Query("projectId"); v != "" {
		projID = &v
	}
	items, err := h.requests.List(c.Request.Context(), projID)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list requests")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// CreateRequest handles POST /requests
func (h *Handlers) CreateRequest(c *gin.Context) {
	var body createRequestBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	item, err := h.requests.Create(c.Request.Context(), services.RequestCreateInput{
		Name:        body.Name,
		Service:     body.Service,
		Description: body.Description,
		ProjectID:   body.ProjectID,
		Email:       body.Email,
		Phone:       body.Phone,
		Company:     body.Company,
	})
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// CreatePublicRequest handles POST /public/requests (no JWT).
// If projectId is empty, uses Handlers.generalInquiriesProjectID when set.
func (h *Handlers) CreatePublicRequest(c *gin.Context) {
	var body publicCreateRequestBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	projectID := strings.TrimSpace(body.ProjectID)
	if projectID == "" {
		projectID = strings.TrimSpace(h.generalInquiriesProjectID)
	}
	if projectID == "" {
		response.Error(c, http.StatusBadRequest, "projectId is required (pick a project), or set CMS_GENERAL_INQUIRIES_PROJECT_ID on the server for general contact messages")
		return
	}
	item, err := h.requests.Create(c.Request.Context(), services.RequestCreateInput{
		Name:        body.Name,
		Service:     body.Service,
		Description: body.Description,
		ProjectID:   projectID,
		Email:       body.Email,
		Phone:       body.Phone,
		Company:     body.Company,
	})
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateRequest handles PUT /requests/:id
func (h *Handlers) UpdateRequest(c *gin.Context) {
	id := c.Param("id")
	var body updateRequestBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	item, err := h.requests.Update(c.Request.Context(), services.RequestUpdateInput{
		ID:          id,
		Name:        body.Name,
		Service:     body.Service,
		Description: body.Description,
		ProjectID:   body.ProjectID,
		Email:       body.Email,
		Phone:       body.Phone,
		Company:     body.Company,
	})
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteRequest handles DELETE /requests/:id
func (h *Handlers) DeleteRequest(c *gin.Context) {
	id := c.Param("id")
	if err := h.requests.Delete(c.Request.Context(), id); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}
