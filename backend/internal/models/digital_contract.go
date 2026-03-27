package models

import (
	"strings"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// DigitalContract stores contracts for customers (commercial) or employees (ICT employment style).
// ShareToken is used for a public signing link (no JWT). Signatures are PNG/JPEG as data URLs or raw base64.
type DigitalContract struct {
	ID               string           `gorm:"type:uuid;primaryKey" json:"id"`
	EmployeeID       *string          `gorm:"type:uuid;index" json:"employeeId,omitempty"`
	Employee         *Employee        `gorm:"foreignKey:EmployeeID;constraint:OnDelete:SET NULL" json:"employee,omitempty"`
	CustomerID       *string          `gorm:"type:uuid;index" json:"customerId,omitempty"`
	Customer         *Customer        `gorm:"foreignKey:CustomerID;constraint:OnDelete:SET NULL" json:"customer,omitempty"`
	OfferedServiceID *string          `gorm:"type:uuid;index" json:"offeredServiceId,omitempty"`
	OfferedService   *OfferedService  `gorm:"foreignKey:OfferedServiceID;constraint:OnDelete:SET NULL" json:"offeredService,omitempty"`
	ContractKind     string           `gorm:"size:24;default:customer;index" json:"contractKind"` // customer | employee
	ShareToken     string     `gorm:"size:36;index" json:"shareToken"`
	Title          string     `gorm:"not null" json:"title"`
	PartyName      string     `gorm:"size:255" json:"partyName"`
	PartyEmail     string     `gorm:"size:255" json:"partyEmail"`
	Content        string     `gorm:"type:text;not null" json:"content"`
	Status         string     `gorm:"size:32;default:draft" json:"status"` // draft, sent, signed
	CeoName        string     `gorm:"size:255" json:"ceoName"`
	CeoSignature   string     `gorm:"type:text" json:"ceoSignature"`   // data URL or base64 image (company side)
	PartySignature string     `gorm:"type:text" json:"partySignature"` // customer/employee signature after public sign
	SignedAt       *time.Time `json:"signedAt,omitempty"`
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt      time.Time  `json:"updatedAt"`
}

func (d *DigitalContract) BeforeCreate(tx *gorm.DB) error {
	if d.ID == "" {
		d.ID = uuid.New().String()
	}
	return nil
}

// BeforeSave ensures every contract has a secret link token for sharing/signing.
func (d *DigitalContract) BeforeSave(tx *gorm.DB) error {
	if strings.TrimSpace(d.ShareToken) == "" {
		d.ShareToken = uuid.New().String()
	}
	return nil
}
