package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Employee is full staff registration for HR.
type Employee struct {
	ID                     string     `gorm:"type:uuid;primaryKey" json:"id"`
	EmployeeCode           string     `gorm:"size:32;uniqueIndex;not null" json:"employeeCode"`
	FullName               string     `gorm:"not null" json:"fullName"`
	Email                  string     `gorm:"size:255" json:"email"`
	Phone                  string     `gorm:"size:64" json:"phone"`
	JobTitle               string     `gorm:"size:128" json:"jobTitle"`
	Department             string     `gorm:"size:128" json:"department"`
	StreetAddress          string     `gorm:"size:255" json:"streetAddress"`
	City                   string     `gorm:"size:128" json:"city"`
	Country                string     `gorm:"size:128" json:"country"`
	HireDate               *time.Time `json:"hireDate,omitempty"`
	NationalID             string     `gorm:"size:64" json:"nationalId"`
	EmergencyContactName   string     `gorm:"size:128" json:"emergencyContactName"`
	EmergencyContactPhone  string     `gorm:"size:64" json:"emergencyContactPhone"`
	Notes                  string     `gorm:"type:text" json:"notes"`
	Status                 string     `gorm:"size:32;default:active" json:"status"` // active, inactive
	CreatedAt              time.Time  `json:"createdAt"`
	UpdatedAt              time.Time  `json:"updatedAt"`
	Contracts              []DigitalContract `gorm:"foreignKey:EmployeeID" json:"contracts,omitempty"`
	Salaries               []SalaryRecord    `gorm:"foreignKey:EmployeeID;constraint:OnDelete:CASCADE" json:"salaries,omitempty"`
}

func (e *Employee) BeforeCreate(tx *gorm.DB) error {
	if e.ID == "" {
		e.ID = uuid.New().String()
	}
	return nil
}
