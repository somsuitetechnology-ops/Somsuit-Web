package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

type EmployeeRepository interface {
	FindAll(ctx context.Context) ([]models.Employee, error)
	FindByID(ctx context.Context, id string) (*models.Employee, error)
	Create(ctx context.Context, e *models.Employee) error
	Update(ctx context.Context, e *models.Employee) error
	Delete(ctx context.Context, id string) error
}

type employeeRepository struct{ db *gorm.DB }

func NewEmployeeRepository(db *gorm.DB) EmployeeRepository {
	return &employeeRepository{db: db}
}

func (r *employeeRepository) FindAll(ctx context.Context) ([]models.Employee, error) {
	var out []models.Employee
	err := r.db.WithContext(ctx).Order("full_name asc").Find(&out).Error
	return out, err
}

func (r *employeeRepository) FindByID(ctx context.Context, id string) (*models.Employee, error) {
	var e models.Employee
	if err := r.db.WithContext(ctx).First(&e, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &e, nil
}

func (r *employeeRepository) Create(ctx context.Context, e *models.Employee) error {
	return r.db.WithContext(ctx).Create(e).Error
}

func (r *employeeRepository) Update(ctx context.Context, e *models.Employee) error {
	return r.db.WithContext(ctx).Save(e).Error
}

func (r *employeeRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.Employee{}, "id = ?", id).Error
}
