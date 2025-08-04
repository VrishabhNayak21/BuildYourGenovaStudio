# Email Setup Guide

This guide will help you set up email functionality for the GenovaStudio application.

## Prerequisites

1. **Install nodemailer** (if not already installed):
   ```bash
   npm install nodemailer
   ```

2. **Gmail Account Setup**:
   - You need a Gmail account to send emails
   - Enable 2-Step Verification on your Google Account
   - Generate an App Password for the application

## Environment Variables

Add the following variables to your `.env` file:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Gmail App Password Setup

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords** (under 2-Step Verification)
5. Select **Mail** as the app and **Other** as the device
6. Click **Generate**
7. Copy the generated 16-character password
8. Use this password in your `EMAIL_PASSWORD` environment variable

## Email Features

### 1. Welcome Email
- Sent automatically when a new user registers
- Contains welcome message and information about GenovaStudio
- Sent to the email address used during registration

### 2. Payment Confirmation Email
- Sent automatically when payment is successfully processed
- Contains order details, payment confirmation, and next steps
- Sent to the user's registered email address

## Testing

To test the email functionality:

1. Make sure your environment variables are set correctly
2. Register a new user account
3. Complete a test purchase
4. Check the email inbox for welcome and payment confirmation emails

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**:
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify that 2-Step Verification is enabled

2. **"Less secure app access" error**:
   - Gmail no longer supports less secure apps
   - Use App Passwords instead

3. **Emails not sending**:
   - Check your environment variables
   - Verify your Gmail credentials
   - Check the console for error messages

## Security Notes

- Never commit your `.env` file to version control
- Keep your App Password secure
- Consider using environment-specific email configurations for production 