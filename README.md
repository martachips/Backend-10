USERS
· Podrán entrar y registrarse / iniciar sesión
· Podrán crear eventos así como modificarlos
· Podrán modificar su propio perfil y ver a qué eventos asisten y cuáles han creado
· Podrán ver el número de asistentes a un evento
· Y podrán confirmar su asistencia a un evento

EVENTS
· Contendrán tanto los usuarios registrados como asistentes sin registro confirmados

ATTENDANTS
· Sólo podrán ver los eventos y el número total de asistentes y confirmar su asistencia
· Pero no podrán crear ni modificar eventos

ORIGEN: http://localhost:3000/api/v1

ENDPOINTS

Attendants:

- GET - getAttendantsById - /attendants/:id
- GET - getattendants - /attendants/
- POST - confirmAssistance - /event/:eventId/attendance/confirm

Events:

- GET - getEventById - /event/:id
- GET - getEventByCategory - /event/category/:category
- GET - getEvents - /event/
- POST - createEvent - /event/createEvent - isAuth - uploadImg("events")
- PUT - validateEvent - /event/validate/:id - isAdmin
- PUT - updateEvent - /event/update/:id - isAuth - uploadImg("events")
- DELETE - deleteEvent - /event/:id - isAdmin

Users:

- GET - getUsers - /user/ - isAuth
- GET - getUserById - /user/:id - isAuth
- POST - register - /user/register
- POST - login - /user/login
- PUT - updateUser - /user/:id - isAuth - uploadImg("users")
- POST - confirmAssistance - /user/events/:eventId/attendance/confirm - isAuth
- DELETE - deleteUser - /user/delete/:id - isAdmin
# Backend-10
