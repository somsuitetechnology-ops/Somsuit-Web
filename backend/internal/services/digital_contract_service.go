package services

import (
	"context"
	"strings"
	"time"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"
)

type DigitalContractService struct {
	repo repositories.DigitalContractRepository
}

func NewDigitalContractService(repo repositories.DigitalContractRepository) *DigitalContractService {
	return &DigitalContractService{repo: repo}
}

func (s *DigitalContractService) List(ctx context.Context) ([]models.DigitalContract, error) {
	return s.repo.FindAll(ctx)
}

func (s *DigitalContractService) Get(ctx context.Context, id string) (*models.DigitalContract, error) {
	if id == "" {
		return nil, ErrInvalidInput
	}
	d, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if d == nil {
		return nil, ErrNotFound
	}
	return d, nil
}

func (s *DigitalContractService) Create(ctx context.Context, d *models.DigitalContract) (*models.DigitalContract, error) {
	if err := validateContract(d); err != nil {
		return nil, err
	}
	if err := s.repo.Create(ctx, d); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, d.ID)
}

func (s *DigitalContractService) Update(ctx context.Context, d *models.DigitalContract) (*models.DigitalContract, error) {
	if d.ID == "" {
		return nil, ErrInvalidInput
	}
	if err := validateContract(d); err != nil {
		return nil, err
	}
	cur, err := s.repo.FindByID(ctx, d.ID)
	if err != nil {
		return nil, err
	}
	if cur == nil {
		return nil, ErrNotFound
	}
	d.CreatedAt = cur.CreatedAt
	if err := s.repo.Update(ctx, d); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, d.ID)
}

func (s *DigitalContractService) Delete(ctx context.Context, id string) error {
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

func validateContract(d *models.DigitalContract) error {
	d.Title = strings.TrimSpace(d.Title)
	d.Content = strings.TrimSpace(d.Content)
	d.ContractKind = strings.TrimSpace(strings.ToLower(d.ContractKind))
	if d.ContractKind == "" {
		d.ContractKind = "customer"
	}
	if d.ContractKind != "customer" && d.ContractKind != "employee" {
		return ErrInvalidInput
	}
	if d.ContractKind == "customer" {
		d.EmployeeID = nil
		if d.Title == "" {
			d.Title = defaultCustomerAgreementTitle(d)
		}
	} else {
		d.CustomerID = nil
	}
	if d.Title == "" || d.Content == "" {
		return ErrInvalidInput
	}
	if d.ContractKind == "employee" {
		if d.EmployeeID == nil || strings.TrimSpace(*d.EmployeeID) == "" {
			return ErrInvalidInput
		}
	}
	if d.Status == "" {
		d.Status = "draft"
	}
	return nil
}

func defaultCustomerAgreementTitle(d *models.DigitalContract) string {
	p := strings.TrimSpace(d.PartyName)
	if p != "" {
		return "Client Onboarding Agreement — " + p
	}
	return "Client Onboarding Agreement"
}

// GetByShareToken returns a contract for the public signing page (token from link).
func (s *DigitalContractService) GetByShareToken(ctx context.Context, token string) (*models.DigitalContract, error) {
	token = strings.TrimSpace(token)
	if token == "" {
		return nil, ErrInvalidInput
	}
	d, err := s.repo.FindByShareToken(ctx, token)
	if err != nil {
		return nil, err
	}
	if d == nil {
		return nil, ErrNotFound
	}
	return d, nil
}

// SubmitPartySignature stores the counterparty signature and marks the contract signed.
func (s *DigitalContractService) SubmitPartySignature(ctx context.Context, token, signature string) (*models.DigitalContract, error) {
	token = strings.TrimSpace(token)
	signature = strings.TrimSpace(signature)
	if token == "" || signature == "" {
		return nil, ErrInvalidInput
	}
	const maxSig = 6 << 20 // ~6MB base64 payload ceiling
	if len(signature) > maxSig {
		return nil, ErrInvalidInput
	}
	d, err := s.repo.FindByShareToken(ctx, token)
	if err != nil {
		return nil, err
	}
	if d == nil {
		return nil, ErrNotFound
	}
	if d.Status == "signed" && strings.TrimSpace(d.PartySignature) != "" {
		return s.repo.FindByID(ctx, d.ID)
	}
	d.PartySignature = signature
	d.Status = "signed"
	now := time.Now()
	d.SignedAt = &now
	if err := s.repo.Update(ctx, d); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, d.ID)
}
