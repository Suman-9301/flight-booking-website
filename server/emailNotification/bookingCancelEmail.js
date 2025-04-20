exports.bookingCancelEmail = (username, bookingDetails) => {
    return(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Cancellation | SkyBooker</title>
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
                h2 {
                    color: #333;
                    font-size: 20px;
                    margin: 25px 0 15px 0;
                }
                p {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .highlight-box {
                    background-color: #f8f9fa;
                    border-left: 4px solid #e53e3e;
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
                .cancellation-badge {
                    background-color: #fff5f5;
                    color: #e53e3e;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-weight: 600;
                    display: inline-block;
                    margin-bottom: 15px;
                    font-size: 14px;
                }
                .flight-details {
                    border: 1px solid #e1e5eb;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    opacity: 0.8;
                }
                .flight-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .airline-logo {
                    width: 40px;
                    height: 40px;
                    margin-right: 15px;
                }
                .flight-info {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                .info-item {
                    margin-bottom: 10px;
                }
                .info-label {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 5px;
                }
                .info-value {
                    font-weight: 600;
                }
                .timeline {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 20px 0;
                    position: relative;
                }
                .timeline:before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: #e1e5eb;
                    z-index: 1;
                }
                .timeline-point {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #e53e3e;
                    position: relative;
                    z-index: 2;
                }
                .timeline-city {
                    position: relative;
                    z-index: 2;
                    background: white;
                    padding: 0 10px;
                }
                .refund-details {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px dashed #e1e5eb;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://skybooker.com/logo.png" alt="SkyBooker Logo">
                </div>
                
                <div class="content">
                    <div class="cancellation-badge">Booking Cancelled</div>
                    <h1>Your booking has been cancelled, ${username}</h1>
                    
                    <p>We've processed your cancellation request for booking reference <strong>${bookingDetails.paymentId}</strong>.</p>
                    
                    <div class="flight-details">
                        <div class="flight-header">
                            <img src="${bookingDetails.flight.airline_logo}" alt="${bookingDetails.flight.airline}" class="airline-logo">
                            <h2>${bookingDetails.flight.airline} • Flight ${bookingDetails.flight.flight_number}</h2>
                        </div>
                        
                        <div class="timeline">
                            <div class="timeline-city">
                                <div class="info-value">${bookingDetails.flight.from}</div>
                                <div class="info-label">${new Date(bookingDetails.flight.departure_time).toLocaleDateString()}</div>
                            </div>
                            <div class="timeline-point"></div>
                            <div class="timeline-city">
                                <div class="info-value">${bookingDetails.flight.to}</div>
                                <div class="info-label">${new Date(bookingDetails.flight.arrival_time).toLocaleDateString()}</div>
                            </div>
                        </div>
                        
                        <div class="flight-info">
                            <div class="info-item">
                                <div class="info-label">Departure</div>
                                <div class="info-value">${new Date(bookingDetails.flight.departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Arrival</div>
                                <div class="info-value">${new Date(bookingDetails.flight.arrival_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Booking Date</div>
                                <div class="info-value">${new Date(bookingDetails.bookingDate).toLocaleDateString()}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Status</div>
                                <div class="info-value" style="color: #e53e3e">Cancelled</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="highlight-box">
                        <p><strong>Cancellation Details</strong></p>
                        <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                            <span>Original Amount:</span>
                            <span><strong>${bookingDetails.currency} ${bookingDetails.totalAmount.toLocaleString()}</strong></span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Refund Amount:</span>
                            <span><strong>${bookingDetails.currency} ${(bookingDetails.totalAmount * 0.8).toLocaleString()}*</strong></span>
                        </div>
                        <div class="refund-details">
                            <p style="font-size: 14px; color: #666; margin-bottom: 0;">*80% refund as per our cancellation policy. The amount will be credited to your original payment method within 7-10 business days.</p>
                        </div>
                    </div>
                    
                    <h2>What's Next?</h2>
                    <ul>
                        <li>Your refund will be processed automatically</li>
                        <li>You'll receive a confirmation email when refund is initiated</li>
                        <li>Contact your bank if you don't see the refund in 10 days</li>
                    </ul>
                    
                    <a href="https://skybooker.com/my-bookings" class="button">View Cancelled Bookings</a>
                    <a href="https://skybooker.com/flights" class="button" style="background-color: #fff; color: #0066cc; border: 1px solid #0066cc; margin-left: 10px;">Book New Flight</a>
                    
                    <p>We're sorry to see you go. If this was a mistake or you need any assistance, please <a href="https://skybooker.com/contact" style="color: #0066cc;">contact our support team</a> immediately.</p>
                    
                    <p>We hope to serve you again soon,<br><strong>The SkyBooker Team</strong></p>
                </div>
                
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} SkyBooker. All rights reserved.</p>
                    <p>
                        <a href="https://skybooker.com/contact" style="color: #0066cc; text-decoration: none;">Contact Us</a> | 
                        <a href="https://skybooker.com/privacy" style="color: #0066cc; text-decoration: none;">Privacy Policy</a> | 
                        <a href="https://skybooker.com/terms" style="color: #0066cc; text-decoration: none;">Terms of Service</a>
                    </p>
                    <p style="font-size:12px; color:#999;">
                        This cancellation is effective immediately. Please keep this email for your records.
                    </p>
                </div>
            </div>
        </body>
        </html>`
    );
}