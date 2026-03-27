package handlers

import (
	"errors"
	"net/http"

	"somsuite/backend/config"
	"somsuite/backend/internal/services"
	"somsuite/backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// Handlers wires HTTP endpoints to application services.
type Handlers struct {
	categories                *services.CategoryService
	projects                  *services.ProjectService
	requests                  *services.RequestService
	employees                 *services.EmployeeService
	customers                 *services.CustomerService
	offeredCatalog            *services.OfferedCatalog
	contracts                 *services.DigitalContractService
	salaries                  *services.SalaryService
	quotations                *services.QuotationService
	branding                  config.Branding
	auth                      *services.CmsAuthService
	generalInquiriesProjectID string
}

// New constructs Handlers with all dependencies injected.
func New(
	categories *services.CategoryService,
	projects *services.ProjectService,
	requests *services.RequestService,
	employees *services.EmployeeService,
	customers *services.CustomerService,
	offeredCatalog *services.OfferedCatalog,
	contracts *services.DigitalContractService,
	salaries *services.SalaryService,
	quotations *services.QuotationService,
	branding config.Branding,
	auth *services.CmsAuthService,
	generalInquiriesProjectID string,
) *Handlers {
	return &Handlers{
		categories:                categories,
		projects:                  projects,
		requests:                  requests,
		employees:                 employees,
		customers:                 customers,
		offeredCatalog:            offeredCatalog,
		contracts:                 contracts,
		salaries:                  salaries,
		quotations:                quotations,
		branding:                  branding,
		auth:                      auth,
		generalInquiriesProjectID: generalInquiriesProjectID,
	}
}

func (h *Handlers) mapServiceError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, services.ErrNotFound):
		response.Error(c, http.StatusNotFound, err.Error())
	case errors.Is(err, services.ErrInvalidInput):
		response.Error(c, http.StatusBadRequest, err.Error())
	case errors.Is(err, services.ErrForeignKey):
		response.Error(c, http.StatusBadRequest, "referenced resource does not exist")
	default:
		response.Error(c, http.StatusInternalServerError, "internal server error")
	}
}
