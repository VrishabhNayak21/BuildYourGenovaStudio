import nodemailer from 'nodemailer';

const user = 'nayakvrishabh@gmail.com';
const pass = 'YOUR_SMTP_KEY'; // Replace with your actual SMTP key

async function verifySMTP() {
    console.log(`Testing SMTP connection to smtp-relay.brevo.com:587`);
    console.log(`User: ${user}`);
    console.log(`Pass length: ${pass.length}`);

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: user,
            pass: pass,
        },
        debug: true, // show debug output
        logger: true // log information in console
    });

    try {
        console.log('Verifying transporter...');
        await transporter.verify();
        console.log('✅ SMTP Connection Verified Successfully!');

        console.log('Sending test mail...');
        const info = await transporter.sendMail({
            from: user,
            to: user,
            subject: 'Brevo SMTP Debug',
            text: 'If you see this, SMTP is working.'
        });
        console.log('✅ Message sent: %s', info.messageId);

    } catch (error) {
        console.error('❌ Error details:', error);
    }
}

verifySMTP();
