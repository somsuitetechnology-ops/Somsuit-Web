package handlers

import (
	"net/http"

	"somsuite/backend/internal/models"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

type createProjectBody struct {
	Name           string   `json:"name" binding:"required"`
	Description    string   `json:"description"`
	CoverImage     string   `json:"coverImage"`
	Image          string   `json:"image"` // legacy alias for coverImage
	GalleryImages  []string `json:"galleryImages"`
	Tags           []string `json:"tags"`
	CategoryID     string   `json:"categoryId" binding:"required"`
	ProjectLink    string   `json:"projectLink"`
	Badge          string   `json:"badge"`
	IconURL        string   `json:"iconUrl"`
	DisplayType    string   `json:"displayType"`
}

func bodyToProjectCreate(body createProjectBody) *models.Project {
	cover := body.CoverImage
	if cover == "" {
		cover = body.Image
	}
	return &models.Project{
		Name:          body.Name,
		Description:   body.Description,
		CoverImage:    cover,
		GalleryImages: pq.StringArray(append([]string(nil), body.GalleryImages...)),
		Tags:          pq.StringArray(append([]string(nil), body.Tags...)),
		CategoryID:    body.CategoryID,
		ProjectLink:   body.ProjectLink,
		Badge:         body.Badge,
		IconURL:       body.IconURL,
		DisplayType:   body.DisplayType,
	}
}

type updateProjectBody struct {
	Name           string   `json:"name" binding:"required"`
	Description    string   `json:"description"`
	CoverImage     string   `json:"coverImage"`
	Image          string   `json:"image"`
	GalleryImages  []string `json:"galleryImages"`
	Tags           []string `json:"tags"`
	CategoryID     string   `json:"categoryId" binding:"required"`
	ProjectLink    string   `json:"projectLink"`
	Badge          string   `json:"badge"`
	IconURL        string   `json:"iconUrl"`
	DisplayType    string   `json:"displayType"`
}

func bodyToProjectUpdate(id string, body updateProjectBody, cur *models.Project) *models.Project {
	cover := body.CoverImage
	if cover == "" {
		cover = body.Image
	}
	return &models.Project{
		ID:            id,
		Name:          body.Name,
		Description:   body.Description,
		CoverImage:    cover,
		GalleryImages: pq.StringArray(append([]string(nil), body.GalleryImages...)),
		Tags:          pq.StringArray(append([]string(nil), body.Tags...)),
		CategoryID:    body.CategoryID,
		ProjectLink:   body.ProjectLink,
		Badge:         body.Badge,
		IconURL:       body.IconURL,
		DisplayType:   body.DisplayType,
		CreatedAt:     cur.CreatedAt,
	}
}

// ListProjects handles GET /projects?categoryId=
func (h *Handlers) ListProjects(c *gin.Context) {
	var catID *string
	if v := c.Query("categoryId"); v != "" {
		catID = &v
	}
	items, err := h.projects.List(c.Request.Context(), catID)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list projects")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// CreateProject handles POST /projects
func (h *Handlers) CreateProject(c *gin.Context) {
	var body createProjectBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	item, err := h.projects.Create(c.Request.Context(), bodyToProjectCreate(body))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateProject handles PUT /projects/:id
func (h *Handlers) UpdateProject(c *gin.Context) {
	id := c.Param("id")
	var body updateProjectBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	cur, err := h.projects.Get(c.Request.Context(), id)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	item, err := h.projects.Update(c.Request.Context(), bodyToProjectUpdate(id, body, cur))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteProject handles DELETE /projects/:id
func (h *Handlers) DeleteProject(c *gin.Context) {
	id := c.Param("id")
	if err := h.projects.Delete(c.Request.Context(), id); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}
