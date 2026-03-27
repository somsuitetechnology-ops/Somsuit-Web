package services

import (
	"context"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"

	"github.com/lib/pq"
)

// OfferedCatalog handles CRUD for offered service catalog entries.
type OfferedCatalog struct {
	repo repositories.OfferedServiceRepository
}

func NewOfferedCatalog(repo repositories.OfferedServiceRepository) *OfferedCatalog {
	return &OfferedCatalog{repo: repo}
}

func (s *OfferedCatalog) List(ctx context.Context) ([]models.OfferedService, error) {
	return s.repo.FindAll(ctx)
}

func (s *OfferedCatalog) Get(ctx context.Context, id string) (*models.OfferedService, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	o, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if o == nil {
		return nil, ErrNotFound
	}
	return o, nil
}

func (s *OfferedCatalog) Create(ctx context.Context, o *models.OfferedService) (*models.OfferedService, error) {
	normalizeOfferedService(o)
	if err := validateOfferedService(o); err != nil {
		return nil, err
	}
	if err := s.repo.Create(ctx, o); err != nil {
		return nil, err
	}
	return o, nil
}

func (s *OfferedCatalog) Update(ctx context.Context, o *models.OfferedService) (*models.OfferedService, error) {
	if o.ID == "" {
		return nil, ErrInvalidInput
	}
	normalizeOfferedService(o)
	if err := validateOfferedService(o); err != nil {
		return nil, err
	}
	cur, err := s.repo.FindByID(ctx, o.ID)
	if err != nil {
		return nil, err
	}
	if cur == nil {
		return nil, ErrNotFound
	}
	o.CreatedAt = cur.CreatedAt
	if err := s.repo.Update(ctx, o); err != nil {
		return nil, err
	}
	return o, nil
}

func (s *OfferedCatalog) Delete(ctx context.Context, id string) error {
	if id == "" {
		return ErrInvalidInput
	}
	cur, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	if cur == nil {
		return ErrNotFound
	}
	return s.repo.Delete(ctx, id)
}

func normalizeOfferedService(o *models.OfferedService) {
	o.ServiceCode = strings.TrimSpace(o.ServiceCode)
	o.Name = strings.TrimSpace(o.Name)
	o.Tagline = strings.TrimSpace(o.Tagline)
	o.Description = strings.TrimSpace(o.Description)
	o.Deliverables = strings.TrimSpace(o.Deliverables)
	o.Prerequisites = strings.TrimSpace(o.Prerequisites)
	o.ProcessNotes = strings.TrimSpace(o.ProcessNotes)
	o.TypicalDuration = strings.TrimSpace(o.TypicalDuration)
	o.Currency = strings.TrimSpace(o.Currency)
	if o.Currency == "" {
		o.Currency = "USD"
	}
	o.IconURL = strings.TrimSpace(o.IconURL)
	o.HeroImageURL = strings.TrimSpace(o.HeroImageURL)
	o.Status = strings.TrimSpace(o.Status)
	if o.Status == "" {
		o.Status = "active"
	}
	o.InternalNotes = strings.TrimSpace(o.InternalNotes)
	if o.Tags == nil {
		o.Tags = pq.StringArray{}
	}
}

func validateOfferedService(o *models.OfferedService) error {
	if o.ServiceCode == "" || o.Name == "" || o.Description == "" {
		return ErrInvalidInput
	}
	return nil
}
