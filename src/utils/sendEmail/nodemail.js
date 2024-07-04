const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
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

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw error;
  }
};

module.exports = sendMail;
