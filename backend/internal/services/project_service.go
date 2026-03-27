package services

import (
	"context"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"

	"github.com/lib/pq"
)

// ProjectService contains project use-cases.
type ProjectService struct {
	repo repositories.ProjectRepository
}

func NewProjectService(repo repositories.ProjectRepository) *ProjectService {
	return &ProjectService{repo: repo}
}

func (s *ProjectService) List(ctx context.Context, categoryID *string) ([]models.Project, error) {
	return s.repo.FindAll(ctx, categoryID)
}

func (s *ProjectService) Get(ctx context.Context, id string) (*models.Project, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	p, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if p == nil {
		return nil, ErrNotFound
	}
	return p, nil
}

func normalizeProject(p *models.Project) {
	p.Name = strings.TrimSpace(p.Name)
	p.Description = strings.TrimSpace(p.Description)
	p.CoverImage = strings.TrimSpace(p.CoverImage)
	p.CategoryID = strings.TrimSpace(p.CategoryID)
	p.ProjectLink = strings.TrimSpace(p.ProjectLink)
	p.Badge = strings.TrimSpace(p.Badge)
	p.IconURL = strings.TrimSpace(p.IconURL)
	p.DisplayType = strings.TrimSpace(p.DisplayType)
	if p.GalleryImages == nil {
		p.GalleryImages = pq.StringArray{}
	}
	if p.Tags == nil {
		p.Tags = pq.StringArray{}
	}
}

func (s *ProjectService) Create(ctx context.Context, p *models.Project) (*models.Project, error) {
	normalizeProject(p)
	if p.Name == "" || p.CategoryID == "" {
		return nil, ErrInvalidInput
	}
	if p.CoverImage == "" {
		return nil, ErrInvalidInput
	}
	ok, err := s.repo.EnsureCategoryExists(ctx, p.CategoryID)
	if err != nil {
		return nil, err
	}
	if !ok {
		return nil, ErrForeignKey
	}
	p.ID = ""
	if err := s.repo.Create(ctx, p); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, p.ID)
}

func (s *ProjectService) Update(ctx context.Context, p *models.Project) (*models.Project, error) {
	normalizeProject(p)
	if p.ID == "" || p.Name == "" || p.CategoryID == "" {
		return nil, ErrInvalidInput
	}
	if p.CoverImage == "" {
		return nil, ErrInvalidInput
	}
	cur, err := s.repo.FindByID(ctx, p.ID)
	if err != nil {
		return nil, err
	}
	if cur == nil {
		return nil, ErrNotFound
	}
	ok, err := s.repo.EnsureCategoryExists(ctx, p.CategoryID)
	if err != nil {
		return nil, err
	}
	if !ok {
		return nil, ErrForeignKey
	}
	p.CreatedAt = cur.CreatedAt
	if err := s.repo.Update(ctx, p); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, p.ID)
}

func (s *ProjectService) Delete(ctx context.Context, id string) error {
	if id == "" {
		return ErrInvalidInput
	}
	p, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	if p == nil {
		return ErrNotFound
	}
	return s.repo.Delete(ctx, id)
}
