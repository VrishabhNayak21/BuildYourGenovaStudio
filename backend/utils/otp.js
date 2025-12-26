import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email, otp) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
    });
    console.log('OTP Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(email) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to GenovaStudio!',
      html: '<p>Welcome to GenovaStudio! We are excited to have you on board. Enjoy exploring our platform!</p>'
    });
    console.log('Welcome Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}