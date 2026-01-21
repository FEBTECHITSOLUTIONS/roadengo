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
  const { name, phone, email, formType, message, serviceType, vehicleModel, rating, preferredDateTime, emergencyType, location } = formData;
  
  const html = `
    <div style="font-family:  Arial, sans-serif; max-width:  600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #dc2626; text-align: center;">🔔 New ${formType} Form Submission</h2>
      <hr style="border:  1px solid #dc2626;" />
      
      <h3 style="color: #333;">Customer Details: </h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
        </tr>
        ${serviceType ?  `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>🔧 Service Type:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${serviceType}</td>
        </tr>` : ''}
        ${vehicleModel ? `
        <tr>
          <td style="padding:  8px; border-bottom:  1px solid #ddd;"><strong>🏍️ Bike Brand:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${vehicleModel}</td>
        </tr>` : ''}
        ${preferredDateTime ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>📅 Preferred Date & Time:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${preferredDateTime}</td>
        </tr>` : ''}
        ${location ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>📍 Location:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${location}</td>
        </tr>` : ''}
        ${emergencyType ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>🚨 Emergency Type:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${emergencyType}</td>
        </tr>` : ''}
        ${rating ? `
        <tr>
          <td style="padding:  8px; border-bottom:  1px solid #ddd;"><strong>⭐ Rating:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${'⭐'.repeat(rating)}</td>
        </tr>` : ''}
      </table>
      
      ${message ? `
      <h3 style="color: #333; margin-top: 20px;">💬 Message:</h3>
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
    subject: `🔔 New ${formType} - ${name}`,
    html: html,
    text: text
  });
};
// Template for customer confirmation email
const sendCustomerConfirmationEmail = async ({ to, name, formType, message, serviceType, vehicleModel, location, rating, preferredDateTime, emergencyType }) => {
  
  // Determine actual form type
  const actualFormType = formType. toLowerCase().includes('service') ? 'service' 
    : formType.toLowerCase().includes('emergency') || formType.toLowerCase().includes('roadside') ? 'emergency'
    : formType.toLowerCase().includes('feedback') ? 'feedback'
    : 'general';

  // Professional Text Logo (Always works, no image needed)
  const logoHtml = `
    <div style="text-align: center; margin-bottom: 35px;">
      <div style="display:  inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <span style="font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">
          <span style="color: #111827;">ROAD</span><span style="color: #dc2626;">ENGO</span>
        </span>
      </div>
    </div>
  `;

  // 2. YEH NYA FOOTER CODE ADD KARNA HAI (ADDRESS KE SAATH) ->
  const footerHtml = `
  <div style="background-color:#000000; padding:24px 16px; margin-top:40px; border-radius:8px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto;">
      
      <!-- Logo Row -->
      <tr>
        <td align="center" style="padding-bottom:16px;">
          <span style="font-size:26px; font-weight:800; letter-spacing:-0.5px;">
            <span style="color:#ffffff;">ROAD</span><span style="color:#dc2626;">ENGO</span>
          </span>
        </td>
      </tr>

      <!-- Divider -->
      <tr>
        <td style="padding:10px 0;">
          <div style="height:1px; width:100%; background-color:#333333;"></div>
        </td>
      </tr>

      <!-- Address -->
      <tr>
        <td style="color:#cccccc; font-size:14px; line-height:1.6; padding-bottom:20px;">
          Lakshar Road Near,<br/>
          Sati Kund, Haridwar,<br/>
          Uttarakhand 249408 - India
        </td>
      </tr>

      <!-- Bottom Row -->
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              

              <!-- Right -->
              <td align="center">
                <a href="https://roadengo.com" style="color:#c21111; text-decoration:none; font-size:14px;">
                  www.roadengo.com
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </div>
`;



  let html = '';

  // ========== GENERAL INQUIRY ==========
  if (actualFormType === 'general') {
    html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding:  40px 20px;">
        
        ${logoHtml}

        <div style="border-bottom: 2px solid #e5e7eb; padding-bottom:  20px; margin-bottom: 30px;">
          <h2 style="margin: 0; font-size: 24px; color: #111827;">📬 Inquiry Received</h2>
          <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">We'll respond within 15 minutes</p>
        </div>

        <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
          Hi <strong>${name}</strong>,
        </p>
        
        <p style="font-size: 15px; color: #4b5563; line-height:  1.7; margin: 0 0 25px 0;">
          Thank you for contacting RoadEngo. Your inquiry has been received and our team will get back to you shortly.
        </p>

        ${message ? `
        <div style="background-color: #f9fafb; border-left: 3px solid #9ca3af; padding: 16px 20px; margin:  25px 0;">
          <p style="margin: 0; color: #6b7280; font-size:  13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</p>
          <p style="margin: 8px 0 0 0; color: #374151; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>` : ''}
        
        <div style="margin:  30px 0; padding:  20px; background-color:  #f9fafb; border-radius: 6px;">
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size:  13px; font-weight: 600;">CONTACT US</p>
          <p style="margin: 0; font-size: 20px; color: #111827; font-weight: 600;">+91 7900900744</p>
          <p style="margin: 4px 0 0 0; color: #9ca3af; font-size:  13px;">Available 24/7</p>
        </div>

        ${footerHtml}
      </div>
    `;
  }

  // ========== BOOK SERVICE ==========
  else if (actualFormType === 'service') {
    html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        ${logoHtml}

        <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="margin: 0; font-size: 24px; color: #1e40af;">🔧 Service Booking Confirmed</h2>
          <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">We'll call you within 15 minutes</p>
        </div>

        <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
          Hi <strong style="color: #3b82f6;">${name}</strong>,
        </p>
        
        <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin: 0 0 25px 0;">
          Your bike service request has been confirmed. Our mechanic will contact you shortly to finalize the appointment.
        </p>

        <div style="background-color: #eff6ff; border-left: 3px solid #3b82f6; padding: 20px; margin: 25px 0;">
          <p style="margin: 0 0 15px 0; color: #1e40af; font-size:  13px; font-weight:  600; text-transform: uppercase; letter-spacing: 0.5px;">Service Details</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${vehicleModel ? `
            <tr>
              <td style="padding:  8px 0; color: #6b7280; font-size: 14px;">Bike Brand</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600; text-align: right;">${vehicleModel}</td>
            </tr>` : ''}
            ${serviceType ? `
            <tr>
              <td style="padding:  8px 0; color:  #6b7280; font-size: 14px;">Service Type</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600; text-align: right;">${serviceType}</td>
            </tr>` : ''}
            ${preferredDateTime ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Preferred Date</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600; text-align: right;">${preferredDateTime}</td>
            </tr>` : ''}
            ${location ?  `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size:  14px;">Location</td>
              <td style="padding:  8px 0; color:  #111827; font-size:  14px; font-weight:  600; text-align: right;">${location}</td>
            </tr>` : ''}
          </table>
        </div>

        ${message ? `
        <div style="background-color: #f9fafb; border-left:  3px solid #9ca3af; padding: 16px 20px; margin: 25px 0;">
          <p style="margin: 0; color:  #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</p>
          <p style="margin: 8px 0 0 0; color: #374151; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>` : ''}
        
        <div style="margin: 30px 0; padding: 20px; background-color: #fef2f2; border-radius: 6px; border:  1px solid #fecaca;">
          <p style="margin: 0 0 8px 0; color: #991b1b; font-size:  13px; font-weight:  600;">EMERGENCY HOTLINE</p>
          <p style="margin: 0; font-size: 20px; color: #dc2626; font-weight: 600;">+91 7900900744</p>
          <p style="margin: 4px 0 0 0; color:  #ef4444; font-size: 13px;">24/7 Support</p>
        </div>

        ${footerHtml}
      </div>
    `;
  }

  // ========== EMERGENCY ==========
  else if (actualFormType === 'emergency') {
    html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        ${logoHtml}

        <div style="border-bottom: 3px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="margin: 0; font-size: 24px; color: #dc2626;">🚨 Emergency Request Received</h2>
          <p style="margin: 8px 0 0 0; color: #ef4444; font-size: 14px; font-weight: 600;">Help is on the way • ETA 15-30 min</p>
        </div>

        <p style="font-size: 16px; color:  #374151; line-height:  1.6; margin: 0 0 20px 0;">
          Hi <strong style="color: #dc2626;">${name}</strong>,
        </p>
        
        <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin: 0 0 25px 0;">
          Your emergency request has been received. Our nearest mechanic is being dispatched to your location immediately.
        </p>

        <div style="background-color:  #fef2f2; border-left: 3px solid #dc2626; padding: 20px; margin: 25px 0;">
          <p style="margin: 0 0 15px 0; color: #991b1b; font-size:  13px; font-weight:  600; text-transform: uppercase; letter-spacing: 0.5px;">Emergency Details</p>
          <table style="width:  100%; border-collapse: collapse;">
            ${emergencyType ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size:  14px;">Emergency Type</td>
              <td style="padding: 8px 0; color: #dc2626; font-size: 14px; font-weight: 600; text-align: right;">${emergencyType}</td>
            </tr>` : ''}
            ${location ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Location</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600; text-align: right;">${location}</td>
            </tr>` : ''}
            ${vehicleModel ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Vehicle</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600; text-align: right;">${vehicleModel}</td>
            </tr>` : ''}
          </table>
        </div>

        ${message ? `
        <div style="background-color:  #fef2f2; border-left: 3px solid #dc2626; padding: 16px 20px; margin: 25px 0;">
          <p style="margin: 0; color: #991b1b; font-size:  13px; font-weight:  600; text-transform: uppercase; letter-spacing: 0.5px;">Issue Description</p>
          <p style="margin: 8px 0 0 0; color: #374151; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>` : ''}
        
        <div style="margin: 30px 0; padding: 24px; background-color: #dc2626; border-radius: 6px; text-align: center;">
          <p style="margin: 0 0 8px 0; color: #fecaca; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Call Now</p>
          <p style="margin: 0; font-size: 28px; color: #ffffff; font-weight: 700; letter-spacing: 1px;">+91 7900900744</p>
          <p style="margin: 8px 0 0 0; color: #fecaca; font-size: 13px;">24/7 Emergency Line</p>
        </div>

        ${footerHtml}
      </div>
    `;
  }

  // ========== FEEDBACK ==========
  else if (actualFormType === 'feedback') {
    const stars = rating ?  '⭐'. repeat(rating) : '';
    
    html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        ${logoHtml}

        <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="margin: 0; font-size: 24px; color: #d97706;">⭐ Thank You for Your Feedback</h2>
          <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">Your opinion matters to us</p>
        </div>

        <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
          Hi <strong style="color: #f59e0b;">${name}</strong>,
        </p>
        
        <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin: 0 0 25px 0;">
          Thank you for taking the time to share your experience with RoadEngo. Your feedback helps us serve you better.
        </p>

        ${rating ? `
        <div style="background-color: #fffbeb; border-left: 3px solid #f59e0b; padding: 20px; margin: 25px 0; text-align: center;">
          <p style="margin: 0 0 12px 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Rating</p>
          <p style="margin: 0; font-size: 32px; line-height: 1;">${stars}</p>
          <p style="margin: 8px 0 0 0; color: #92400e; font-size: 16px; font-weight: 600;">${rating}/5</p>
        </div>` : ''}

        ${message ? `
        <div style="background-color: #fffbeb; border-left:  3px solid #f59e0b; padding: 16px 20px; margin: 25px 0;">
          <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Feedback</p>
          <p style="margin: 8px 0 0 0; color:  #374151; font-size:  14px; line-height:  1.6; font-style: italic;">"${message}"</p>
        </div>` : ''}
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size:  13px; font-weight:  600;">CONTACT US</p>
          <p style="margin: 0; font-size: 20px; color: #111827; font-weight: 600;">+91 7900900744</p>
          <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 13px;">Available 24/7</p>
        </div>

        ${footerHtml}
      </div>
    `;
  }

  const text = `Hi ${name}, Thank you for your ${formType}.  We'll contact you within 15 minutes.  Emergency: +91 7900900744`;

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