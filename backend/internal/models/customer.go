package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Customer is a full CRM-style record for billing, shipping, and contact details.
type Customer struct {
	ID                   string    `gorm:"type:uuid;primaryKey" json:"id"`
	CustomerCode         string    `gorm:"size:32;uniqueIndex;not null" json:"customerCode"`
	CompanyName          string    `gorm:"size:255" json:"companyName"`
	LegalName            string    `gorm:"size:255" json:"legalName"`
	ContactName          string    `gorm:"size:255" json:"contactName"`
	Email                string    `gorm:"size:255" json:"email"`
	Phone                string    `gorm:"size:64" json:"phone"`
	AlternatePhone       string    `gorm:"size:64" json:"alternatePhone"`
	Website              string    `gorm:"size:255" json:"website"`
	TaxID                string    `gorm:"size:64" json:"taxId"`
	CustomerType         string    `gorm:"size:32;default:company" json:"customerType"` // company, individual
	Industry             string    `gorm:"size:128" json:"industry"`
	BillingStreet        string    `gorm:"size:255" json:"billingStreet"`
	BillingCity          string    `gorm:"size:128" json:"billingCity"`
	BillingStateProvince string    `gorm:"size:128" json:"billingStateProvince"`
	BillingPostalCode    string    `gorm:"size:32" json:"billingPostalCode"`
	BillingCountry       string    `gorm:"size:128" json:"billingCountry"`
	ShippingStreet       string    `gorm:"size:255" json:"shippingStreet"`
	ShippingCity         string    `gorm:"size:128" json:"shippingCity"`
	ShippingStateProvince string   `gorm:"size:128" json:"shippingStateProvince"`
	ShippingPostalCode   string    `gorm:"size:32" json:"shippingPostalCode"`
	ShippingCountry      string    `gorm:"size:128" json:"shippingCountry"`
	Notes                string    `gorm:"type:text" json:"notes"`
	Status               string    `gorm:"size:32;default:active" json:"status"` // active, inactive, lead
	CreatedAt            time.Time `json:"createdAt"`
	UpdatedAt            time.Time `json:"updatedAt"`
}

func (c *Customer) BeforeCreate(tx *gorm.DB) error {
	if c.ID == "" {
		c.ID = uuid.New().String()
	}
	return nil
}
