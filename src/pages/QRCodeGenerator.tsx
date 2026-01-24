import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QRCodeSVG } from 'qrcode.react';
import { Download, QrCode, Copy, Check, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRCodeGenerator = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('https://somsuite.tech');
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const svg = document.getElementById('qrcode-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `somsuite-qrcode-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast({
              title: "Downloaded!",
              description: "QR code has been downloaded successfully.",
            });
          }
        });
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleCopy = async () => {
    try {
      const svg = document.getElementById('qrcode-svg');
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const item = new ClipboardItem({ 'image/svg+xml': blob });
      await navigator.clipboard.write([item]);
      
      setCopied(true);
      toast({
        title: "Copied!",
        description: "QR code has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy QR code. Please try downloading instead.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setUrl('https://somsuite.tech');
    setSize(256);
    toast({
      title: "Reset",
      description: "QR code settings have been reset.",
    });
  };

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
            <QrCode className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            QR Code <span className="text-accent">Generator</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-8">
            Generate QR codes for somsuite.tech and any other URL. Download or copy your QR code instantly.
          </p>
        </div>
      </section>

      {/* QR Code Generator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-8 border-glow bg-card tech-pattern">
            <h2 className="text-2xl font-bold mb-6 circuit-lines">Generate QR Code</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url">URL or Text</Label>
                <Input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://somsuite.tech"
                  className="border-input-border focus:border-accent"
                />
                <p className="text-sm text-foreground-muted">
                  Enter any URL or text to generate a QR code
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size: {size}px</Label>
                <input
                  id="size"
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-foreground-muted">
                  <span>128px</span>
                  <span>256px</span>
                  <span>384px</span>
                  <span>512px</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleDownload}
                  variant="hero"
                  className="flex-1"
                >
                  <Download className="mr-2 w-5 h-5" />
                  Download
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 w-5 h-5" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="ghost"
                >
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* QR Code Display */}
          <Card className="p-8 border-glow bg-card flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="inline-block p-6 bg-white rounded-lg border-2 border-accent/20">
                <QRCodeSVG
                  id="qrcode-svg"
                  value={url || 'https://somsuite.tech'}
                  size={size}
                  level="H"
                  includeMargin={true}
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Preview</p>
                <p className="text-xs text-foreground-muted break-all">
                  {url || 'https://somsuite.tech'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <Card className="p-8 border-glow bg-card">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Generate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => setUrl('https://somsuite.tech')}
              className="h-auto py-4 flex flex-col items-center space-y-2"
            >
              <QrCode className="w-6 h-6" />
              <span className="text-sm">Homepage</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setUrl('https://somsuite.tech/contact')}
              className="h-auto py-4 flex flex-col items-center space-y-2"
            >
              <QrCode className="w-6 h-6" />
              <span className="text-sm">Contact Us</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setUrl('https://somsuite.tech/services')}
              className="h-auto py-4 flex flex-col items-center space-y-2"
            >
              <QrCode className="w-6 h-6" />
              <span className="text-sm">Services</span>
            </Button>
          </div>
        </Card>
      </section>

      {/* Info Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <Card className="p-8 border-glow bg-card">
          <h2 className="text-2xl font-bold mb-6">How to Use</h2>
          <div className="space-y-4 text-foreground-muted">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Enter URL or Text</h3>
                <p>Type any URL (like https://somsuite.tech) or text you want to encode in the QR code.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Adjust Size</h3>
                <p>Use the slider to adjust the QR code size from 128px to 512px.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Download or Copy</h3>
                <p>Download the QR code as a PNG image or copy it to your clipboard for immediate use.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default QRCodeGenerator;
