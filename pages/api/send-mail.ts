import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgunClient = new Mailgun(FormData);
const mg = mailgunClient.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });
const EMAIL_FROM = 'WP PRO <info@mail.wppro.au>';
const EMAIL_TO = ['info@wppro.au'];

type FormType = 'project_enquiry' | 'contact_us';

interface EmailData {
  form: FormType;
  fullName?: string;
  email?: string;
  subject?: string;
  company?: string;
  phone?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isProjectEnquiryForm(data: EmailData): boolean {
  return data.form === 'project_enquiry';
}

function isContactUsForm(data: EmailData): boolean {
  return data.form === 'contact_us';
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as EmailData;

  if (!validateEmail(data.email || '')) {
    return res.status(403).json({ err: 'Email is not valid!' });
  }

  if (isProjectEnquiryForm(data)) {
    try {
      await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: 'Project Enquiry',
        'h:Reply-To': data.email,
        html: `
          <p>Name: ${data.fullName}</p>
          <p>Company: ${data.company}</p>
          <p>Email: ${data.email}</p>
          <p>Phone: ${data.phone}</p>
          <p>Message: ${data.message}</p>
        `,
      });

      return res.status(200).json({ msg: 'Email successfully sent' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: 'Error sending email!' });
    }
  }

  if (isContactUsForm(data)) {
    try {
      await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: data.subject,
        'h:Reply-To': data.email,
        html: `
        <p>Name: ${data.fullName}</p>
        <p>Company: ${data.company}</p>
        <p>Email: ${data.email}</p>
        <p>Phone: ${data.phone}</p>
        <p>Message: ${data.message}</p>
        `,
      });

      return res.status(200).json({ msg: 'Email successfully sent' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: 'Error sending contact us email!' });
    }
  }

  return res.status(400).json({ err: 'Invalid email form data!' });
};

export default handler;