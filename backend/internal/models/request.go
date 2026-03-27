package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Request is a service request tied to a project.
type Request struct {
	ID          string   `gorm:"type:uuid;primaryKey" json:"id"`
	Name        string   `gorm:"not null" json:"name"`
	Service     string   `gorm:"not null" json:"service"`
	Description string   `gorm:"type:text;not null" json:"description"`
	ProjectID   string   `gorm:"type:uuid;not null;index" json:"projectId"`
	Project     *Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE" json:"project,omitempty"`
	Email       string   `gorm:"size:255" json:"email"`
	Phone       string   `gorm:"size:64" json:"phone"`
	Company     string   `gorm:"size:255" json:"company"`
}

func (r *Request) BeforeCreate(tx *gorm.DB) error {
	if r.ID == "" {
		r.ID = uuid.New().String()
	}
	return nil
}
