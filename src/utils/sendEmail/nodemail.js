const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

const sendMail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error: ${error}`);
    } else {
      console.log(`Email enviado a ${info.response}`);
    }
  });
};

module.exports = sendMail;
