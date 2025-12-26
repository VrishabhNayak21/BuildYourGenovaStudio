import dotenv from 'dotenv';
import { sendOTPEmail, generateOTP } from './utils/otp.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function testBrevoAPI() {
    console.log('Testing Brevo API Integration...');
    // We send to the same email as sender to ensure it works on free tiers too (though Brevo limit is usually volume, not recipient)
    const testEmail = 'nayakvrishabh@gmail.com';
    console.log(`Sending OTP to: ${testEmail}`);

    try {
        const otp = generateOTP();
        await sendOTPEmail(testEmail, otp);
        console.log('✅ Brevo API email sent successfully!');
    } catch (error) {
        console.error('❌ Failed to send Brevo API email:', error);
    }
}

testBrevoAPI();
