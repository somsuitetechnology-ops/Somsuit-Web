package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

// RequestRepository persists requests.
type RequestRepository interface {
	FindAll(ctx context.Context, projectID *string) ([]models.Request, error)
	FindByID(ctx context.Context, id string) (*models.Request, error)
	Create(ctx context.Context, r *models.Request) error
	Update(ctx context.Context, r *models.Request) error
	Delete(ctx context.Context, id string) error
	EnsureProjectExists(ctx context.Context, projectID string) (bool, error)
}

type requestRepository struct {
	db *gorm.DB
}

// NewRequestRepository returns a PostgreSQL-backed RequestRepository.
func NewRequestRepository(db *gorm.DB) RequestRepository {
	return &requestRepository{db: db}
}

func (r *requestRepository) FindAll(ctx context.Context, projectID *string) ([]models.Request, error) {
	q := r.db.WithContext(ctx).Model(&models.Request{}).Preload("Project").Order("name asc")
	if projectID != nil && *projectID != "" {
		q = q.Where("project_id = ?", *projectID)
	}
	var out []models.Request
	if err := q.Find(&out).Error; err != nil {
		return nil, err
	}
	return out, nil
}

func (r *requestRepository) FindByID(ctx context.Context, id string) (*models.Request, error) {
	var req models.Request
	if err := r.db.WithContext(ctx).Preload("Project").First(&req, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &req, nil
}

func (r *requestRepository) Create(ctx context.Context, req *models.Request) error {
	return r.db.WithContext(ctx).Create(req).Error
}

func (r *requestRepository) Update(ctx context.Context, req *models.Request) error {
	return r.db.WithContext(ctx).Save(req).Error
}

func (r *requestRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.Request{}, "id = ?", id).Error
}

func (r *requestRepository) EnsureProjectExists(ctx context.Context, projectID string) (bool, error) {
	var n int64
	if err := r.db.WithContext(ctx).Model(&models.Project{}).Where("id = ?", projectID).Count(&n).Error; err != nil {
		return false, err
	}
	return n > 0, nil
}
