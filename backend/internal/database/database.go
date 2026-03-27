package database

import (
	"fmt"
	"log/slog"
	"os"

	"somsuite/backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// New opens a PostgreSQL connection, runs GORM auto-migration, and returns the DB handle.
func New(dsn string) (*gorm.DB, error) {
	cfg := &gorm.Config{}
	if os.Getenv("GIN_MODE") == "release" {
		cfg.Logger = logger.Default.LogMode(logger.Error)
	} else {
		cfg.Logger = logger.Default.LogMode(logger.Warn)
	}

	db, err := gorm.Open(postgres.Open(dsn), cfg)
	if err != nil {
		return nil, fmt.Errorf("open postgres: %w", err)
	}

	if err := db.AutoMigrate(
		&models.CmsUser{},
		&models.Category{},
		&models.Project{},
		&models.Request{},
		&models.Employee{},
		&models.Customer{},
		&models.OfferedService{},
		&models.DigitalContract{},
		&models.SalaryRecord{},
		&models.Quotation{},
		&models.QuotationLine{},
	); err != nil {
		return nil, fmt.Errorf("auto migrate: %w", err)
	}

	slog.Info("postgres migrations applied (public schema)")
	return db, nil
}
