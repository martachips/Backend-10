const { isAdmin, isAuth } = require('../../middleware/auth');
const { uploadImg } = require('../../middleware/file');
const { confirmAssistance } = require('../controllers/attendant');

const {
  register,
  getUsers,
  getUserById,
  logIn,
  updateUser,
  deleteUser
} = require('../controllers/user');

const userRoutes = require('express').Router();

userRoutes.get('/', isAuth, getUsers);
userRoutes.get('/:id', isAuth, getUserById);
userRoutes.post('/register', register);
userRoutes.post('/login', logIn);
userRoutes.put(
  '/update/:id',
  isAuth,
  uploadImg('users').single('imgProfile'),
  updateUser
);
userRoutes.post(
  '/events/:eventId/attendance/confirm',
  isAuth,
  confirmAssistance
);
userRoutes.delete('/delete/:id', isAdmin, deleteUser);

module.exports = userRoutes;
