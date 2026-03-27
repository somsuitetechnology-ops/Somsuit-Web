package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

type CustomerRepository interface {
	FindAll(ctx context.Context) ([]models.Customer, error)
	FindByID(ctx context.Context, id string) (*models.Customer, error)
	Create(ctx context.Context, c *models.Customer) error
	Update(ctx context.Context, c *models.Customer) error
	Delete(ctx context.Context, id string) error
}

type customerRepository struct{ db *gorm.DB }

func NewCustomerRepository(db *gorm.DB) CustomerRepository {
	return &customerRepository{db: db}
}

func (r *customerRepository) FindAll(ctx context.Context) ([]models.Customer, error) {
	var out []models.Customer
	err := r.db.WithContext(ctx).
		Order("company_name asc, contact_name asc, customer_code asc").
		Find(&out).Error
	return out, err
}

func (r *customerRepository) FindByID(ctx context.Context, id string) (*models.Customer, error) {
	var c models.Customer
	if err := r.db.WithContext(ctx).First(&c, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &c, nil
}

func (r *customerRepository) Create(ctx context.Context, c *models.Customer) error {
	return r.db.WithContext(ctx).Create(c).Error
}

func (r *customerRepository) Update(ctx context.Context, c *models.Customer) error {
	return r.db.WithContext(ctx).Save(c).Error
}

func (r *customerRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.Customer{}, "id = ?", id).Error
}
