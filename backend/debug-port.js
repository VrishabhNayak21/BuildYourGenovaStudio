import nodemailer from 'nodemailer';

const user = 'nayakvrishabh@gmail.com';
const pass = 'YOUR_SMTP_KEY'; // Replace with your actual SMTP key

async function verifySMTP() {
    console.log(`Testing SMTP connection to smtp-relay.brevo.com:2525`);

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 2525,
        auth: {
            user: user,
            pass: pass,
        },
    });

    try {
        await transporter.verify();
        console.log('✅ SMTP SUCCESS on Port 2525!');
    } catch (error) {
        console.error('❌ Failed on Port 2525:', error);
    }
}

verifySMTP();
