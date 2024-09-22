import nodemailerService from '@/features/email/server/nodemailerService';
import { Email } from '@/features/email/types/Email';
import { EmailService } from '@/features/email/types/EmailService';
import { createServerLogService } from '@/features/log/server/logService';
import { ELogStatus } from '@/features/log/types/ELogStatus';
import { ELogType } from '@/features/log/types/ELogType';
import { Log } from '@/features/log/types/Log';

export function emailLoggingMiddleware(emailService: EmailService): EmailService {
  return {
    async sendEmail(email: Email): Promise<void> {
      const baseLog: Log = {
        userId: email.userId,
        action: ELogType.EMAIL_SENT,
        ipAddress: email.ipAddress,
        additionalInfo: {
          provider: emailService === nodemailerService ? 'nodemailer' : 'sendgrid',
        },
        status: ELogStatus.IN_PROGRESS,
        details: `Sending email to ${email.to} with subject ${email.subject}`,
      };

      try {
        // Call the original sendEmail method
        await emailService.sendEmail(email);

        // Log success
        await createServerLogService({
          ...baseLog,
          status: ELogStatus.SUCCESS,
          details: `Email sent successfully to ${email.to} with subject ${email.subject}`,
        });
      } catch (error) {
        let errorDetails = 'An unknown error occurred';

        if (error instanceof Error) {
          errorDetails = error.message;
        }

        // Log failure
        await createServerLogService({
          ...baseLog,
          status: ELogStatus.FAILURE,
          details: `Failed to send email to ${email.to} with subject ${email.subject}`,
          additionalInfo: {
            ...baseLog.additionalInfo,
            error: errorDetails,
          },
        });

        throw error; // Re-throw the error after logging
      }
    },
  };
}
