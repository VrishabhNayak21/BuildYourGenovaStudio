import SibApiV3Sdk from 'sib-api-v3-sdk';

const getBrevoClient = () => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is missing in environment variables.");
  }
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  return new SibApiV3Sdk.TransactionalEmailsApi();
};

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email, otp) {
  try {
    const apiInstance = getBrevoClient();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Your OTP Code";
    sendSmtpEmail.htmlContent = `<html><body><p>Your OTP code is: <strong>${otp}</strong></p></body></html>`;
    sendSmtpEmail.sender = { "name": "GenovaStudio", "email": "nayakvrishabh@gmail.com" };
    sendSmtpEmail.to = [{ "email": email }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('OTP Email sent successfully. Message ID:', data.messageId);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(email) {
  try {
    const apiInstance = getBrevoClient();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Welcome to GenovaStudio!";
    sendSmtpEmail.htmlContent = "<html><body><p>Welcome to GenovaStudio! We are excited to have you on board. Enjoy exploring our platform!</p></body></html>";
    sendSmtpEmail.sender = { "name": "GenovaStudio", "email": "nayakvrishabh@gmail.com" };
    sendSmtpEmail.to = [{ "email": email }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Welcome Email sent successfully. Message ID:', data.messageId);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}