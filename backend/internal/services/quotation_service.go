package services

import (
	"context"
	"fmt"
	"strings"
	"time"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"

	"github.com/google/uuid"
)

type QuotationService struct {
	repo repositories.QuotationRepository
}

func NewQuotationService(repo repositories.QuotationRepository) *QuotationService {
	return &QuotationService{repo: repo}
}

func (s *QuotationService) List(ctx context.Context) ([]models.Quotation, error) {
	return s.repo.FindAll(ctx)
}

func (s *QuotationService) Get(ctx context.Context, id string) (*models.Quotation, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	q, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if q == nil {
		return nil, ErrNotFound
	}
	return q, nil
}

func (s *QuotationService) Create(ctx context.Context, q *models.Quotation, lines []models.QuotationLine) (*models.Quotation, error) {
	if err := validateQuotation(q, lines); err != nil {
		return nil, err
	}
	q.QuoteNumber = newQuoteNumber()
	if q.Status == "" {
		q.Status = "draft"
	}
	for i := range lines {
		lines[i].SortOrder = i
	}
	if err := s.repo.Create(ctx, q, lines); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, q.ID)
}

func (s *QuotationService) Update(ctx context.Context, q *models.Quotation, lines []models.QuotationLine) (*models.Quotation, error) {
	if q.ID == "" {
		return nil, ErrInvalidInput
	}
	if err := validateQuotation(q, lines); err != nil {
		return nil, err
	}
	cur, err := s.repo.FindByID(ctx, q.ID)
	if err != nil {
		return nil, err
	}
	if cur == nil {
		return nil, ErrNotFound
	}
	q.QuoteNumber = cur.QuoteNumber
	q.CreatedAt = cur.CreatedAt
	for i := range lines {
		lines[i].SortOrder = i
	}
	if err := s.repo.Update(ctx, q, lines); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, q.ID)
}

func (s *QuotationService) Delete(ctx context.Context, id string) error {
	if id == "" {
		return ErrInvalidInput
	}
	cur, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	if cur == nil {
		return ErrNotFound
	}
	return s.repo.Delete(ctx, id)
}

func newQuoteNumber() string {
	return fmt.Sprintf("Q-%s-%s", time.Now().Format("20060102"), strings.ToUpper(uuid.New().String()[:8]))
}

func validateQuotation(q *models.Quotation, lines []models.QuotationLine) error {
	q.CustomerName = strings.TrimSpace(q.CustomerName)
	if q.CustomerName == "" {
		return ErrInvalidInput
	}
	if len(lines) == 0 {
		return ErrInvalidInput
	}
	for i := range lines {
		lines[i].Description = strings.TrimSpace(lines[i].Description)
		if lines[i].Description == "" {
			return ErrInvalidInput
		}
		if lines[i].Quantity <= 0 {
			return ErrInvalidInput
		}
		if lines[i].UnitPrice < 0 {
			return ErrInvalidInput
		}
	}
	return nil
}
