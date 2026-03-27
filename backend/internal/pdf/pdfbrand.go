package pdf

import (
	"image"
	_ "image/jpeg"
	_ "image/png"
	"os"
	"path/filepath"
	"strings"

	"somsuite/backend/config"

	"github.com/go-pdf/fpdf"
)

// Brand palette — #4191c3 (accent) · #1d1d1d (dark) · soft surfaces for PDF (RGB).
const (
	BrandR, BrandG, BrandB           = 65, 145, 195
	BrandDarkR, BrandDarkG, BrandDarkB = 29, 29, 29
	BrandSoftR, BrandSoftG, BrandSoftB = 236, 245, 252
	BrandLineR, BrandLineG, BrandLineB = 180, 210, 230
)

// DrawBrandTopStrip draws a full-width accent bar at the top of the page (y from top, mm).
func DrawBrandTopStrip(p *fpdf.Fpdf, pageW, heightMM float64) {
	p.SetFillColor(BrandR, BrandG, BrandB)
	p.Rect(0, 0, pageW, heightMM, "F")
}

// SetBrandTextPrimary sets body text to near-black brand.
func SetBrandTextPrimary(p *fpdf.Fpdf) {
	p.SetTextColor(BrandDarkR, BrandDarkG, BrandDarkB)
}

// SetBrandTextMuted sets secondary/muted text.
func SetBrandTextMuted(p *fpdf.Fpdf) {
	p.SetTextColor(88, 96, 104)
}

// DrawBrandDivider draws a horizontal rule under headers.
func DrawBrandDivider(p *fpdf.Fpdf, x1, y, x2 float64) {
	p.SetDrawColor(BrandLineR, BrandLineG, BrandLineB)
	p.SetLineWidth(0.35)
	p.Line(x1, y, x2, y)
}

// LogoMaxWidthMM is logo width for quotation and contract PDF headers (mm).
const LogoMaxWidthMM = 78.0

// GapBelowLogoMM is vertical space between the logo and the company name block (mm).
const GapBelowLogoMM = 9.0

// DrawLogoIfExists draws PNG/JPEG at (x,y) with max width; returns true if drawn.
// ReadDpi is false so embedded PNG DPI does not shrink the logo unexpectedly.
func DrawLogoIfExists(p *fpdf.Fpdf, logoPath string, x, y, maxWMM float64) bool {
	if logoPath == "" {
		return false
	}
	st, err := os.Stat(logoPath)
	if err != nil || st.IsDir() {
		return false
	}
	imgType := ""
	switch strings.ToLower(filepath.Ext(logoPath)) {
	case ".png":
		imgType = "PNG"
	case ".jpg", ".jpeg":
		imgType = "JPEG"
	}
	p.ImageOptions(logoPath, x, y, maxWMM, 0, false, fpdf.ImageOptions{
		ImageType: imgType,
		ReadDpi:   false,
	}, 0, "")
	return true
}

// LogoDrawHeightMM returns the rendered height (mm) of the logo image when scaled to maxWMM width.
func LogoDrawHeightMM(logoPath string, maxWMM float64) float64 {
	if maxWMM <= 0 {
		return 0
	}
	st, err := os.Stat(logoPath)
	if err != nil || st.IsDir() {
		return 0
	}
	f, err := os.Open(logoPath)
	if err != nil {
		return maxWMM * 0.35
	}
	defer f.Close()
	cfg, _, err := image.DecodeConfig(f)
	if err != nil {
		return maxWMM * 0.35
	}
	wo, ho := float64(cfg.Width), float64(cfg.Height)
	if wo <= 0 || ho <= 0 {
		return maxWMM * 0.35
	}
	return ho * (maxWMM / wo)
}

// DrawContractHeaderBand matches the quotation header: blue strip, logo, then company name + tagline
// stacked below the logo, then agreement kind + confidential line. Returns Y below the header block.
func DrawContractHeaderBand(p *fpdf.Fpdf, pageW, margin float64, b config.Branding, kindLabel string) float64 {
	const topStripMM = 4.5
	DrawBrandTopStrip(p, pageW, topStripMM)

	yTop := topStripMM + 2.5
	hasLogo := DrawLogoIfExists(p, b.LogoPath, margin, yTop, LogoMaxWidthMM)
	logoH := LogoDrawHeightMM(b.LogoPath, LogoMaxWidthMM)
	if !hasLogo {
		logoH = 0
	}
	if hasLogo && logoH < 14 {
		logoH = 14
	}

	textX := margin
	textW := pageW - 2*margin

	coName := strings.TrimSpace(b.CompanyName)
	if coName == "" {
		coName = "Company"
	}

	yTextStart := yTop
	if hasLogo {
		yTextStart = yTop + logoH + GapBelowLogoMM
	}
	p.SetXY(textX, yTextStart)
	SetBrandTextPrimary(p)
	p.SetFont("Helvetica", "B", 15)
	p.MultiCell(textW, 7, safeASCII(coName), "", "L", false)
	p.SetX(textX)
	p.SetFont("Helvetica", "", 9)
	SetBrandTextMuted(p)
	if strings.TrimSpace(b.CompanyTagline) != "" {
		p.MultiCell(textW, 4.2, safeASCII(b.CompanyTagline), "", "L", false)
	}
	p.SetX(textX)
	p.Ln(2)
	p.SetFont("Helvetica", "B", 10.5)
	p.SetTextColor(BrandR, BrandG, BrandB)
	p.MultiCell(textW, 5, safeASCII(kindLabel), "", "L", false)
	p.SetFont("Helvetica", "", 7.0)
	p.SetTextColor(100, 110, 120)
	p.SetX(textX)
	p.MultiCell(textW, 3.8, safeASCII("Confidential document"), "", "L", false)

	p.Ln(11)
	return p.GetY()
}
