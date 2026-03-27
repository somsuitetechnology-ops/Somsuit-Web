package services

import "errors"

// Domain errors returned by services (mapped to HTTP in handlers).
var (
	ErrNotFound     = errors.New("resource not found")
	ErrInvalidInput = errors.New("invalid input")
	ErrForeignKey   = errors.New("referenced resource does not exist")
)
