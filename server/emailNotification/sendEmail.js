const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, 
  auth: {
    user: process.env.SMTP_HOST,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to,subject,text,html){
  if (!to) {
    console.warn("Email sending skipped: No recipient provided.");
    return;
  }
  
  const info = await transporter.sendMail({
    from: process.env.SMTP_HOST,
    to, 
    subject, 
    text, 
    html
  });

}

module.exports = {sendEmail};
