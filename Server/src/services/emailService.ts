
import nodemailer from 'nodemailer';

// You can use Ethereal (for testing) or your Gmail/SendGrid credentials
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});


export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"AI Workflow Engine" <noreply@aiengine.com>',
      to,
      subject,
      text,
    });
    return info.messageId;
  } catch (error) {
    console.error("SMTP Error:", error);
    // Return a dummy ID or handle gracefully instead of throwing
    return "email_failed"; 
  }
};