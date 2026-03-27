package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Category groups projects.
type Category struct {
	ID       string    `gorm:"type:uuid;primaryKey" json:"id"`
	Name     string    `gorm:"not null" json:"name"`
	Projects []Project `gorm:"foreignKey:CategoryID;constraint:OnDelete:CASCADE" json:"projects,omitempty"`
}

func (c *Category) BeforeCreate(tx *gorm.DB) error {
	if c.ID == "" {
		c.ID = uuid.New().String()
	}
	return nil
}
