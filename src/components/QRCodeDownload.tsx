import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download, QrCode } from 'lucide-react';
import { generateQRCodeDataURL, downloadQRCode } from '@/utils/generateQRCode';
import WavyBorderCard from './ui/WavyBorderCard';

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
        <QrCode className="w-12 h-12 text-wedding-olive animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <WavyBorderCard className="w-72 h-72 md:w-80 md:h-80">
        {qrCodeDataUrl && (
          <img 
            src={qrCodeDataUrl} 
            alt="Wedding website QR code" 
            className="w-44 h-44 md:w-52 md:h-52 mx-auto"
          />
        )}
        <p className="text-sm text-wedding-olive mt-3 font-serif">
          falkkiani.se
        </p>
      </WavyBorderCard>
      <Button 
        onClick={handleDownload}
        variant="outline"
        className="gap-2 border-wedding-olive text-wedding-olive hover:bg-wedding-olive hover:text-white transition-colors"
      >
        <Download className="w-4 h-4" />
        Download QR Code (High-Res)
      </Button>
    </div>
  );
};

export default QRCodeDownload;
