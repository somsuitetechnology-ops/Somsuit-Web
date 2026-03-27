package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

// ProjectRepository persists projects.
type ProjectRepository interface {
	FindAll(ctx context.Context, categoryID *string) ([]models.Project, error)
	FindByID(ctx context.Context, id string) (*models.Project, error)
	Create(ctx context.Context, p *models.Project) error
	Update(ctx context.Context, p *models.Project) error
	Delete(ctx context.Context, id string) error
	EnsureCategoryExists(ctx context.Context, categoryID string) (bool, error)
}

type projectRepository struct {
	db *gorm.DB
}

// NewProjectRepository returns a PostgreSQL-backed ProjectRepository.
func NewProjectRepository(db *gorm.DB) ProjectRepository {
	return &projectRepository{db: db}
}

func (r *projectRepository) FindAll(ctx context.Context, categoryID *string) ([]models.Project, error) {
	q := r.db.WithContext(ctx).Model(&models.Project{}).Preload("Category").Order("name asc")
	if categoryID != nil && *categoryID != "" {
		q = q.Where("category_id = ?", *categoryID)
	}
	var out []models.Project
	if err := q.Find(&out).Error; err != nil {
		return nil, err
	}
	return out, nil
}

func (r *projectRepository) FindByID(ctx context.Context, id string) (*models.Project, error) {
	var p models.Project
	if err := r.db.WithContext(ctx).Preload("Category").First(&p, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}

func (r *projectRepository) Create(ctx context.Context, p *models.Project) error {
	return r.db.WithContext(ctx).Create(p).Error
}

func (r *projectRepository) Update(ctx context.Context, p *models.Project) error {
	return r.db.WithContext(ctx).Save(p).Error
}

func (r *projectRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&models.Project{}, "id = ?", id).Error
}

func (r *projectRepository) EnsureCategoryExists(ctx context.Context, categoryID string) (bool, error) {
	var n int64
	if err := r.db.WithContext(ctx).Model(&models.Category{}).Where("id = ?", categoryID).Count(&n).Error; err != nil {
		return false, err
	}
	return n > 0, nil
}
