const attendantsRoutes = require('./attendant');
const eventsRoutes = require('./event');
const userRoutes = require('./user');

const mainRoutes = require('express').Router();

mainRoutes.use('/user', userRoutes);
mainRoutes.use('/event', eventsRoutes);
mainRoutes.use('/attendants', attendantsRoutes);

module.exports = mainRoutes;
