const sendMail = require('./nodemail.js');

const confirmAttendanceEmail = async (user, eventId) => {
  try {
    const { name, email } = user;
    const htmlContent = `
     <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          
        </style>
      </head>
      <body>
        <div class="email-content">
          <h4 class="email-title">Tu asistencia ha sido confirmada con éxito al evento ${eventId}</h4>
          <p class="email-p>Relájate, respira, haz tus cosas... porque se va a liar parda 😎</p>
          <p class="email-p>🤘</p>
        </div>
      </body>
    </html>
  `;
    await sendMail(email, 'Asistencia confirmada', htmlContent);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error in confirmAttendanceEmail`, error);
    throw error;
  }
};
module.exports = confirmAttendanceEmail;
