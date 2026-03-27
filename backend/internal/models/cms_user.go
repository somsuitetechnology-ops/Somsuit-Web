package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// CmsUser is a dashboard/CMS login account (JWT auth).
type CmsUser struct {
	ID           string    `gorm:"type:uuid;primaryKey" json:"id"`
	Email        string    `gorm:"size:255;uniqueIndex;not null" json:"email"`
	PasswordHash string    `gorm:"size:255;not null" json:"-"`
	Name         string    `gorm:"size:128;not null" json:"name"`
	Role         string    `gorm:"size:32;default:admin" json:"role"` // admin, staff
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

func (u *CmsUser) BeforeCreate(tx *gorm.DB) error {
	if u.ID == "" {
		u.ID = uuid.New().String()
	}
	return nil
}
