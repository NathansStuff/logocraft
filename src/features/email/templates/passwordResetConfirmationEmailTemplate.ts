export function passwordResetConfirmationEmailTemplate(firstName: string): {
  body: string;
  subject: string;
} {
  const subject = 'Password Reset Confirmation';
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
        .header img {
          width: 100px;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 20px;
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
          <h2>Password Successfully Reset</h2>
        </div>
        <div class="content">
          <p>Hi ${firstName},</p>
          <p>We wanted to let you know that your password has been successfully reset.</p>
          <p>If you did not perform this action, please secure your account immediately by contacting our support team.</p>
        </div>
        <div class="footer">
          <p>Thanks,<br>The Team</p>
        </div>
      </div>
    </body>
  </html>
  `;

  return { body, subject };
}
