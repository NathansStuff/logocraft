import { Email } from './Email';

export interface EmailService {
  sendEmail({ to, subject, body }: Email): Promise<void>;
}
