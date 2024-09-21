import { EMAIL_PROVIDER } from '@/constants';
import { emailLoggingMiddleware } from '@/middleware/emailLoggingMiddleware';

import { EmailService } from './EmailService';
import nodemailerService from './nodemailerService';
import sendGridService from './sendgridService';

let emailService: EmailService;

if (EMAIL_PROVIDER === 'sendgrid') {
  emailService = emailLoggingMiddleware(sendGridService);
} else {
  emailService = emailLoggingMiddleware(nodemailerService);
}

export const sendEmail = emailService.sendEmail;
