import dotenv from 'dotenv';
import { sendWelcomeEmail, sendPaymentConfirmationEmail } from './utils/emailService.js';

// Load environment variables
dotenv.config();

// Test email functionality
const testEmails = async () => {
    console.log('Testing email functionality...');
    
    const testEmail = 'test@example.com';
    const testName = 'Test User';
    const testOrder = {
        _id: 'test-order-123',
        amount: 299.99,
        items: [
            { name: 'Gaming Mouse', price: 99.99, quantity: 1 },
            { name: 'Gaming Keyboard', price: 200.00, quantity: 1 }
        ]
    };

    try {
        // Test welcome email
        console.log('Testing welcome email...');
        const welcomeResult = await sendWelcomeEmail(testEmail, testName);
        console.log('Welcome email result:', welcomeResult ? 'Success' : 'Failed');

        // Test payment confirmation email
        console.log('Testing payment confirmation email...');
        const paymentResult = await sendPaymentConfirmationEmail(testEmail, testName, testOrder);
        console.log('Payment confirmation email result:', paymentResult ? 'Success' : 'Failed');

    } catch (error) {
        console.error('Error testing emails:', error);
    }
};

// Run the test
testEmails(); 