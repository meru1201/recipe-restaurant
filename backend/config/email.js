const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection
transporter.verify((error) => {
    if (error) {
        console.log('❌ Email server connection error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Send welcome email
const sendWelcomeEmail = async (user) => {
    const mailOptions = {
        from: `"Asian Food Recipes" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: '🎉 Welcome to Asian Food Recipes!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <div style="text-align: center; background-color: #ff6b6b; padding: 20px; border-radius: 10px 10px 0 0; color: white;">
                    <h1 style="margin: 0;">🍜 Asian Food Recipes</h1>
                </div>
                <div style="padding: 30px;">
                    <h2>Welcome, ${user.name}! 👋</h2>
                    <p>Thank you for joining our community of Asian food enthusiasts!</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>🌟 What you can do:</h3>
                        <ul>
                            <li>📝 Save and organize your favorite Asian recipes</li>
                            <li>👨‍🍳 Share your culinary creations</li>
                            <li>🔍 Discover authentic Asian dishes</li>
                            <li>📱 Access recipes from anywhere</li>
                        </ul>
                    </div>
                    
                    <p>Get started by exploring our collection of authentic Asian recipes!</p>
                    
                    <a href="${process.env.FRONTEND_URL}/dashboard.html" 
                       style="display: inline-block; background-color: #ff6b6b; color: white; 
                              padding: 12px 30px; text-decoration: none; border-radius: 5px; 
                              font-weight: bold; margin: 20px 0;">
                        Go to Dashboard
                    </a>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666;">
                        <p>Happy cooking! 🍳</p>
                        <p><strong>The Asian Food Recipes Team</strong></p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${user.email}`);
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
    }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;
    
    const mailOptions = {
        from: `"Asian Food Recipes" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: '🔐 Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>You requested to reset your password. Click the button below to proceed:</p>
                
                <a href="${resetUrl}" 
                   style="display: inline-block; background-color: #4CAF50; color: white; 
                          padding: 12px 24px; text-decoration: none; border-radius: 5px; 
                          font-weight: bold; margin: 20px 0;">
                    Reset Password
                </a>
                
                <p style="color: #666;">This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset email sent to ${email}`);
    } catch (error) {
        console.error('❌ Error sending password reset email:', error);
    }
};

module.exports = {
    transporter,
    sendWelcomeEmail,
    sendPasswordResetEmail
};