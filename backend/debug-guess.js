import nodemailer from 'nodemailer';

const user = 'vrishabhnayak21@gmail.com'; // Trying GitHub username
const pass = 'YOUR_SMTP_KEY'; // Replace with your actual SMTP key

async function verifySMTP() {
    console.log(`Testing SMTP connection for USER: ${user}`);

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: user,
            pass: pass,
        },
    });

    try {
        await transporter.verify();
        console.log('✅ SMTP SUCCESS! The correct email is:', user);
    } catch (error) {
        console.error('❌ Failed with:', user);
        console.error(error.response || error);
    }
}

verifySMTP();
