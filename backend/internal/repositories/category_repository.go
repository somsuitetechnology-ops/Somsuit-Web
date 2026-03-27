package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

// CategoryRepository persists categories.
type CategoryRepository interface {
	FindAll(ctx context.Context) ([]models.Category, error)
	FindByID(ctx context.Context, id string) (*models.Category, error)
	Create(ctx context.Context, c *models.Category) error
	Update(ctx context.Context, c *models.Category) error
	Delete(ctx context.Context, id string) error
}

type categoryRepository struct {
	db *gorm.DB
}

// NewCategoryRepository returns a PostgreSQL-backed CategoryRepository.
func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (r *categoryRepository) FindAll(ctx context.Context) ([]models.Category, error) {
	var out []models.Category
	if err := r.db.WithContext(ctx).Order("name asc").Find(&out).Error; err != nil {
		return nil, err
	}
	return out, nil
}

func (r *categoryRepository) FindByID(ctx context.Context, id string) (*models.Category, error) {
	var c models.Category
	if err := r.db.WithContext(ctx).First(&c, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &c, nil
}

func (r *categoryRepository) Create(ctx context.Context, c *models.Category) error {
	return r.db.WithContext(ctx).Create(c).Error
}

func (r *categoryRepository) Update(ctx context.Context, c *models.Category) error {
	return r.db.WithContext(ctx).Save(c).Error
}

func (r *categoryRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.Category{}, "id = ?", id).Error
}
