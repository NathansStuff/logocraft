export function resendEmailVerificationTemplate(
  firstName: string,
  verificationLink: string
): { body: string; subject: string } {
  const subject = 'Resend: Verify Your Email Address';
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
          background-color: #28a745;
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
          <h2>Email Verification Reminder</h2>
        </div>
        <div class="content">
          <p>Hi ${firstName},</p>
          <p>As requested, we're sending you another link to verify your email address. Please click the button below to complete your registration:</p>
          <a href="${verificationLink}" class="btn">Verify Your Email</a>
          <p>If you did not request this email, please ignore it.</p>
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
