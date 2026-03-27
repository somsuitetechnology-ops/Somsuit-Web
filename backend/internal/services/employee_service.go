package services

import (
	"context"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"

	"gorm.io/gorm"
)

type EmployeeService struct {
	repo repositories.EmployeeRepository
	db   *gorm.DB
}

func NewEmployeeService(repo repositories.EmployeeRepository, db *gorm.DB) *EmployeeService {
	return &EmployeeService{repo: repo, db: db}
}

func (s *EmployeeService) List(ctx context.Context) ([]models.Employee, error) {
	return s.repo.FindAll(ctx)
}

func (s *EmployeeService) Get(ctx context.Context, id string) (*models.Employee, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	e, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if e == nil {
		return nil, ErrNotFound
	}
	return e, nil
}

func (s *EmployeeService) Create(ctx context.Context, e *models.Employee) (*models.Employee, error) {
	if err := validateEmployee(e); err != nil {
		return nil, err
	}
	if err := s.repo.Create(ctx, e); err != nil {
		return nil, err
	}
	return e, nil
}

func (s *EmployeeService) Update(ctx context.Context, e *models.Employee) (*models.Employee, error) {
	if e.ID == "" {
		return nil, ErrInvalidInput
	}
	if err := validateEmployee(e); err != nil {
		return nil, err
	}
	cur, err := s.repo.FindByID(ctx, e.ID)
	if err != nil {
		return nil, err
	}
	if cur == nil {
		return nil, ErrNotFound
	}
	e.CreatedAt = cur.CreatedAt
	if err := s.repo.Update(ctx, e); err != nil {
		return nil, err
	}
	return e, nil
}

func (s *EmployeeService) Delete(ctx context.Context, id string) error {
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
	return s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&models.DigitalContract{}).Where("employee_id = ?", id).Update("employee_id", nil).Error; err != nil {
			return err
		}
		return tx.Delete(&models.Employee{}, "id = ?", id).Error
	})
}

func validateEmployee(e *models.Employee) error {
	e.FullName = strings.TrimSpace(e.FullName)
	e.EmployeeCode = strings.TrimSpace(e.EmployeeCode)
	if e.FullName == "" || e.EmployeeCode == "" {
		return ErrInvalidInput
	}
	if e.Status == "" {
		e.Status = "active"
	}
	return nil
}
