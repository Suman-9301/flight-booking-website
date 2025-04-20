exports.paymentSuccessEmail = (username, bookingDetails) => {
    return(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation | SkyBooker</title>
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
                .confirmation-badge {
                    background-color: #e6f2ff;
                    color: #0066cc;
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
                    background: #0066cc;
                    position: relative;
                    z-index: 2;
                }
                .timeline-city {
                    position: relative;
                    z-index: 2;
                    background: white;
                    padding: 0 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://skybooker.com/logo.png" alt="SkyBooker Logo">
                </div>
                
                <div class="content">
                    <div class="confirmation-badge">Booking Confirmed</div>
                    <h1>Your flight is booked, ${username}!</h1>
                    
                    <p>Thank you for choosing SkyBooker. Your booking reference is <strong>${bookingDetails.paymentId}</strong>. A receipt has been sent to your email.</p>
                    
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
                                <div class="info-value" style="color: ${bookingDetails.status === 'cancelled' ? '#e53e3e' : '#38a169'}">${bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="highlight-box">
                        <p><strong>Payment Summary</strong></p>
                        <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                            <span>Total Amount:</span>
                            <span><strong>${bookingDetails.currency} ${bookingDetails.totalAmount.toLocaleString()}</strong></span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Payment Method:</span>
                            <span>Credit Card (Ending in ${bookingDetails.paymentId.slice(-4)})</span>
                        </div>
                    </div>
                    
                    <h2>Next Steps</h2>
                    <ul>
                        <li>Check in online 24 hours before departure</li>
                        <li>Have your ID and this confirmation ready at the airport</li>
                        <li>Arrive at least 2 hours before departure for domestic flights</li>
                    </ul>
                    
                    <a href="https://skybooker.com/my-bookings" class="button">View Your Booking</a>
                    <a href="https://skybooker.com/flights" class="button" style="background-color: #fff; color: #0066cc; border: 1px solid #0066cc; margin-left: 10px;">Book Another Flight</a>
                    
                    <p>Need help with your booking? <a href="https://skybooker.com/contact" style="color: #0066cc;">Contact our support team</a>.</p>
                    
                    <p>Safe travels,<br><strong>The SkyBooker Team</strong></p>
                </div>
                
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} SkyBooker. All rights reserved.</p>
                    <p>
                        <a href="https://skybooker.com/contact" style="color: #0066cc; text-decoration: none;">Contact Us</a> | 
                        <a href="https://skybooker.com/privacy" style="color: #0066cc; text-decoration: none;">Privacy Policy</a> | 
                        <a href="https://skybooker.com/terms" style="color: #0066cc; text-decoration: none;">Terms of Service</a>
                    </p>
                    <p style="font-size:12px; color:#999;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </div>
        </body>
        </html>`
    );
}