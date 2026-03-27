package handlers

import (
	"net/http"
	"strings"
	"time"

	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type publicContractResponse struct {
	Title         string `json:"title"`
	Content       string `json:"content"`
	PartyName     string `json:"partyName"`
	PartyEmail    string `json:"partyEmail"`
	ContractKind  string `json:"contractKind"`
	Status        string `json:"status"`
	CeoName       string `json:"ceoName"`
	AlreadySigned bool   `json:"alreadySigned"`
	SignedAt      string `json:"signedAt,omitempty"`
	EmployeeName  string `json:"employeeName,omitempty"`
}

// GetPublicContract handles GET /public/contracts/:token (no JWT).
func (h *Handlers) GetPublicContract(c *gin.Context) {
	token := strings.TrimSpace(c.Param("token"))
	d, err := h.contracts.GetByShareToken(c.Request.Context(), token)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	var signedAt string
	if d.SignedAt != nil {
		signedAt = d.SignedAt.UTC().Format(time.RFC3339)
	}
	empName := ""
	if d.Employee != nil {
		empName = d.Employee.FullName
	}
	response.JSON(c, http.StatusOK, publicContractResponse{
		Title:         d.Title,
		Content:       d.Content,
		PartyName:     d.PartyName,
		PartyEmail:    d.PartyEmail,
		ContractKind:  d.ContractKind,
		Status:        d.Status,
		CeoName:       d.CeoName,
		AlreadySigned: d.Status == "signed" && strings.TrimSpace(d.PartySignature) != "",
		SignedAt:      signedAt,
		EmployeeName:  empName,
	})
}

type publicSignBody struct {
	Signature string `json:"signature" binding:"required"`
}

// PostPublicContractSign handles POST /public/contracts/:token/sign (no JWT).
func (h *Handlers) PostPublicContractSign(c *gin.Context) {
	token := strings.TrimSpace(c.Param("token"))
	var body publicSignBody
	if err := c.ShouldBindJSON(&body); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid JSON body")
		return
	}
	item, err := h.contracts.SubmitPartySignature(c.Request.Context(), token, body.Signature)
	if err != nil {
		h.mapServiceError(c, err)
		return
	}
	response.JSON(c, http.StatusOK, gin.H{"ok": true, "status": item.Status})
}
