package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

type DigitalContractRepository interface {
	FindAll(ctx context.Context) ([]models.DigitalContract, error)
	FindByID(ctx context.Context, id string) (*models.DigitalContract, error)
	FindByShareToken(ctx context.Context, token string) (*models.DigitalContract, error)
	Create(ctx context.Context, d *models.DigitalContract) error
	Update(ctx context.Context, d *models.DigitalContract) error
	Delete(ctx context.Context, id string) error
}

type digitalContractRepository struct{ db *gorm.DB }

func NewDigitalContractRepository(db *gorm.DB) DigitalContractRepository {
	return &digitalContractRepository{db: db}
}

func (r *digitalContractRepository) FindAll(ctx context.Context) ([]models.DigitalContract, error) {
	var out []models.DigitalContract
	err := r.db.WithContext(ctx).
		Preload("Employee").
		Preload("Customer").
		Preload("OfferedService").
		Order("updated_at desc").
		Find(&out).Error
	return out, err
}

func (r *digitalContractRepository) FindByID(ctx context.Context, id string) (*models.DigitalContract, error) {
	var d models.DigitalContract
	if err := r.db.WithContext(ctx).
		Preload("Employee").
		Preload("Customer").
		Preload("OfferedService").
		First(&d, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &d, nil
}

func (r *digitalContractRepository) FindByShareToken(ctx context.Context, token string) (*models.DigitalContract, error) {
	var d models.DigitalContract
	if err := r.db.WithContext(ctx).
		Preload("Employee").
		Preload("Customer").
		Preload("OfferedService").
		First(&d, "share_token = ?", token).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &d, nil
}

func (r *digitalContractRepository) Create(ctx context.Context, d *models.DigitalContract) error {
	return r.db.WithContext(ctx).Create(d).Error
}

func (r *digitalContractRepository) Update(ctx context.Context, d *models.DigitalContract) error {
	return r.db.WithContext(ctx).Save(d).Error
}

func (r *digitalContractRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.DigitalContract{}, "id = ?", id).Error
}
