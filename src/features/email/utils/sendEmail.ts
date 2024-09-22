import { EMAIL_PROVIDER } from '@/constants';
import { emailLoggingMiddleware } from '@/middleware/emailLoggingMiddleware';

import nodemailerService from '../server/nodemailerService';
import sendGridService from '../server/sendgridService';
import { EmailService } from '../types/EmailService';

let emailService: EmailService;

if (EMAIL_PROVIDER === 'sendgrid') {
  emailService = emailLoggingMiddleware(sendGridService);
} else {
  emailService = emailLoggingMiddleware(nodemailerService);
}

export const sendEmail = emailService.sendEmail;
