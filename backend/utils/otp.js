import nodemailer from 'nodemailer';

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendWelcomeEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to GenovaStudio!',
    text: 'Welcome to GenovaStudio! We are excited to have you on board. Enjoy exploring our platform!'
  };

  await transporter.sendMail(mailOptions);
}