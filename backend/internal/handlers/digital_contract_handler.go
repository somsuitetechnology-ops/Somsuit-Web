package handlers

import (
	"fmt"
	"net/http"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/pdf"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

func normalizeContractEmployeeID(d *models.DigitalContract) {
	if d.EmployeeID != nil && strings.TrimSpace(*d.EmployeeID) == "" {
		d.EmployeeID = nil
	}
}

func normalizeContractCustomerID(d *models.DigitalContract) {
	if d.CustomerID != nil && strings.TrimSpace(*d.CustomerID) == "" {
		d.CustomerID = nil
	}
}

func normalizeContractOfferedServiceID(d *models.DigitalContract) {
	if d.OfferedServiceID != nil && strings.TrimSpace(*d.OfferedServiceID) == "" {
		d.OfferedServiceID = nil
	}
}

// ListDigitalContracts handles GET /digital-contracts
func (h *Handlers) ListDigitalContracts(c *gin.Context) {
	items, err := h.contracts.List(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list contracts")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// GetDigitalContract handles GET /digital-contracts/:id
func (h *Handlers) GetDigitalContract(c *gin.Context) {
	item, err := h.contracts.Get(c.Request.Context(), c.Param("id"))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// CreateDigitalContract handles POST /digital-contracts
func (h *Handlers) CreateDigitalContract(c *gin.Context) {
	var body models.DigitalContract
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = ""
	body.Employee = nil
	body.ShareToken = ""
	body.PartySignature = ""
	body.SignedAt = nil
	normalizeContractEmployeeID(&body)
	item, err := h.contracts.Create(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateDigitalContract handles PUT /digital-contracts/:id
func (h *Handlers) UpdateDigitalContract(c *gin.Context) {
	id := c.Param("id")
	cur, err := h.contracts.Get(c.Request.Context(), id)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	var body models.DigitalContract
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	body.ID = id
	body.Employee = nil
	body.Customer = nil
	body.OfferedService = nil
	body.ShareToken = cur.ShareToken
	if strings.TrimSpace(body.PartySignature) == "" && strings.TrimSpace(cur.PartySignature) != "" {
		body.PartySignature = cur.PartySignature
	}
	if body.SignedAt == nil && cur.SignedAt != nil {
		body.SignedAt = cur.SignedAt
	}
	normalizeContractEmployeeID(&body)
	normalizeContractCustomerID(&body)
	normalizeContractOfferedServiceID(&body)
	item, err := h.contracts.Update(c.Request.Context(), &body)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteDigitalContract handles DELETE /digital-contracts/:id
func (h *Handlers) DeleteDigitalContract(c *gin.Context) {
	if err := h.contracts.Delete(c.Request.Context(), c.Param("id")); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}

// GetDigitalContractPDF handles GET /digital-contracts/:id/pdf
func (h *Handlers) GetDigitalContractPDF(c *gin.Context) {
	id := c.Param("id")
	d, err := h.contracts.Get(c.Request.Context(), id)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	b, err := pdf.ContractPDF(d, h.branding)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to render PDF")
		return
	}
	safe := strings.Map(func(r rune) rune {
		if r >= 'a' && r <= 'z' || r >= 'A' && r <= 'Z' || r >= '0' && r <= '9' || r == '-' {
			return r
		}
		return '-'
	}, d.Title)
	if safe == "" {
		safe = "contract"
	}
	filename := fmt.Sprintf("contract-%s.pdf", safe)
	c.Header("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, filename))
	c.Data(http.StatusOK, "application/pdf", b)
}
