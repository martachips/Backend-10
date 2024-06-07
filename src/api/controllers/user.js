const { generateSign } = require('../../config/jwt');
const { deleteFile } = require('../../utils/deleteIMG');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate('eventsToAttend')
      .populate('eventsCreated');
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error showing all users', error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate('eventsToAttend')
      .populate('eventsCreated');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(`Error finding user with ID: ${id}`, error);
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    });

    if (req.file) {
      newUser.imgProfile = req.file.path;
    }

    const duplicatedUser = await User.findOne({
      name: req.body.name,
      email: req.body.email
    });

    if (duplicatedUser) {
      return res.status(400).json('This user already exists');
    }

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Request Error');
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json(`User with email ${email} could not be found`);
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json('User or password incorrect');
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json('Request error', error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(400).json('User not found');
    }

    const updatedFields = {};

    if (req.body.name) {
      updatedFields.name = req.body.name;
    }
    if (req.body.email) {
      updatedFields.email = req.body.email;
    }
    if (req.body.password) {
      const newPassword = bcrypt.hashSync(req.body.password, 10);
      updatedFields.password = newPassword;
    }
    if (req.file) {
      if (
        oldUser.imgProfile !==
        'https://res.cloudinary.com/dg1hbudfu/image/upload/v1715254691/Users/user-square-svgrepo-com_vogrix.svg'
      ) {
        deleteFile(oldUser.imgProfile);
      }
      updatedFields.imgProfile = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true
    });

    if (!updatedUser) {
      return res.status(400).json('User not found to update');
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Request error. Error updating User', error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (
      deletedUser.imgProfile !==
      'https://res.cloudinary.com/dg1hbudfu/image/upload/v1713862338/Users/user-square-svgrepo-com_yn444m.svg'
    ) {
      deleteFile(deletedUser.imgProfile);
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json('Request error. User could not be deleted', error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  register,
  logIn,
  updateUser,
  deleteUser
};
