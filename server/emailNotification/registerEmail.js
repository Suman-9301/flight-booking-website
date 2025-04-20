
exports.registerEmail = (username, email) => {
    return(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to SkyBooker</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f5f7fa;
                    margin: 0;
                    padding: 0;
                    color: #333;
                    line-height: 1.6;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .header {
                    background-color: #0066cc;
                    padding: 30px 20px;
                    text-align: center;
                }
                .header img {
                    max-width: 180px;
                }
                .content {
                    padding: 30px;
                }
                h1 {
                    color: #0066cc;
                    margin-top: 0;
                    font-size: 24px;
                }
                p {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .highlight-box {
                    background-color: #f8f9fa;
                    border-left: 4px solid #0066cc;
                    padding: 15px;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #f5f7fa;
                    font-size: 14px;
                    color: #666;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #0066cc;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: 600;
                    margin: 15px 0;
                }
                .welcome-badge {
                    background-color: #e6f2ff;
                    color: #0066cc;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-weight: 600;
                    display: inline-block;
                    margin-bottom: 15px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                
                <div class="content">
                    <div class="welcome-badge">Welcome Aboard</div>
                    <h1>Thank you for Registering, ${username}!</h1>
                    
                    <p>We're thrilled to have you join SkyBooker, your gateway to seamless flight bookings and unforgettable journeys.</p>
                    
                    <div class="highlight-box">
                        <p><strong>Your account is ready!</strong><br>
                        Email: ${email}<br>
                        Status: Verified</p>
                    </div>
                    
                    <p>To get started, explore our wide selection of flights and special member benefits:</p>
                    
                    <a href="https://skybooker.com/flights" class="button">Discover Flight Deals</a>
                    
                    <p><strong>Member Benefits:</strong></p>
                    <ul>
                        <li>Exclusive member-only discounts</li>
                        <li>Faster bookings with saved preferences</li>
                        <li>Priority customer support</li>
                        <li>Earn SkyMiles with every booking</li>
                    </ul>
                    
                    <p>If you have any questions about your account or our services, our <a href="https://skybooker.com/support" style="color: #0066cc;">support team</a> is always ready to assist you.</p>
                    
                    <p>Happy travels,<br><strong>The SkyBooker Team</strong></p>
                </div>
                
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} SkyBooker. All rights reserved.</p>
                    <p>
                        <a href="https://skybooker.com/contact" style="color: #0066cc; text-decoration: none;">Contact Us</a> | 
                        <a href="https://skybooker.com/privacy" style="color: #0066cc; text-decoration: none;">Privacy Policy</a> | 
                        <a href="https://skybooker.com/terms" style="color: #0066cc; text-decoration: none;">Terms of Service</a>
                    </p>
                    <p style="font-size:12px; color:#999;">
                        You're receiving this email because you created an account with SkyBooker.
                    </p>
                </div>
            </div>
        </body>
        </html>`
    );
}