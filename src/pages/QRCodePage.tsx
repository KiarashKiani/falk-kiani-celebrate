import QRCodeDownload from '@/components/QRCodeDownload';
import weddingLogo from '@/assets/wedding-logo.png';

const QRCodePage = () => {
  return (
    <div className="min-h-screen bg-wedding-sage flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <img 
          src={weddingLogo} 
          alt="Josefin & Kiarash" 
          className="w-48 h-auto mx-auto"
        />
        
        <div>
          <h1 className="font-script text-3xl md:text-4xl text-primary mb-2">
            Wedding QR Code
          </h1>
          <p className="text-muted-foreground">
            Download this QR code for your wedding invitations
          </p>
        </div>

        <QRCodeDownload />

        <p className="text-xs text-muted-foreground">
          The high-resolution download is 1024×1024 pixels, suitable for print.
        </p>
      </div>
    </div>
  );
};

export default QRCodePage;
