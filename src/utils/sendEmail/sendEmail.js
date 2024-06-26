const sendMail = require('./nodemail');
import './sendEmail.css';

const confirmAttendanceEmail = async ({ user, event }) => {
  const htmlContent = `
    <div class="email-content">
      <h4 class="email-title">Tu asistencia ha sido confirmada con éxito al evento ${event}</h4>
      <p class="email-p>Relájate, respira, haz tus cosas... porque se va a liar parda</p>
      <p class="email-p>🤘</p>
    </div>
  `;
  await sendMail(user.email, 'Asistencia confirmada', htmlContent);
};

module.exports = confirmAttendanceEmail;
