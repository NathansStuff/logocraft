import { PROJECT_NAME } from '@/constants';
import { ContactEmailRequest } from '@/features/contactForm/types/ContactEmailRequest';

export function contactEmailNotificationTemplate(request: ContactEmailRequest): {
  body: string;
  subject: string;
} {
  const { name, email, message, subject } = request;
  const project = PROJECT_NAME ?? 'Your Project';
  const emailSubject = `New Contact Message from ${project}`;
  const body = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 20px 0;
        }
        .content {
          padding: 20px;
          text-align: left;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Message</h2>
        </div>
        <div class="content">
          <p><strong>Project:</strong> ${project}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
        <div class="footer">
          <p>Received from your project's contact form</p>
        </div>
      </div>
    </body>
  </html>
  `;

  return { body, subject: emailSubject };
}
