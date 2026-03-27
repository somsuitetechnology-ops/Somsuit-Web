package handlers

import "github.com/gin-gonic/gin"

// RegisterRoutes attaches all REST routes. jwtMiddleware protects CMS data routes
// (and GET /auth/me). POST /auth/login and GET /health stay public.
func RegisterRoutes(r *gin.Engine, h *Handlers, jwtMiddleware gin.HandlerFunc) {
	r.GET("/auth/status", h.AuthStatus)
	r.POST("/auth/login", h.Login)

	// Public read-only portfolio (no JWT) — marketing site
	r.GET("/public/categories", h.ListCategories)
	r.GET("/public/projects", h.ListProjects)
	r.POST("/public/requests", h.CreatePublicRequest)
	r.GET("/public/contracts/:token", h.GetPublicContract)
	r.POST("/public/contracts/:token/sign", h.PostPublicContractSign)

	protected := r.Group("")
	protected.Use(jwtMiddleware)
	protected.GET("/auth/me", h.Me)

	protected.GET("/categories", h.ListCategories)
	protected.POST("/categories", h.CreateCategory)
	protected.PUT("/categories/:id", h.UpdateCategory)
	protected.DELETE("/categories/:id", h.DeleteCategory)

	protected.GET("/projects", h.ListProjects)
	protected.POST("/projects", h.CreateProject)
	protected.PUT("/projects/:id", h.UpdateProject)
	protected.DELETE("/projects/:id", h.DeleteProject)

	protected.GET("/requests", h.ListRequests)
	protected.POST("/requests", h.CreateRequest)
	protected.PUT("/requests/:id", h.UpdateRequest)
	protected.DELETE("/requests/:id", h.DeleteRequest)

	protected.GET("/employees", h.ListEmployees)
	protected.POST("/employees", h.CreateEmployee)
	protected.GET("/employees/:id", h.GetEmployee)
	protected.PUT("/employees/:id", h.UpdateEmployee)
	protected.DELETE("/employees/:id", h.DeleteEmployee)

	protected.GET("/customers", h.ListCustomers)
	protected.POST("/customers", h.CreateCustomer)
	protected.GET("/customers/:id", h.GetCustomer)
	protected.PUT("/customers/:id", h.UpdateCustomer)
	protected.DELETE("/customers/:id", h.DeleteCustomer)

	protected.GET("/offered-services", h.ListOfferedServices)
	protected.POST("/offered-services", h.CreateOfferedService)
	protected.GET("/offered-services/:id", h.GetOfferedService)
	protected.PUT("/offered-services/:id", h.UpdateOfferedService)
	protected.DELETE("/offered-services/:id", h.DeleteOfferedService)

	protected.GET("/digital-contracts", h.ListDigitalContracts)
	protected.POST("/digital-contracts", h.CreateDigitalContract)
	protected.GET("/digital-contracts/:id/pdf", h.GetDigitalContractPDF)
	protected.GET("/digital-contracts/:id", h.GetDigitalContract)
	protected.PUT("/digital-contracts/:id", h.UpdateDigitalContract)
	protected.DELETE("/digital-contracts/:id", h.DeleteDigitalContract)

	protected.GET("/salaries", h.ListSalaries)
	protected.POST("/salaries", h.CreateSalary)
	protected.GET("/salaries/:id", h.GetSalary)
	protected.PUT("/salaries/:id", h.UpdateSalary)
	protected.DELETE("/salaries/:id", h.DeleteSalary)

	protected.GET("/quotations", h.ListQuotations)
	protected.POST("/quotations", h.CreateQuotation)
	protected.GET("/quotations/:id/pdf", h.GetQuotationPDF)
	protected.GET("/quotations/:id", h.GetQuotation)
	protected.PUT("/quotations/:id", h.UpdateQuotation)
	protected.DELETE("/quotations/:id", h.DeleteQuotation)
}
