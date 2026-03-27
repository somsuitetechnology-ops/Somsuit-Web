package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

type CmsUserRepository interface {
	Count(ctx context.Context) (int64, error)
	FindByEmail(ctx context.Context, email string) (*models.CmsUser, error)
	FindByID(ctx context.Context, id string) (*models.CmsUser, error)
	Create(ctx context.Context, u *models.CmsUser) error
}

type cmsUserRepository struct{ db *gorm.DB }

func NewCmsUserRepository(db *gorm.DB) CmsUserRepository {
	return &cmsUserRepository{db: db}
}

func (r *cmsUserRepository) Count(ctx context.Context) (int64, error) {
	var n int64
	err := r.db.WithContext(ctx).Model(&models.CmsUser{}).Count(&n).Error
	return n, err
}

func (r *cmsUserRepository) FindByEmail(ctx context.Context, email string) (*models.CmsUser, error) {
	var u models.CmsUser
	if err := r.db.WithContext(ctx).Where("LOWER(email) = LOWER(?)", email).First(&u).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &u, nil
}

func (r *cmsUserRepository) FindByID(ctx context.Context, id string) (*models.CmsUser, error) {
	var u models.CmsUser
	if err := r.db.WithContext(ctx).First(&u, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &u, nil
}

func (r *cmsUserRepository) Create(ctx context.Context, u *models.CmsUser) error {
	return r.db.WithContext(ctx).Create(u).Error
}
