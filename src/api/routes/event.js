const { isAdmin, isAuth } = require('../../middleware/auth');
const { uploadImg } = require('../../middleware/file');
const { confirmAssistance } = require('../controllers/attendant');
const {
  getEvents,
  getEventById,
  createEvent,
  validateEvent,
  updateEvent,
  deleteEvent,
  getEventByCategory
} = require('../controllers/event');

const eventsRoutes = require('express').Router();

eventsRoutes.get('/:id', getEventById);
eventsRoutes.get('/category/:category', getEventByCategory);
eventsRoutes.get('/', getEvents);
eventsRoutes.post(
  '/createEvent',
  isAuth,
  uploadImg('events').single('image'),
  createEvent
);
eventsRoutes.put('/validate/:id', isAdmin, validateEvent);
eventsRoutes.put(
  '/update/:id',
  isAdmin,
  uploadImg('events').single('img'),
  updateEvent
);
eventsRoutes.delete('/:eventId/delete', isAdmin, deleteEvent);
// eventsRoutes.post('/:eventID/attendance/confirm', confirmAssistance);
module.exports = eventsRoutes;
