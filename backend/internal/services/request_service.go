package services

import (
	"context"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"
)

// RequestCreateInput is used for CMS and public request creation.
type RequestCreateInput struct {
	Name        string
	Service     string
	Description string
	ProjectID   string
	Email       string
	Phone       string
	Company     string
}

// RequestUpdateInput is used for CMS updates.
type RequestUpdateInput struct {
	ID          string
	Name        string
	Service     string
	Description string
	ProjectID   string
	Email       string
	Phone       string
	Company     string
}

// RequestService contains request use-cases.
type RequestService struct {
	repo repositories.RequestRepository
}

func NewRequestService(repo repositories.RequestRepository) *RequestService {
	return &RequestService{repo: repo}
}

func (s *RequestService) List(ctx context.Context, projectID *string) ([]models.Request, error) {
	return s.repo.FindAll(ctx, projectID)
}

func (s *RequestService) Get(ctx context.Context, id string) (*models.Request, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	r, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if r == nil {
		return nil, ErrNotFound
	}
	return r, nil
}

func (s *RequestService) Create(ctx context.Context, in RequestCreateInput) (*models.Request, error) {
	in.Name = strings.TrimSpace(in.Name)
	in.Service = strings.TrimSpace(in.Service)
	in.Description = strings.TrimSpace(in.Description)
	in.ProjectID = strings.TrimSpace(in.ProjectID)
	in.Email = strings.TrimSpace(in.Email)
	in.Phone = strings.TrimSpace(in.Phone)
	in.Company = strings.TrimSpace(in.Company)
	if in.Name == "" || in.Service == "" || in.ProjectID == "" {
		return nil, ErrInvalidInput
	}
	ok, err := s.repo.EnsureProjectExists(ctx, in.ProjectID)
	if err != nil {
		return nil, err
	}
	if !ok {
		return nil, ErrForeignKey
	}
	r := &models.Request{
		Name:        in.Name,
		Service:     in.Service,
		Description: in.Description,
		ProjectID:   in.ProjectID,
		Email:       in.Email,
		Phone:       in.Phone,
		Company:     in.Company,
	}
	if err := s.repo.Create(ctx, r); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, r.ID)
}

func (s *RequestService) Update(ctx context.Context, in RequestUpdateInput) (*models.Request, error) {
	in.ID = strings.TrimSpace(in.ID)
	in.Name = strings.TrimSpace(in.Name)
	in.Service = strings.TrimSpace(in.Service)
	in.Description = strings.TrimSpace(in.Description)
	in.ProjectID = strings.TrimSpace(in.ProjectID)
	in.Email = strings.TrimSpace(in.Email)
	in.Phone = strings.TrimSpace(in.Phone)
	in.Company = strings.TrimSpace(in.Company)
	if in.ID == "" || in.Name == "" || in.Service == "" || in.ProjectID == "" {
		return nil, ErrInvalidInput
	}
	r, err := s.repo.FindByID(ctx, in.ID)
	if err != nil {
		return nil, err
	}
	if r == nil {
		return nil, ErrNotFound
	}
	ok, err := s.repo.EnsureProjectExists(ctx, in.ProjectID)
	if err != nil {
		return nil, err
	}
	if !ok {
		return nil, ErrForeignKey
	}
	r.Name = in.Name
	r.Service = in.Service
	r.Description = in.Description
	r.ProjectID = in.ProjectID
	r.Email = in.Email
	r.Phone = in.Phone
	r.Company = in.Company
	if err := s.repo.Update(ctx, r); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, in.ID)
}

func (s *RequestService) Delete(ctx context.Context, id string) error {
	if id == "" {
		return ErrInvalidInput
	}
	r, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	if r == nil {
		return ErrNotFound
	}
	return s.repo.Delete(ctx, id)
}
