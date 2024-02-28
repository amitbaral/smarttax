// pages/api/generateQRCode.ts
import { NextApiRequest, NextApiResponse } from 'next';
var QRCode = require('qrcode')
import fs from 'fs';
import getConfig from 'next/config';

const generateQRCode =  async (req: NextApiRequest, res: NextApiResponse) => {
    const textToEncode = 'https://example.com'; // Replace with your content

    const vCardData = `BEGIN:VCARD
    VERSION:3.0
    FN:John Doe
    ORG:My Company
    TEL:123-456-7890
    EMAIL:john@example.com
    ADR:123 Main St, City, State, ZIP Code
    END:VCARD`;

    const opts = {
        errorCorrectionLevel: 'H',
    };
    //public/assets/imgs/brand/icon.png

    QRCode.toDataURL(vCardData, opts, (err, qrCodeDataUrl) => {
        if (err) {
            console.error(err);
            res.status(500).end('Error generating QR code');
          }
        
          // Save the QR code image to a file
          //const imagePath = './public/vCardQRCode.png';
          const imagePath = 'public/assets/imgs/brand/vCardQRCode.png';
          fs.writeFileSync(imagePath, qrCodeDataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
        
          // Respond with the path to the generated image
          res.status(200).json({ imagePath });
    });
};

export default generateQRCode;
