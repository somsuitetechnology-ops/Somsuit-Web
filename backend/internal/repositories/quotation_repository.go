package repositories

import (
	"context"
	"errors"

	"somsuite/backend/internal/models"

	"gorm.io/gorm"
)

type QuotationRepository interface {
	FindAll(ctx context.Context) ([]models.Quotation, error)
	FindByID(ctx context.Context, id string) (*models.Quotation, error)
	Create(ctx context.Context, q *models.Quotation, lines []models.QuotationLine) error
	Update(ctx context.Context, q *models.Quotation, lines []models.QuotationLine) error
	Delete(ctx context.Context, id string) error
}

type quotationRepository struct{ db *gorm.DB }

func NewQuotationRepository(db *gorm.DB) QuotationRepository {
	return &quotationRepository{db: db}
}

func (r *quotationRepository) FindAll(ctx context.Context) ([]models.Quotation, error) {
	var out []models.Quotation
	err := r.db.WithContext(ctx).Preload("Lines", func(db *gorm.DB) *gorm.DB {
		return db.Order("sort_order asc")
	}).Order("created_at desc").Find(&out).Error
	return out, err
}

func (r *quotationRepository) FindByID(ctx context.Context, id string) (*models.Quotation, error) {
	var q models.Quotation
	if err := r.db.WithContext(ctx).Preload("Lines", func(db *gorm.DB) *gorm.DB {
		return db.Order("sort_order asc")
	}).First(&q, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &q, nil
}

func (r *quotationRepository) Create(ctx context.Context, q *models.Quotation, lines []models.QuotationLine) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(q).Error; err != nil {
			return err
		}
		for i := range lines {
			lines[i].QuotationID = q.ID
			if err := tx.Create(&lines[i]).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *quotationRepository) Update(ctx context.Context, q *models.Quotation, lines []models.QuotationLine) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(q).Error; err != nil {
			return err
		}
		if err := tx.Where("quotation_id = ?", q.ID).Delete(&models.QuotationLine{}).Error; err != nil {
			return err
		}
		for i := range lines {
			lines[i].ID = ""
			lines[i].QuotationID = q.ID
			if err := tx.Create(&lines[i]).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *quotationRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("quotation_id = ?", id).Delete(&models.QuotationLine{}).Error; err != nil {
			return err
		}
		return tx.Delete(&models.Quotation{}, "id = ?", id).Error
	})
}
