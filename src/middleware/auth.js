const User = require('../api/models/user');
const { verifyJWT } = require('../config/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json('Unauthorized');
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyJWT(parsedToken);

    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json("You're not authorized");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');

    const { id } = verifyJWT(parsedToken);

    const user = await User.findById(id);

    if (user.role === 'admin') {
      user.password = null;
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(400).json("You're not an Administrator");
  }
};

module.exports = { isAuth, isAdmin };
