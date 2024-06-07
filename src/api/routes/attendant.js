const { isAdmin, isAuth } = require('../../middleware/auth');
const {
  getAttendants,
  getAttendantsById,
  confirmAssistance
} = require('../controllers/attendant');

const attendantsRoutes = require('express').Router();

attendantsRoutes.get('/:id', getAttendantsById);
attendantsRoutes.get('/', getAttendants);
attendantsRoutes.post('/events/:eventId/attendance/confirm', confirmAssistance);
module.exports = attendantsRoutes;
