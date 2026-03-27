package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// OfferedService is a catalog entry describing a service the business provides.
type OfferedService struct {
	ID                string         `gorm:"type:uuid;primaryKey" json:"id"`
	ServiceCode       string         `gorm:"size:32;uniqueIndex;not null" json:"serviceCode"`
	Name              string         `gorm:"size:255;not null" json:"name"`
	Tagline           string         `gorm:"size:512" json:"tagline"`
	Description       string         `gorm:"type:text;not null" json:"description"`
	Deliverables      string         `gorm:"type:text" json:"deliverables"`
	Prerequisites     string         `gorm:"type:text" json:"prerequisites"`
	ProcessNotes      string         `gorm:"type:text" json:"processNotes"`
	TypicalDuration   string         `gorm:"size:128" json:"typicalDuration"`
	StartingPrice     *float64       `json:"startingPrice,omitempty"`
	Currency          string         `gorm:"size:8;default:USD" json:"currency"`
	IconURL           string         `gorm:"size:2048" json:"iconUrl"`
	HeroImageURL      string         `gorm:"size:2048" json:"heroImageUrl"`
	Tags              pq.StringArray `gorm:"type:text[]" json:"tags"`
	Status            string         `gorm:"size:32;default:active" json:"status"` // active, archived
	SortOrder         int            `gorm:"default:0" json:"sortOrder"`
	InternalNotes     string         `gorm:"type:text" json:"internalNotes"`
	CreatedAt         time.Time      `json:"createdAt"`
	UpdatedAt         time.Time      `json:"updatedAt"`
}

func (o *OfferedService) BeforeCreate(tx *gorm.DB) error {
	if o.ID == "" {
		o.ID = uuid.New().String()
	}
	return nil
}

func (o *OfferedService) AfterFind(tx *gorm.DB) error {
	if o.Tags == nil {
		o.Tags = pq.StringArray{}
	}
	return nil
}
