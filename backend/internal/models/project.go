package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// Project belongs to a category and owns requests.
// CoverImage maps to legacy DB column "image". GalleryImages and Tags are PostgreSQL text[].
type Project struct {
	ID            string         `gorm:"type:uuid;primaryKey" json:"id"`
	Name          string         `gorm:"not null" json:"name"`
	Description   string         `gorm:"type:text;not null" json:"description"`
	CoverImage    string         `gorm:"column:image;not null" json:"coverImage"`
	GalleryImages pq.StringArray `gorm:"type:text[]" json:"galleryImages"`
	Tags          pq.StringArray `gorm:"type:text[]" json:"tags"`
	CategoryID    string         `gorm:"type:uuid;not null;index" json:"categoryId"`
	Category      *Category      `gorm:"foreignKey:CategoryID;constraint:OnDelete:CASCADE" json:"category,omitempty"`
	ProjectLink   string         `gorm:"size:2048" json:"projectLink"`
	Badge         string         `gorm:"size:255" json:"badge"`
	IconURL       string         `gorm:"size:2048" json:"iconUrl"`
	DisplayType   string         `gorm:"size:128" json:"displayType"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	Requests      []Request      `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE" json:"requests,omitempty"`
}

func (p *Project) BeforeCreate(tx *gorm.DB) error {
	if p.ID == "" {
		p.ID = uuid.New().String()
	}
	return nil
}

// AfterFind normalizes NULL text[] from DB to empty slices for stable JSON.
func (p *Project) AfterFind(tx *gorm.DB) error {
	if p.GalleryImages == nil {
		p.GalleryImages = pq.StringArray{}
	}
	if p.Tags == nil {
		p.Tags = pq.StringArray{}
	}
	return nil
}
