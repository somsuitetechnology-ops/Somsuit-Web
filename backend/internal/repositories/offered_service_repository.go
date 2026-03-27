package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

type OfferedServiceRepository interface {
	FindAll(ctx context.Context) ([]models.OfferedService, error)
	FindByID(ctx context.Context, id string) (*models.OfferedService, error)
	Create(ctx context.Context, o *models.OfferedService) error
	Update(ctx context.Context, o *models.OfferedService) error
	Delete(ctx context.Context, id string) error
}

type offeredServiceRepository struct{ db *gorm.DB }

func NewOfferedServiceRepository(db *gorm.DB) OfferedServiceRepository {
	return &offeredServiceRepository{db: db}
}

func (r *offeredServiceRepository) FindAll(ctx context.Context) ([]models.OfferedService, error) {
	var out []models.OfferedService
	err := r.db.WithContext(ctx).
		Order("sort_order asc, name asc").
		Find(&out).Error
	return out, err
}

func (r *offeredServiceRepository) FindByID(ctx context.Context, id string) (*models.OfferedService, error) {
	var o models.OfferedService
	if err := r.db.WithContext(ctx).First(&o, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &o, nil
}

func (r *offeredServiceRepository) Create(ctx context.Context, o *models.OfferedService) error {
	return r.db.WithContext(ctx).Create(o).Error
}

func (r *offeredServiceRepository) Update(ctx context.Context, o *models.OfferedService) error {
	return r.db.WithContext(ctx).Save(o).Error
}

func (r *offeredServiceRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.OfferedService{}, "id = ?", id).Error
}
