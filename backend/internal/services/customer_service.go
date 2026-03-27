package services

import (
	"context"
	"strings"

	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"
)

type CustomerService struct {
	repo repositories.CustomerRepository
}

func NewCustomerService(repo repositories.CustomerRepository) *CustomerService {
	return &CustomerService{repo: repo}
}

func (s *CustomerService) List(ctx context.Context) ([]models.Customer, error) {
	return s.repo.FindAll(ctx)
}

func (s *CustomerService) Get(ctx context.Context, id string) (*models.Customer, error) {
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

func (s *CustomerService) Create(ctx context.Context, c *models.Customer) (*models.Customer, error) {
	normalizeCustomer(c)
	if err := validateCustomer(c); err != nil {
		return nil, err
	}
	if err := s.repo.Create(ctx, c); err != nil {
		return nil, err
	}
	return c, nil
}

func (s *CustomerService) Update(ctx context.Context, c *models.Customer) (*models.Customer, error) {
	if c.ID == "" {
		return nil, ErrInvalidInput
	}
	normalizeCustomer(c)
	if err := validateCustomer(c); err != nil {
		return nil, err
	}
	cur, err := s.repo.FindByID(ctx, c.ID)
	if err != nil {
		return nil, err
	}
	if cur == nil {
		return nil, ErrNotFound
	}
	c.CreatedAt = cur.CreatedAt
	if err := s.repo.Update(ctx, c); err != nil {
		return nil, err
	}
	return c, nil
}

func (s *CustomerService) Delete(ctx context.Context, id string) error {
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

func normalizeCustomer(c *models.Customer) {
	c.CustomerCode = strings.TrimSpace(c.CustomerCode)
	c.CompanyName = strings.TrimSpace(c.CompanyName)
	c.LegalName = strings.TrimSpace(c.LegalName)
	c.ContactName = strings.TrimSpace(c.ContactName)
	c.Email = strings.TrimSpace(c.Email)
	c.Phone = strings.TrimSpace(c.Phone)
	c.AlternatePhone = strings.TrimSpace(c.AlternatePhone)
	c.Website = strings.TrimSpace(c.Website)
	c.TaxID = strings.TrimSpace(c.TaxID)
	c.CustomerType = strings.TrimSpace(c.CustomerType)
	c.Industry = strings.TrimSpace(c.Industry)
	c.BillingStreet = strings.TrimSpace(c.BillingStreet)
	c.BillingCity = strings.TrimSpace(c.BillingCity)
	c.BillingStateProvince = strings.TrimSpace(c.BillingStateProvince)
	c.BillingPostalCode = strings.TrimSpace(c.BillingPostalCode)
	c.BillingCountry = strings.TrimSpace(c.BillingCountry)
	c.ShippingStreet = strings.TrimSpace(c.ShippingStreet)
	c.ShippingCity = strings.TrimSpace(c.ShippingCity)
	c.ShippingStateProvince = strings.TrimSpace(c.ShippingStateProvince)
	c.ShippingPostalCode = strings.TrimSpace(c.ShippingPostalCode)
	c.ShippingCountry = strings.TrimSpace(c.ShippingCountry)
	c.Notes = strings.TrimSpace(c.Notes)
	c.Status = strings.TrimSpace(c.Status)
	if c.CustomerType == "" {
		c.CustomerType = "company"
	}
	if c.Status == "" {
		c.Status = "active"
	}
}

func validateCustomer(c *models.Customer) error {
	if c.CustomerCode == "" {
		return ErrInvalidInput
	}
	if c.CompanyName == "" && c.ContactName == "" {
		return ErrInvalidInput
	}
	return nil
}
