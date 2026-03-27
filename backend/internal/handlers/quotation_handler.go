package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/pdf"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

func parseFlexibleDate(s string) (time.Time, error) {
	if t, err := time.Parse("2006-01-02", s); err == nil {
		return t, nil
	}
	return time.Parse(time.RFC3339, s)
}

type quotationLineInput struct {
	Description string  `json:"description" binding:"required"`
	Quantity    float64 `json:"quantity" binding:"gt=0"`
	UnitPrice   float64 `json:"unitPrice" binding:"gte=0"`
}

type quotationUpsertBody struct {
	CustomerName    string               `json:"customerName" binding:"required"`
	CustomerEmail   string               `json:"customerEmail"`
	CustomerCompany string               `json:"customerCompany"`
	CustomerAddress string               `json:"customerAddress"`
	TaxPercent      float64              `json:"taxPercent"`
	ValidUntil      *string              `json:"validUntil"`
	Status          string               `json:"status"`
	Notes           string               `json:"notes"`
	Lines           []quotationLineInput `json:"lines" binding:"required,min=1,dive"`
}

func bodyToQuotation(b quotationUpsertBody, id string) (*models.Quotation, []models.QuotationLine, error) {
	q := &models.Quotation{
		ID:               id,
		CustomerName:     b.CustomerName,
		CustomerEmail:    b.CustomerEmail,
		CustomerCompany:  b.CustomerCompany,
		CustomerAddress:  b.CustomerAddress,
		TaxPercent:       b.TaxPercent,
		Status:           b.Status,
		Notes:            b.Notes,
	}
	if b.ValidUntil != nil && strings.TrimSpace(*b.ValidUntil) != "" {
		s := strings.TrimSpace(*b.ValidUntil)
		parsed, err := parseFlexibleDate(s)
		if err != nil {
			return nil, nil, err
		}
		q.ValidUntil = &parsed
	}
	lines := make([]models.QuotationLine, len(b.Lines))
	for i := range b.Lines {
		lines[i] = models.QuotationLine{
			Description: b.Lines[i].Description,
			Quantity:    b.Lines[i].Quantity,
			UnitPrice:   b.Lines[i].UnitPrice,
		}
	}
	return q, lines, nil
}

// ListQuotations handles GET /quotations
func (h *Handlers) ListQuotations(c *gin.Context) {
	items, err := h.quotations.List(c.Request.Context())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to list quotations")
		return
	}
	response.JSON(c, http.StatusOK, items)
}

// GetQuotation handles GET /quotations/:id
func (h *Handlers) GetQuotation(c *gin.Context) {
	item, err := h.quotations.Get(c.Request.Context(), c.Param("id"))
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// CreateQuotation handles POST /quotations
func (h *Handlers) CreateQuotation(c *gin.Context) {
	var body quotationUpsertBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	q, lines, err := bodyToQuotation(body, "")
	if err != nil {
		response.Error(c, http.StatusBadRequest, "invalid validUntil date")
		return
	}
	item, err := h.quotations.Create(c.Request.Context(), q, lines)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusCreated, item)
}

// UpdateQuotation handles PUT /quotations/:id
func (h *Handlers) UpdateQuotation(c *gin.Context) {
	id := c.Param("id")
	var body quotationUpsertBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	q, lines, err := bodyToQuotation(body, id)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "invalid validUntil date")
		return
	}
	item, err := h.quotations.Update(c.Request.Context(), q, lines)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, item)
}

// DeleteQuotation handles DELETE /quotations/:id
func (h *Handlers) DeleteQuotation(c *gin.Context) {
	if err := h.quotations.Delete(c.Request.Context(), c.Param("id")); err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.NoContent(c)
}

// GetQuotationPDF handles GET /quotations/:id/pdf
func (h *Handlers) GetQuotationPDF(c *gin.Context) {
	id := c.Param("id")
	q, err := h.quotations.Get(c.Request.Context(), id)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	b, err := pdf.QuotationPDF(q, h.branding)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "failed to render PDF")
		return
	}
	filename := fmt.Sprintf("quotation-%s.pdf", strings.ReplaceAll(q.QuoteNumber, "/", "-"))
	c.Header("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, filename))
	c.Data(http.StatusOK, "application/pdf", b)
}
