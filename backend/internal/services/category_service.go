package services

import (
	"context"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"
)

// CategoryService contains category use-cases.
type CategoryService struct {
	repo repositories.CategoryRepository
}

func NewCategoryService(repo repositories.CategoryRepository) *CategoryService {
	return &CategoryService{repo: repo}
}

func (s *CategoryService) List(ctx context.Context) ([]models.Category, error) {
	return s.repo.FindAll(ctx)
}

func (s *CategoryService) Get(ctx context.Context, id string) (*models.Category, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	c, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if c == nil {
		return nil, ErrNotFound
	}
	return c, nil
}

func (s *CategoryService) Create(ctx context.Context, name string) (*models.Category, error) {
	name = strings.TrimSpace(name)
	if name == "" {
		return nil, ErrInvalidInput
	}
	c := &models.Category{Name: name}
	if err := s.repo.Create(ctx, c); err != nil {
		return nil, err
	}
	return c, nil
}

func (s *CategoryService) Update(ctx context.Context, id, name string) (*models.Category, error) {
	name = strings.TrimSpace(name)
	if id == "" || name == "" {
		return nil, ErrInvalidInput
	}
	c, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if c == nil {
		return nil, ErrNotFound
	}
	c.Name = name
	if err := s.repo.Update(ctx, c); err != nil {
		return nil, err
	}
	return c, nil
}

func (s *CategoryService) Delete(ctx context.Context, id string) error {
	if id == "" {
		return ErrInvalidInput
	}
	c, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	if c == nil {
		return ErrNotFound
	}
	return s.repo.Delete(ctx, id)
}
