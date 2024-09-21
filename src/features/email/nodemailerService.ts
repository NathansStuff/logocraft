import { GMAIL_EMAIL, GMAIL_PASS } from '@/constants';
import nodemailer from 'nodemailer';
import { Email } from './Email';
import { EmailService } from './EmailService';

const nodemailerService: EmailService = {
  sendEmail: async (email: Email): Promise<void> => {
    const { to, subject, body } = email;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: GMAIL_EMAIL,
      to,
      subject,
      html: body,
    });
  },
};

export default nodemailerService;
