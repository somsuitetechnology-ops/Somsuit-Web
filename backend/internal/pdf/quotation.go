package pdf

import (
	"bytes"
	"fmt"
	"strings"

	"somsuite/backend/config"
	"somsuite/backend/internal/models"

	"github.com/go-pdf/fpdf"
)

// safeASCII converts text for fpdf core fonts (Helvetica = single-byte Latin-1).
// Important: use raw bytes for U+00–FF — writing UTF-8 multi-byte sequences breaks middots and accents (e.g. "·" showing as "Â·").
func safeASCII(s string) string {
	repl := strings.NewReplacer(
		"\u2013", "-", // en dash
		"\u2014", "-", // em dash
		"\u2018", "'", "\u2019", "'",
		"\u201c", `"`, "\u201d", `"`,
		"\u2026", "...",
		"\u00a0", " ",
	)
	s = repl.Replace(s)
	var b strings.Builder
	for _, r := range s {
		switch {
		case r == '\n' || r == '\r':
			b.WriteByte(byte(r))
		case r >= 32 && r <= 255:
			b.WriteByte(byte(r))
		default:
			b.WriteByte(' ')
		}
	}
	return b.String()
}

// QuotationPDF renders a branded quotation as PDF bytes.
func QuotationPDF(q *models.Quotation, b config.Branding) ([]byte, error) {
	pdf := fpdf.New("P", "mm", "A4", "")
	const margin = 14.0
	const pageW = 210.0
	pdf.SetMargins(margin, margin, margin)
	pdf.SetAutoPageBreak(true, 20)
	pdf.AddPage()

	const topStripMM = 4.5
	DrawBrandTopStrip(pdf, pageW, topStripMM)

	// Logo first; company name + tagline + address stacked directly below the logo (not beside it).
	yTop := topStripMM + 2.5
	hasLogo := DrawLogoIfExists(pdf, b.LogoPath, margin, yTop, LogoMaxWidthMM)
	logoH := LogoDrawHeightMM(b.LogoPath, LogoMaxWidthMM)
	if !hasLogo {
		logoH = 0
	}
	if hasLogo && logoH < 14 {
		logoH = 14
	}

	textX := margin
	textW := pageW - 2*margin

	yTextStart := yTop
	if hasLogo {
		yTextStart = yTop + logoH + GapBelowLogoMM
	}
	pdf.SetXY(textX, yTextStart)
	SetBrandTextPrimary(pdf)
	pdf.SetFont("Helvetica", "B", 15)
	pdf.MultiCell(textW, 7, safeASCII(b.CompanyName), "", "L", false)
	pdf.SetX(textX)
	pdf.SetFont("Helvetica", "", 9)
	SetBrandTextMuted(pdf)
	if b.CompanyTagline != "" {
		pdf.MultiCell(textW, 4.2, safeASCII(b.CompanyTagline), "", "L", false)
	}
	if b.CompanyAddress != "" {
		pdf.SetX(textX)
		pdf.MultiCell(textW, 4.2, safeASCII(b.CompanyAddress), "", "L", false)
	}
	var contactParts []string
	if p := strings.TrimSpace(b.CompanyPhone); p != "" {
		contactParts = append(contactParts, p)
	}
	if e := strings.TrimSpace(b.CompanyEmail); e != "" {
		contactParts = append(contactParts, e)
	}
	if len(contactParts) > 0 {
		pdf.SetX(textX)
		pdf.MultiCell(textW, 4.2, safeASCII(strings.Join(contactParts, " | ")), "", "L", false)
	}

	pdf.Ln(11)
	yRule := pdf.GetY()
	DrawBrandDivider(pdf, margin, yRule, pageW-margin)
	pdf.Ln(8)

	SetBrandTextPrimary(pdf)
	pdf.SetFont("Helvetica", "B", 13)
	pdf.SetTextColor(BrandR, BrandG, BrandB)
	pdf.Cell(0, 8, "QUOTATION")
	pdf.Ln(6)
	SetBrandTextPrimary(pdf)
	pdf.SetFont("Helvetica", "", 10)
	pdf.Cell(40, 5, safeASCII("Quote #"))
	pdf.SetFont("Helvetica", "B", 10)
	pdf.Cell(0, 5, safeASCII(q.QuoteNumber))
	pdf.Ln(5)
	pdf.SetFont("Helvetica", "", 10)
	pdf.Cell(40, 5, "Date")
	pdf.Cell(0, 5, q.CreatedAt.Format("2006-01-02"))
	pdf.Ln(8)

	pdf.SetFont("Helvetica", "B", 10)
	pdf.Cell(0, 5, "Bill to")
	pdf.Ln(5)
	pdf.SetFont("Helvetica", "", 9)
	pdf.MultiCell(0, 4, safeASCII(q.CustomerName), "", "L", false)
	if q.CustomerCompany != "" {
		pdf.MultiCell(0, 4, safeASCII(q.CustomerCompany), "", "L", false)
	}
	if q.CustomerEmail != "" {
		pdf.MultiCell(0, 4, safeASCII(q.CustomerEmail), "", "L", false)
	}
	if q.CustomerAddress != "" {
		pdf.MultiCell(0, 4, safeASCII(q.CustomerAddress), "", "L", false)
	}
	pdf.Ln(4)

	if q.ValidUntil != nil {
		pdf.SetFont("Helvetica", "", 9)
		pdf.Cell(0, 5, fmt.Sprintf("Valid until: %s", q.ValidUntil.Format("2006-01-02")))
		pdf.Ln(6)
	}

	// Table header — brand soft fill + dark text
	pdf.SetFillColor(BrandR, BrandG, BrandB)
	pdf.SetTextColor(255, 255, 255)
	pdf.SetFont("Helvetica", "B", 9)
	pdf.CellFormat(85, 7, "Description", "1", 0, "L", true, 0, "")
	pdf.CellFormat(25, 7, "Qty", "1", 0, "R", true, 0, "")
	pdf.CellFormat(35, 7, "Unit", "1", 0, "R", true, 0, "")
	pdf.CellFormat(37, 7, "Line total", "1", 1, "R", true, 0, "")

	pdf.SetFont("Helvetica", "", 9)
	SetBrandTextPrimary(pdf)
	var subtotal float64
	for _, ln := range q.Lines {
		lineTotal := ln.Quantity * ln.UnitPrice
		subtotal += lineTotal
		desc := safeASCII(ln.Description)
		if len(desc) > 90 {
			desc = desc[:87] + "..."
		}
		pdf.CellFormat(85, 7, desc, "LR", 0, "L", false, 0, "")
		pdf.CellFormat(25, 7, fmt.Sprintf("%.2f", ln.Quantity), "LR", 0, "R", false, 0, "")
		pdf.CellFormat(35, 7, fmt.Sprintf("%.2f", ln.UnitPrice), "LR", 0, "R", false, 0, "")
		pdf.CellFormat(37, 7, fmt.Sprintf("%.2f", lineTotal), "LR", 1, "R", false, 0, "")
	}
	pdf.CellFormat(182, 0, "", "T", 1, "C", false, 0, "")
	pdf.Ln(2)

	tax := subtotal * (q.TaxPercent / 100)
	total := subtotal + tax

	pdf.SetFont("Helvetica", "", 10)
	SetBrandTextPrimary(pdf)
	pdf.SetX(120)
	pdf.CellFormat(40, 6, "Subtotal", "", 0, "L", false, 0, "")
	pdf.CellFormat(37, 6, fmt.Sprintf("%.2f", subtotal), "", 1, "R", false, 0, "")
	pdf.SetX(120)
	pdf.CellFormat(40, 6, fmt.Sprintf("Tax (%.1f%%)", q.TaxPercent), "", 0, "L", false, 0, "")
	pdf.CellFormat(37, 6, fmt.Sprintf("%.2f", tax), "", 1, "R", false, 0, "")
	pdf.SetFont("Helvetica", "B", 11)
	pdf.SetTextColor(BrandR, BrandG, BrandB)
	pdf.SetX(120)
	pdf.CellFormat(40, 7, "Total", "", 0, "L", false, 0, "")
	pdf.CellFormat(37, 7, fmt.Sprintf("%.2f", total), "", 1, "R", false, 0, "")
	SetBrandTextPrimary(pdf)

	if q.Notes != "" {
		pdf.Ln(8)
		pdf.SetFont("Helvetica", "B", 9)
		pdf.Cell(0, 5, "Notes")
		pdf.Ln(4)
		pdf.SetFont("Helvetica", "", 8)
		pdf.MultiCell(0, 4, safeASCII(q.Notes), "", "L", false)
	}

	pdf.SetY(-24)
	pdf.SetFont("Helvetica", "I", 8)
	SetBrandTextMuted(pdf)
	pdf.MultiCell(0, 4, safeASCII("Thank you for your business — "+b.CompanyName), "", "C", false)
	pdf.Ln(1)
	pdf.SetFont("Helvetica", "", 7.5)
	pdf.SetTextColor(BrandR, BrandG, BrandB)
	pdf.MultiCell(0, 3.5, safeASCII("Cloud · Network · Security"), "", "C", false)

	var buf bytes.Buffer
	if err := pdf.Output(&buf); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
