import { SENDGRID_API_KEY, SENDGRID_EMAIL } from '@/constants';
import sgMail from '@sendgrid/mail';
import { Email } from './Email';
import { EmailService } from './EmailService';

const sendGridService: EmailService = {
  sendEmail: async (email: Email): Promise<void> => {
    const { to, subject, body } = email;
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to,
      from: SENDGRID_EMAIL,
      subject,
      text: body,
    };

    await sgMail.send(msg);
  },
};

export default sendGridService;
