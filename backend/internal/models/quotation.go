package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Quotation is a customer quote with line items; PDF is generated on demand.
type Quotation struct {
	ID               string           `gorm:"type:uuid;primaryKey" json:"id"`
	QuoteNumber      string           `gorm:"size:32;uniqueIndex;not null" json:"quoteNumber"`
	CustomerName     string           `gorm:"not null" json:"customerName"`
	CustomerEmail    string           `gorm:"size:255" json:"customerEmail"`
	CustomerCompany  string           `gorm:"size:255" json:"customerCompany"`
	CustomerAddress  string           `gorm:"type:text" json:"customerAddress"`
	TaxPercent       float64          `gorm:"default:0" json:"taxPercent"`
	ValidUntil       *time.Time       `json:"validUntil,omitempty"`
	Status           string           `gorm:"size:32;default:draft" json:"status"` // draft, sent, accepted
	Notes            string           `gorm:"type:text" json:"notes"`
	Lines            []QuotationLine  `gorm:"foreignKey:QuotationID;constraint:OnDelete:CASCADE" json:"lines,omitempty"`
	CreatedAt        time.Time        `json:"createdAt"`
	UpdatedAt        time.Time        `json:"updatedAt"`
}

func (q *Quotation) BeforeCreate(tx *gorm.DB) error {
	if q.ID == "" {
		q.ID = uuid.New().String()
	}
	return nil
}

// QuotationLine is one priced row on a quotation.
type QuotationLine struct {
	ID           string  `gorm:"type:uuid;primaryKey" json:"id"`
	QuotationID  string  `gorm:"type:uuid;not null;index" json:"quotationId"`
	Description  string  `gorm:"type:text;not null" json:"description"`
	Quantity     float64 `gorm:"not null" json:"quantity"`
	UnitPrice    float64 `gorm:"not null" json:"unitPrice"`
	SortOrder    int     `gorm:"default:0" json:"sortOrder"`
}

func (l *QuotationLine) BeforeCreate(tx *gorm.DB) error {
	if l.ID == "" {
		l.ID = uuid.New().String()
	}
	return nil
}
