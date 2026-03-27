package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// SalaryRecord is one payroll entry for an employee (period + amount).
type SalaryRecord struct {
	ID         string    `gorm:"type:uuid;primaryKey" json:"id"`
	EmployeeID string    `gorm:"type:uuid;not null;index" json:"employeeId"`
	Employee   *Employee `gorm:"foreignKey:EmployeeID" json:"employee,omitempty"`
	Amount     float64   `gorm:"not null" json:"amount"`
	Currency   string    `gorm:"size:8;default:USD" json:"currency"`
	Period     string    `gorm:"size:16;not null" json:"period"` // e.g. 2025-03
	Paid       bool      `gorm:"default:false" json:"paid"`
	Notes      string    `gorm:"type:text" json:"notes"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

func (s *SalaryRecord) BeforeCreate(tx *gorm.DB) error {
	if s.ID == "" {
		s.ID = uuid.New().String()
	}
	return nil
}
