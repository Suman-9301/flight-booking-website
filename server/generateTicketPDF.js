
const { PDFDocument, rgb } = require('pdf-lib');
const fetch = require('node-fetch');

async function generateTicketPDF(booking) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const { flight, totalAmount, currency, paymentId, status, passengerInfo, bookingId, bookingDate } = booking;

  // Add background color
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 600,
    height: 400,
    color: rgb(0.95, 0.95, 0.98),
    opacity: 0.5,
  });

  // Add airline logo
  try {
    const logoResponse = await fetch(flight.airline_logo);
    const logoImageBytes = await logoResponse.arrayBuffer();
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    page.drawImage(logoImage, {
      x: 450,
      y: 250,
      width: 80,
      height: 80,
    });
  } catch (error) {
    console.error('Error loading airline logo:', error);
  }

  // Header section
  page.drawRectangle({
    x: 40,
    y: 350,
    width: 520,
    height: 30,
    color: rgb(0.2, 0.4, 0.6),
    borderColor: rgb(0.1, 0.3, 0.5),
    borderWidth: 1,
  });

  page.drawText('E-TICKET RECEIPT', {
    x: 200,
    y: 360,
    size: 18,
    color: rgb(1, 1, 1),
    bold: true,
  });

  // Flight information section
  page.drawText(`${flight.airline} - ${flight.flight_number}`, {
    x: 50,
    y: 320,
    size: 16,
    color: rgb(0, 0, 0),
    bold: true,
  });

  page.drawText(`Departure: ${new Date(flight.departure_time).toLocaleString()}`, {
    x: 50,
    y: 290,
    size: 12,
  });

  page.drawText(`Arrival: ${new Date(flight.arrival_time).toLocaleString()}`, {
    x: 50,
    y: 270,
    size: 12,
  });

  page.drawText(`From: ${flight.from}`, {
    x: 50,
    y: 240,
    size: 12,
  });

  page.drawText(`To: ${flight.to}`, {
    x: 50,
    y: 220,
    size: 12,
  });

  // Passenger information section
  page.drawText('Passenger Information', {
    x: 50,
    y: 190,
    size: 14,
    color: rgb(0.2, 0.4, 0.6),
    bold: true,
  });

  page.drawText(`Name: ${passengerInfo.passengerName}`, {
    x: 50,
    y: 170,
    size: 12,
  });

  page.drawText(`Seat Preference: ${passengerInfo.seatPreference}`, {
    x: 50,
    y: 150,
    size: 12,
  });

  page.drawText(`Gender: ${passengerInfo.gender} | Nationality: ${passengerInfo.nationality}`, {
    x: 50,
    y: 130,
    size: 12,
  });

  // Booking information section
  page.drawText('Booking Details', {
    x: 350,
    y: 190,
    size: 14,
    color: rgb(0.2, 0.4, 0.6),
    bold: true,
  });

  page.drawText(`Booking ID: ${bookingId}`, {
    x: 350,
    y: 170,
    size: 12,
  });

  page.drawText(`Booking Date: ${new Date(bookingDate).toLocaleString()}`, {
    x: 350,
    y: 150,
    size: 12,
  });

  page.drawText(`Payment ID: ${paymentId}`, {
    x: 350,
    y: 130,
    size: 12,
  });

  page.drawText(`Status: ${status.toUpperCase()}`, {
    x: 350,
    y: 110,
    size: 12,
    color: status === 'confirmed' ? rgb(0, 0.5, 0) : rgb(0.8, 0, 0),
  });

  // Footer with total amount
  page.drawRectangle({
    x: 40,
    y: 70,
    width: 520,
    height: 30,
    color: rgb(0.2, 0.4, 0.6),
    borderColor: rgb(0.1, 0.3, 0.5),
    borderWidth: 1,
  });

  page.drawText(`Total Amount: ${currency} ${totalAmount.toLocaleString()}`, {
    x: 200,
    y: 80,
    size: 14,
    color: rgb(1, 1, 1),
    bold: true,
  });

  // Terms and conditions
  page.drawText('Thank you for choosing SkyBooker!', {
    x: 200,
    y: 40,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

module.exports = { generateTicketPDF };