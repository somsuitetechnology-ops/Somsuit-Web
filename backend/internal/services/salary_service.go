package services

import (
	"context"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"
)

type SalaryService struct {
	repo         repositories.SalaryRepository
	employeeRepo repositories.EmployeeRepository
}

func NewSalaryService(s repositories.SalaryRepository, e repositories.EmployeeRepository) *SalaryService {
	return &SalaryService{repo: s, employeeRepo: e}
}

func (s *SalaryService) List(ctx context.Context, employeeID string) ([]models.SalaryRecord, error) {
	return s.repo.FindAll(ctx, employeeID)
}

func (s *SalaryService) Get(ctx context.Context, id string) (*models.SalaryRecord, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	rec, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if rec == nil {
		return nil, ErrNotFound
	}
	return rec, nil
}

func (s *SalaryService) Create(ctx context.Context, rec *models.SalaryRecord) (*models.SalaryRecord, error) {
	if err := s.validate(ctx, rec); err != nil {
		return nil, err
	}
	if err := s.repo.Create(ctx, rec); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, rec.ID)
}

func (s *SalaryService) Update(ctx context.Context, rec *models.SalaryRecord) (*models.SalaryRecord, error) {
	if rec.ID == "" {
		return nil, ErrInvalidInput
	}
	if err := s.validate(ctx, rec); err != nil {
		return nil, err
	}
	cur, err := s.repo.FindByID(ctx, rec.ID)
	if err != nil {
		return nil, err
	}
	if cur == nil {
		return nil, ErrNotFound
	}
	rec.CreatedAt = cur.CreatedAt
	if err := s.repo.Update(ctx, rec); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, rec.ID)
}

func (s *SalaryService) Delete(ctx context.Context, id string) error {
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

func (s *SalaryService) validate(ctx context.Context, rec *models.SalaryRecord) error {
	rec.Period = strings.TrimSpace(rec.Period)
	rec.EmployeeID = strings.TrimSpace(rec.EmployeeID)
	if rec.EmployeeID == "" || rec.Period == "" {
		return ErrInvalidInput
	}
	if rec.Amount < 0 {
		return ErrInvalidInput
	}
	if rec.Currency == "" {
		rec.Currency = "USD"
	}
	emp, err := s.employeeRepo.FindByID(ctx, rec.EmployeeID)
	if err != nil {
		return err
	}
	if emp == nil {
		return ErrForeignKey
	}
	return nil
}
