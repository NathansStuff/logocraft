import sgMail from '@sendgrid/mail';

import { env } from '@/constants';

import { Email } from '../types/Email';
import { EmailService } from '../types/EmailService';

const sendGridService: EmailService = {
  sendEmail: async (email: Email): Promise<void> => {
    const { to, subject, body } = email;
    sgMail.setApiKey(env.SENDGRID_API_KEY);

    const msg = {
      to,
      from: env.SENDGRID_EMAIL,
      subject,
      text: body,
    };

    await sgMail.send(msg);
  },
};

export default sendGridService;
