package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

type SalaryRepository interface {
	FindAll(ctx context.Context, employeeID string) ([]models.SalaryRecord, error)
	FindByID(ctx context.Context, id string) (*models.SalaryRecord, error)
	Create(ctx context.Context, s *models.SalaryRecord) error
	Update(ctx context.Context, s *models.SalaryRecord) error
	Delete(ctx context.Context, id string) error
}

type salaryRepository struct{ db *gorm.DB }

func NewSalaryRepository(db *gorm.DB) SalaryRepository {
	return &salaryRepository{db: db}
}

func (r *salaryRepository) FindAll(ctx context.Context, employeeID string) ([]models.SalaryRecord, error) {
	q := r.db.WithContext(ctx).Preload("Employee").Order("period desc, created_at desc")
	if employeeID != "" {
		q = q.Where("employee_id = ?", employeeID)
	}
	var out []models.SalaryRecord
	err := q.Find(&out).Error
	return out, err
}

func (r *salaryRepository) FindByID(ctx context.Context, id string) (*models.SalaryRecord, error) {
	var s models.SalaryRecord
	if err := r.db.WithContext(ctx).Preload("Employee").First(&s, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &s, nil
}

func (r *salaryRepository) Create(ctx context.Context, s *models.SalaryRecord) error {
	return r.db.WithContext(ctx).Create(s).Error
}

func (r *salaryRepository) Update(ctx context.Context, s *models.SalaryRecord) error {
	return r.db.WithContext(ctx).Save(s).Error
}

func (r *salaryRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.SalaryRecord{}, "id = ?", id).Error
}
