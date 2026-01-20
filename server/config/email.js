// server/config/email.js
const nodemailer = require('nodemailer');

// Create email transporter (CORRECT:  createTransport, not createTransporter!)
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    console.log('⚠️ Email credentials not found in . env file');
    return null;
  }

  try {
    // CORRECT FUNCTION NAME:  createTransport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    console.log('✅ Email transporter created successfully');
    return transporter;
  } catch (error) {
    console.error('❌ Failed to create transporter:', error.message);
    return null;
  }
};

// Test email connection
const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('⚠️ Email not configured - emails will not be sent');
      return false;
    }

    await transporter.verify();
    console.log('✅ Email server is ready to send messages');
    console.log(`📧 Sending from: ${process.env.EMAIL_USER}`);
    return true;
  } catch (error) {
    console.error('❌ Email server connection failed:', error.message);
    console.log('');
    console.log('💡 Setup Gmail App Password: ');
    console.log('   1. Go to: https://myaccount.google.com/apppasswords');
    console.log('   2. Enable 2-Step Verification');
    console.log('   3. Generate App Password');
    console.log('   4. Add to .env file');
    console.log('');
    return false;
  }
};

module.exports = {
  createTransporter,
  testEmailConnection
};