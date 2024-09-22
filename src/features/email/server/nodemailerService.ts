import nodemailer from 'nodemailer';

import { env } from '@/constants';

import { Email } from '../types/Email';
import { EmailService } from '../types/EmailService';

const nodemailerService: EmailService = {
  sendEmail: async (email: Email): Promise<void> => {
    const { to, subject, body } = email;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL_EMAIL,
        pass: env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: env.GMAIL_EMAIL,
      to,
      subject,
      html: body,
    });
  },
};

export default nodemailerService;
