package pdf

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"somsuite/backend/config"
	"somsuite/backend/internal/models"

	"github.com/go-pdf/fpdf"
)

// decodeSignatureImage parses data URL or raw base64 into image bytes and fpdf type ("PNG"|"JPEG").
func decodeSignatureImage(s string) ([]byte, string) {
	s = strings.TrimSpace(s)
	if s == "" {
		return nil, ""
	}
	if strings.HasPrefix(s, "data:") {
		comma := strings.IndexByte(s, ',')
		if comma < 0 {
			return nil, ""
		}
		meta, payload := s[:comma], s[comma+1:]
		raw, err := base64.StdEncoding.DecodeString(payload)
		if err != nil {
			return nil, ""
		}
		typ := "PNG"
		if strings.Contains(meta, "jpeg") || strings.Contains(meta, "jpg") {
			typ = "JPEG"
		}
		return raw, typ
	}
	raw, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		return nil, ""
	}
	return raw, "PNG"
}

func addSignatureImage(pdf *fpdf.Fpdf, name string, img []byte, imgType string, maxW, maxH float64) {
	if len(img) == 0 || imgType == "" {
		return
	}
	r := bytes.NewReader(img)
	opt := fpdf.ImageOptions{ImageType: imgType, ReadDpi: true}
	info := pdf.RegisterImageOptionsReader(name, opt, r)
	if info == nil {
		return
	}
	w, h := info.Extent()
	if w <= 0 || h <= 0 {
		return
	}
	scale := maxW / w
	if h*scale > maxH {
		scale = maxH / h
	}
	pw, ph := w*scale, h*scale
	pdf.Image(name, pdf.GetX(), pdf.GetY(), pw, ph, false, "", 0, "")
	pdf.Ln(ph + 2)
}

func isNumberedArticleLine(line string) bool {
	t := strings.TrimSpace(line)
	if len(t) < 4 {
		return false
	}
	dot := strings.IndexByte(t, '.')
	if dot < 1 || dot > 3 {
		return false
	}
	for i := 0; i < dot; i++ {
		if t[i] < '0' || t[i] > '9' {
			return false
		}
	}
	if dot+1 >= len(t) {
		return false
	}
	rest := strings.TrimSpace(t[dot+1:])
	if len(rest) == 0 {
		return false
	}
	c0 := rest[0]
	return (c0 >= 'A' && c0 <= 'Z') || (c0 >= 'a' && c0 <= 'z')
}

func splitLabelValue(line string) (label string, value string, ok bool) {
	t := strings.TrimSpace(line)
	if strings.HasPrefix(t, "PART ") || isNumberedArticleLine(t) {
		return "", "", false
	}
	if strings.HasPrefix(t, "—") && strings.Contains(t, "End of Part A") {
		return "", "", false
	}
	idx := strings.Index(t, ": ")
	if idx < 4 || idx > 52 {
		return "", "", false
	}
	label = strings.TrimSpace(t[:idx])
	value = strings.TrimSpace(t[idx+2:])
	if label == "" || value == "" {
		return "", "", false
	}
	for _, r := range label {
		if r == '\n' {
			return "", "", false
		}
	}
	return label, value, true
}

func splitCompanyAddressLines(addr string) (street, locality string) {
	addr = strings.TrimSpace(addr)
	if addr == "" {
		return "", ""
	}
	if idx := strings.IndexByte(addr, '\n'); idx >= 0 {
		return strings.TrimSpace(addr[:idx]), strings.TrimSpace(addr[idx+1:])
	}
	return addr, ""
}

func clientNameForContract(d *models.DigitalContract) string {
	if d == nil {
		return "—"
	}
	if d.Customer != nil {
		c := d.Customer
		if s := strings.TrimSpace(c.CompanyName); s != "" {
			return s
		}
		if s := strings.TrimSpace(c.LegalName); s != "" {
			return s
		}
		if s := strings.TrimSpace(c.ContactName); s != "" {
			return s
		}
		if s := strings.TrimSpace(c.CustomerCode); s != "" {
			return s
		}
	}
	if s := strings.TrimSpace(d.PartyName); s != "" {
		return s
	}
	return "—"
}

func clientStreetForContract(d *models.DigitalContract) string {
	if d == nil || d.Customer == nil {
		return "—"
	}
	c := d.Customer
	if s := strings.TrimSpace(c.BillingStreet); s != "" {
		return s
	}
	if s := strings.TrimSpace(c.ShippingStreet); s != "" {
		return s
	}
	return "—"
}

func clientLocalityForContract(d *models.DigitalContract) string {
	if d == nil || d.Customer == nil {
		return "—"
	}
	c := d.Customer
	city := strings.TrimSpace(c.BillingCity)
	if city == "" {
		city = strings.TrimSpace(c.ShippingCity)
	}
	state := strings.TrimSpace(c.BillingStateProvince)
	if state == "" {
		state = strings.TrimSpace(c.ShippingStateProvince)
	}
	zip := strings.TrimSpace(c.BillingPostalCode)
	if zip == "" {
		zip = strings.TrimSpace(c.ShippingPostalCode)
	}
	country := strings.TrimSpace(c.BillingCountry)
	if country == "" {
		country = strings.TrimSpace(c.ShippingCountry)
	}
	var parts []string
	if city != "" {
		parts = append(parts, city)
	}
	if state != "" {
		parts = append(parts, state)
	}
	if zip != "" {
		parts = append(parts, zip)
	}
	if country != "" {
		parts = append(parts, country)
	}
	if len(parts) == 0 {
		return "—"
	}
	return strings.Join(parts, ", ")
}

// fillContractPlaceholders substitutes bracket tokens in client onboarding content with branding and CRM data.
func fillContractPlaceholders(d *models.DigitalContract, b config.Branding) string {
	content := d.Content
	coName := strings.TrimSpace(b.CompanyName)
	if coName == "" {
		coName = "Somsuite Technology"
	}
	street, localityFromAddr := splitCompanyAddressLines(b.CompanyAddress)
	locality := localityFromAddr
	if locality == "" {
		locality = strings.TrimSpace(b.CompanyLocalityLine)
	}
	if street == "" {
		street = strings.TrimSpace(b.CompanyAddress)
	}
	if locality == "" {
		locality = "USA"
	}

	eff := time.Now()
	if !d.CreatedAt.IsZero() {
		eff = d.CreatedAt
	}
	effective := eff.Format("January 2, 2006")

	email := strings.TrimSpace(b.CompanyEmail)
	if email == "" {
		email = "—"
	}
	pm := strings.TrimSpace(b.ProjectToolsLabel)
	if pm == "" {
		pm = "Email and scheduled video meetings"
	}
	fee := strings.TrimSpace(b.OnboardingFeeText)
	if fee == "" {
		fee = "as agreed in the proposal or Statement of Work"
	}

	content = strings.ReplaceAll(content, "[Effective Date]", effective)
	content = strings.ReplaceAll(content, "[Company Address]", street)
	content = strings.ReplaceAll(content, "[City, State, ZIP Code, USA]", locality)
	content = strings.ReplaceAll(content, "[Client Name / Business Name]", clientNameForContract(d))
	content = strings.ReplaceAll(content, "[Client Address]", clientStreetForContract(d))
	content = strings.ReplaceAll(content, "[City, State, ZIP Code]", clientLocalityForContract(d))
	content = strings.ReplaceAll(content, "$[Amount]", fee)
	content = strings.ReplaceAll(content, "[Company Email]", email)
	content = strings.ReplaceAll(content, "[e.g., Slack, Trello, Asana]", pm)
	content = strings.ReplaceAll(content, "Somsuite Technology", coName)
	return content
}

func writeContractBody(p *fpdf.Fpdf, content string, margin float64) {
	const pageW = 210.0
	wrapW := pageW - 2*margin
	bodyW := wrapW - 4
	indent := margin + 3.0

	for _, line := range strings.Split(content, "\n") {
		t := strings.TrimRight(line, "\r")
		trimmed := strings.TrimSpace(t)
		p.SetX(margin)
		if trimmed == "" {
			p.Ln(4.2)
			continue
		}

		// Part dividers (A / B)
		if strings.HasPrefix(trimmed, "PART ") {
			p.Ln(5)
			p.SetDrawColor(BrandR, BrandG, BrandB)
			p.SetLineWidth(0.55)
			p.Line(margin, p.GetY(), margin+3, p.GetY())
			p.SetX(margin + 4)
			p.SetFont("Helvetica", "B", 12.5)
			p.SetTextColor(BrandDarkR, BrandDarkG, BrandDarkB)
			p.MultiCell(wrapW-4, 6.5, safeASCII(t), "", "L", false)
			p.Ln(2.5)
			p.SetDrawColor(BrandLineR, BrandLineG, BrandLineB)
			p.SetFont("Helvetica", "", 10.2)
			p.SetTextColor(36, 40, 45)
			continue
		}

		if strings.Contains(trimmed, "End of Part A") {
			p.Ln(2)
			p.SetFillColor(BrandSoftR, BrandSoftG, BrandSoftB)
			p.SetDrawColor(BrandLineR, BrandLineG, BrandLineB)
			y0 := p.GetY()
			p.Rect(margin, y0, wrapW, 12, "FD")
			p.SetXY(margin+3, y0+2.5)
			p.SetFont("Helvetica", "I", 9)
			p.SetTextColor(85, 90, 96)
			p.MultiCell(wrapW-6, 4.8, safeASCII(t), "", "L", false)
			p.SetY(y0 + 13)
			p.SetFont("Helvetica", "", 10.2)
			p.SetTextColor(36, 40, 45)
			continue
		}

		if isNumberedArticleLine(t) {
			p.Ln(3.2)
			p.SetFont("Helvetica", "B", 10.9)
			p.SetTextColor(BrandR, BrandG, BrandB)
			p.MultiCell(wrapW, 6.2, safeASCII(t), "", "L", false)
			p.Ln(1.2)
			p.SetFont("Helvetica", "", 10.2)
			p.SetTextColor(36, 40, 45)
			continue
		}

		if lab, val, ok := splitLabelValue(t); ok {
			p.SetFont("Helvetica", "B", 9.9)
			p.SetTextColor(48, 54, 62)
			p.MultiCell(wrapW, 5.5, safeASCII(lab)+":", "", "L", false)
			p.SetFont("Helvetica", "", 10.2)
			p.SetTextColor(36, 40, 45)
			p.SetX(indent)
			p.MultiCell(bodyW, 6.0, safeASCII(val), "", "L", false)
			p.Ln(2.2)
			continue
		}

		p.SetX(indent)
		p.SetFont("Helvetica", "", 10.2)
		p.SetTextColor(36, 40, 45)
		p.MultiCell(bodyW, 6.0, safeASCII(t), "", "L", false)
		p.Ln(1.4)
	}
}

// ContractPDF renders contract text with optional embedded signatures.
func ContractPDF(d *models.DigitalContract, b config.Branding) ([]byte, error) {
	p := fpdf.New("P", "mm", "A4", "")
	const margin = 18.0
	const pageW = 210.0
	p.SetMargins(margin, margin, margin)
	p.SetAutoPageBreak(true, 36)
	p.AliasNbPages("{nb}")

	p.AddPage()

	coName := strings.TrimSpace(b.CompanyName)
	if coName == "" {
		coName = "Company"
	}

	kindLabel := "CLIENT ONBOARDING AGREEMENT"
	if d.ContractKind == "employee" {
		kindLabel = "ICT EMPLOYMENT AGREEMENT"
	}
	yBelowHeader := DrawContractHeaderBand(p, pageW, margin, b, kindLabel)
	p.SetY(yBelowHeader)
	DrawBrandDivider(p, margin, p.GetY(), pageW-margin)
	p.Ln(7)

	SetBrandTextPrimary(p)
	p.SetFont("Helvetica", "B", 15)
	p.MultiCell(0, 7.2, safeASCII(d.Title), "", "L", false)
	p.Ln(5)

	// Party summary card
	cardY := p.GetY()
	p.SetFillColor(BrandSoftR, BrandSoftG, BrandSoftB)
	p.SetDrawColor(BrandLineR, BrandLineG, BrandLineB)
	p.SetLineWidth(0.28)
	p.Rect(margin, cardY, pageW-2*margin, 36, "FD")
	p.SetXY(margin+5, cardY+4)
	p.SetFont("Helvetica", "B", 8)
	p.SetTextColor(BrandR, BrandG, BrandB)
	p.Cell(0, 4, safeASCII("PARTIES & METADATA"))
	p.Ln(5)
	p.SetFont("Helvetica", "", 9.2)
	p.SetTextColor(30, 34, 38)
	if d.PartyName != "" {
		p.SetFont("Helvetica", "B", 9.2)
		p.Cell(40, 5, safeASCII("Counterparty"))
		p.SetFont("Helvetica", "", 9.2)
		p.MultiCell(0, 5, safeASCII(d.PartyName), "", "L", false)
	}
	if d.PartyEmail != "" {
		p.SetFont("Helvetica", "B", 9.2)
		p.Cell(40, 5, safeASCII("Email"))
		p.SetFont("Helvetica", "", 9.2)
		p.MultiCell(0, 5, safeASCII(d.PartyEmail), "", "L", false)
	}
	if d.Employee != nil && d.ContractKind == "employee" {
		p.SetFont("Helvetica", "B", 9.2)
		p.Cell(40, 5, safeASCII("Employee"))
		p.SetFont("Helvetica", "", 9.2)
		p.MultiCell(0, 5, safeASCII(d.Employee.FullName), "", "L", false)
	}
	if d.Customer != nil && d.ContractKind == "customer" {
		p.SetFont("Helvetica", "B", 9.2)
		p.Cell(40, 5, safeASCII("Registered client"))
		p.SetFont("Helvetica", "", 9.2)
		fn := strings.TrimSpace(d.Customer.CompanyName)
		if fn == "" {
			fn = strings.TrimSpace(d.Customer.ContactName)
		}
		if fn == "" {
			fn = d.Customer.CustomerCode
		}
		p.MultiCell(0, 5, safeASCII(fn), "", "L", false)
	}
	p.SetFont("Helvetica", "", 8.5)
	p.SetTextColor(75, 80, 88)
	p.MultiCell(0, 4.5, safeASCII("Document date: "+time.Now().Format("2006-01-02")), "", "L", false)
	if d.Status == "signed" && d.SignedAt != nil {
		p.MultiCell(0, 4.5, safeASCII("Executed: "+d.SignedAt.Format("2006-01-02 15:04")), "", "L", false)
	}
	p.SetY(cardY + 38)
	p.Ln(7)

	p.SetTextColor(32, 36, 40)
	p.SetFont("Helvetica", "B", 11.5)
	p.MultiCell(0, 5.5, safeASCII("Terms of agreement"), "", "L", false)
	p.Ln(0.5)
	p.SetFont("Helvetica", "I", 8.8)
	p.SetTextColor(95, 100, 108)
	intro := "Part A describes the scope; Part B sets general rules. Line spacing is tuned for reading and signing."
	if d.ContractKind == "customer" {
		intro = "This Client Onboarding Agreement sets out onboarding scope, responsibilities, and signatures."
	}
	p.MultiCell(0, 4.2, safeASCII(intro), "", "L", false)
	p.Ln(3)
	SetBrandTextPrimary(p)
	p.SetDrawColor(BrandLineR, BrandLineG, BrandLineB)
	p.SetLineWidth(0.25)
	p.Line(margin, p.GetY(), pageW-margin, p.GetY())
	p.Ln(6)
	bodyContent := d.Content
	if d.ContractKind == "customer" {
		bodyContent = fillContractPlaceholders(d, b)
	}
	writeContractBody(p, bodyContent, margin)
	p.Ln(11)

	if d.ContractKind == "employee" && strings.TrimSpace(d.CeoName) != "" {
		p.SetFont("Helvetica", "B", 9.5)
		p.SetTextColor(32, 32, 48)
		p.Cell(0, 5, safeASCII("For the company"))
		p.Ln(5)
		p.SetFont("Helvetica", "", 9.5)
		p.SetTextColor(36, 40, 45)
		p.MultiCell(0, 4.5, safeASCII(d.CeoName+" - Authorized signatory"), "", "L", false)
		if img, typ := decodeSignatureImage(d.CeoSignature); len(img) > 0 {
			addSignatureImage(p, "ceosig", img, typ, 55, 22)
		}
		p.Ln(4)
	}

	p.SetFillColor(255, 255, 255)
	p.SetDrawColor(BrandLineR, BrandLineG, BrandLineB)
	sigY := p.GetY()
	p.Rect(margin, sigY, pageW-2*margin, 24, "FD")
	p.SetXY(margin+4, sigY+3.5)
	p.SetFont("Helvetica", "B", 9.5)
	p.SetTextColor(28, 32, 36)
	p.Cell(0, 4, safeASCII("Counterparty signature"))
	p.Ln(4.5)
	p.SetFont("Helvetica", "", 8.5)
	if d.Status != "signed" || strings.TrimSpace(d.PartySignature) == "" {
		p.MultiCell(0, 4.2, safeASCII("(Pending - use the shared signing link to capture a digital signature.)"), "", "L", false)
	} else {
		if img, typ := decodeSignatureImage(d.PartySignature); len(img) > 0 {
			addSignatureImage(p, "partysig", img, typ, 55, 22)
		} else {
			p.MultiCell(0, 4.2, safeASCII("Signed electronically."), "", "L", false)
		}
	}
	p.SetY(sigY + 27)

	p.SetY(-24)
	p.SetFont("Helvetica", "I", 7.8)
	SetBrandTextMuted(p)
	footer := safeASCII(coName) + " | Confidential document | Page " +
		fmt.Sprintf("%d", p.PageNo()) + " of {nb}"
	p.MultiCell(0, 3.9, footer, "", "C", false)

	var buf bytes.Buffer
	if err := p.Output(&buf); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
