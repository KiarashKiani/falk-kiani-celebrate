import QRCode from 'qrcode';

export async function generateQRCodeDataURL(url: string, size: number = 512): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    });
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

export async function downloadQRCode(url: string, filename: string = 'wedding-qr-code.png', size: number = 1024): Promise<void> {
  try {
    const dataUrl = await generateQRCodeDataURL(url, size);
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw error;
  }
}
