// server/utils/emailService. js
const { createTransporter } = require('../config/email');

// Send email to admin
const sendEmailToAdmin = async ({ subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('⚠️  Email not configured, skipping admin notification');
      return { success: false, error: 'Email not configured' };
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    
    const mailOptions = {
      from:  `"RoadEngo Service" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject:  subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to admin:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send admin email:', error.message);
    return { success: false, error:  error.message };
  }
};

// Send email to customer
const sendEmailToCustomer = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('⚠️  Email not configured, skipping customer email');
      return { success: false, error: 'Email not configured' };
    }

    const mailOptions = {
      from: `"RoadEngo Service" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html:  html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to customer:', to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send customer email:', error.message);
    return { success: false, error: error.message };
  }
};

// Template for contact form email (to admin)
const sendContactFormEmailToAdmin = async (formData) => {
  const { name, phone, email, formType, message, serviceType, vehicleModel, rating } = formData;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width:  600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #dc2626; text-align: center;">🔔 New ${formType} Form Submission</h2>
      <hr style="border: 1px solid #dc2626;" />
      
      <h3 style="color: #333;">Customer Details: </h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding:  8px; border-bottom:  1px solid #ddd;"><strong>Phone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:  8px; border-bottom:  1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
        </tr>
        ${serviceType ?  `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Service Type:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${serviceType}</td>
        </tr>` : ''}
        ${vehicleModel ? `
        <tr>
          <td style="padding:  8px; border-bottom:  1px solid #ddd;"><strong>Vehicle: </strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${vehicleModel}</td>
        </tr>` : ''}
        ${rating ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Rating:</strong></td>
          <td style="padding:  8px; border-bottom:  1px solid #ddd;">${'⭐'.repeat(rating)}</td>
        </tr>` : ''}
      </table>
      
      ${message ? `
      <h3 style="color: #333; margin-top: 20px;">Message:</h3>
      <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #dc2626; border-radius: 5px;">
        ${message}
      </p>` : ''}
      
      <hr style="margin-top: 30px;" />
      <p style="text-align: center; color: #666; font-size: 12px;">
        RoadEngo Admin Notification<br/>
        <a href="mailto:${email}" style="color: #dc2626;">Reply to Customer</a>
      </p>
    </div>
  `;

  const text = `New ${formType} from ${name} (${phone}, ${email}). Message: ${message || 'N/A'}`;

  return sendEmailToAdmin({
    subject: `���� New ${formType} - ${name}`,
    html: html,
    text: text
  });
};

// Template for customer confirmation email
const sendCustomerConfirmationEmail = async ({ to, name, formType }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #dc2626; text-align: center;">✅ Thank You for Contacting RoadEngo!</h2>
      <hr style="border: 1px solid #dc2626;" />
      
      <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
      
      <p style="font-size: 14px; line-height: 1.6;">
        Thank you for submitting your <strong>${formType}</strong>. We have received your request and will contact you within <strong>15 minutes</strong>. 
      </p>
      
      <div style="background-color: #fef2f2; padding: 15px; border-radius: 5px; margin:  20px 0;">
        <h3 style="color: #dc2626; margin-top: 0;">📞 Emergency Hotline</h3>
        <p style="font-size: 18px; margin:  5px 0;"><strong>+91 7900900744</strong></p>
        <p style="font-size: 12px; color: #666;">Available 24/7 for urgent assistance</p>
      </div>
      
      <hr style="margin-top: 30px;" />
      <p style="text-align: center; color: #666; font-size: 12px;">
        RoadEngo - Your Trusted Bike Service Partner<br/>
        <a href="https://roadengo-orcin.vercel.app" style="color: #dc2626;">Visit Our Website</a>
      </p>
    </div>
  `;

  const text = `Hi ${name}, Thank you for your ${formType}. We'll contact you within 15 minutes.  Emergency:  +91 7900900744`;

  return sendEmailToCustomer({
    to: to,
    subject: `✅ RoadEngo - ${formType} Received`,
    html: html,
    text: text
  });
};

module.exports = {
  sendEmailToAdmin,
  sendEmailToCustomer,
  sendContactFormEmailToAdmin,
  sendCustomerConfirmationEmail
};