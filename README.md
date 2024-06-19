USERS
· Podrán entrar y registrarse / iniciar sesión
· Podrán crear eventos
· Podrán modificar su propio perfil y ver a qué eventos asisten y cuáles han creado
· Y podrán confirmar su asistencia a un evento
· NO podrán ver aquellos eventos que el ADMIN no haya validado.

ADMINISTRADOR
· A diferencia de los Usuarios, Validará y podrá modificar los eventos. Hasta que no valide el evento, éste no aparecerá para los usuarios.

EVENTS
· Al acceder a "Mostrar más" en cada evento, aparecen los detalles así como la opción de Asistir a estos.

ATTENDANTS
· Sólo podrán ver los eventos confirmar su asistencia
· No podrán crear ni modificar eventos
· Recibirán un correo cuando se confirme asistencia a un evento (mediante Nodemailer)

ORIGEN: http://localhost:3000/api/v1

ENDPOINTS

Attendants:

- GET - getAttendantsById - /attendants/:id
- GET - getattendants - /attendants/
- POST - confirmAssistance - /events/:eventId/attendance/confirm

Events:

- GET - getEventById - /event/:id
- GET - getEventByCategory - /event/category/:category
- GET - getEvents - /event/
- POST - createEvent - /event/createEvent - isAuth - uploadImg("events")
- PUT - validateEvent - /event/validate/:id - isAdmin
- PUT - updateEvent - /event/update/:id - isAuth - uploadImg("events")
- DELETE - deleteEvent - /event/:eventId/delete - isAdmin

Users:

- GET - getUsers - /user/ - isAuth
- GET - getUserById - /user/:id - isAuth
- POST - register - /user/register
- POST - login - /user/login
- PUT - updateUser - /user/update/:id - isAuth - uploadImg("users")
- POST - confirmAssistance - /user/events/:eventId/attendance/confirm - isAuth
- DELETE - deleteUser - /user/delete/:id - isAdmin

# Backend-10

…—
…—
