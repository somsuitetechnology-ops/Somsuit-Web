package main

import (
	"context"
	"errors"
	"log/slog"
	"os"
	"strings"

	"somsuite/backend/config"
	"somsuite/backend/internal/database"
	"somsuite/backend/internal/handlers"
	"somsuite/backend/internal/middleware"
	"somsuite/backend/internal/models"
	"somsuite/backend/internal/repositories"
	"somsuite/backend/internal/services"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		slog.Error("config", "err", err)
		os.Exit(1)
	}

	db, err := database.New(cfg.DSN)
	if err != nil {
		slog.Error("database", "err", err)
		os.Exit(1)
	}

	cmsUserRepo := repositories.NewCmsUserRepository(db)
	authSvc := services.NewCmsAuthService(cmsUserRepo, cfg.CMSJWTSecret)

	if err := bootstrapCmsAdmin(context.Background(), cmsUserRepo, authSvc, cfg); err != nil {
		slog.Error("cms bootstrap", "err", err)
		os.Exit(1)
	}

	if cfg.CMSJWTSecret != "" {
		slog.Info("CMS JWT authentication enabled")
	} else {
		slog.Warn("CMS JWT authentication disabled — set CMS_JWT_SECRET to require dashboard login")
	}

	catRepo := repositories.NewCategoryRepository(db)
	projRepo := repositories.NewProjectRepository(db)
	reqRepo := repositories.NewRequestRepository(db)
	empRepo := repositories.NewEmployeeRepository(db)
	custRepo := repositories.NewCustomerRepository(db)
	offeredRepo := repositories.NewOfferedServiceRepository(db)
	contractRepo := repositories.NewDigitalContractRepository(db)
	salaryRepo := repositories.NewSalaryRepository(db)
	quotRepo := repositories.NewQuotationRepository(db)

	catSvc := services.NewCategoryService(catRepo)
	projSvc := services.NewProjectService(projRepo)
	reqSvc := services.NewRequestService(reqRepo)
	empSvc := services.NewEmployeeService(empRepo, db)
	custSvc := services.NewCustomerService(custRepo)
	offeredCatalogSvc := services.NewOfferedCatalog(offeredRepo)
	contractSvc := services.NewDigitalContractService(contractRepo)
	salarySvc := services.NewSalaryService(salaryRepo, empRepo)
	quotSvc := services.NewQuotationService(quotRepo)

	h := handlers.New(catSvc, projSvc, reqSvc, empSvc, custSvc, offeredCatalogSvc, contractSvc, salarySvc, quotSvc, cfg.Branding, authSvc, cfg.GeneralInquiriesProjectID)
	jwtMW := middleware.CMSJWTAuth(authSvc)

	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}

	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.RequestLogger())
	r.Use(middleware.CORSMiddleware(cfg.CORSOrigins))

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	handlers.RegisterRoutes(r, h, jwtMW)

	addr := ":" + cfg.ServerPort
	slog.Info("server listening", "addr", addr)
	if err := r.Run(addr); err != nil {
		if strings.Contains(err.Error(), "address already in use") {
			slog.Error("port in use", "port", cfg.ServerPort, "hint", "set SERVER_PORT in .env to another value, or stop the process using this port (e.g. lsof -i :"+cfg.ServerPort+")")
		} else {
			slog.Error("server", "err", err)
		}
		os.Exit(1)
	}
}

func bootstrapCmsAdmin(ctx context.Context, repo repositories.CmsUserRepository, auth *services.CmsAuthService, cfg *config.Config) error {
	if !auth.Enabled() {
		return nil
	}
	n, err := repo.Count(ctx)
	if err != nil {
		return err
	}
	if n > 0 {
		return nil
	}
	email := strings.TrimSpace(cfg.CMSBootstrapEmail)
	pass := cfg.CMSBootstrapPassword
	if email == "" || pass == "" {
		slog.Warn("no CMS users in database; set CMS_BOOTSTRAP_EMAIL and CMS_BOOTSTRAP_PASSWORD to create the first admin")
		return nil
	}
	if len(pass) < 8 {
		return errors.New("CMS_BOOTSTRAP_PASSWORD must be at least 8 characters")
	}
	hash, err := services.HashCMSPassword(pass)
	if err != nil {
		return err
	}
	u := &models.CmsUser{
		Email:        strings.ToLower(email),
		PasswordHash: hash,
		Name:         "Administrator",
		Role:         "admin",
	}
	if err := repo.Create(ctx, u); err != nil {
		return err
	}
	slog.Info("created initial CMS admin user", "email", u.Email)
	return nil
}
