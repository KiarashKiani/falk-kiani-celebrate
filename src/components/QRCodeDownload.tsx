import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download, QrCode } from 'lucide-react';
import { generateQRCodeDataURL, downloadQRCode } from '@/utils/generateQRCode';

interface QRCodeDownloadProps {
  url?: string;
  className?: string;
}

const QRCodeDownload = ({ 
  url = 'https://falkkiani.se',
  className = ''
}: QRCodeDownloadProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateCode = async () => {
      try {
        const dataUrl = await generateQRCodeDataURL(url, 300);
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateCode();
  }, [url]);

  const handleDownload = async () => {
    try {
      await downloadQRCode(url, 'falkkiani-wedding-qr.png', 1024);
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <QrCode className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {qrCodeDataUrl && (
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <img 
            src={qrCodeDataUrl} 
            alt="Wedding website QR code" 
            className="w-48 h-48 md:w-64 md:h-64"
          />
        </div>
      )}
      <p className="text-sm text-muted-foreground text-center">
        Scan to visit falkkiani.se
      </p>
      <Button 
        onClick={handleDownload}
        variant="outline"
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        Download QR Code (High-Res)
      </Button>
    </div>
  );
};

export default QRCodeDownload;
