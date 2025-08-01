import { useEffect, useState } from 'react';
import Image from 'next/image';

function GenerateVCardQRCode() {
  const [qrCodeImage, setQRCodeImage] = useState('');

  useEffect(() => {
    // Make an API request to the generateQRCode route
    fetch('/api/generateQRCode')
      .then((response) => response.json())
      .then((data) => {
        // Set the generated image path
        setQRCodeImage(data.imagePath);
      });
  }, []);

  return (
    <div>      {qrCodeImage ? (
        <Image src={qrCodeImage} alt="QR Code with Logo" width={300} height={300} />
      ) : (
        'Generating QR Code with Logo...'
      )}
    </div>
  );
}

export default GenerateVCardQRCode;
