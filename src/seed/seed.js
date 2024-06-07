require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Event = require('../api/models/event');
const User = require('../api/models/user');
const festivals = require('./event.seed');
const registeredUsers = require('./user.seed');

const eventDocument = festivals.map((event) => new Event(event));
const userDocument = registeredUsers.map((user) => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  return { ...user, password: hashedPassword };
});

async function seedDataBase() {
  try {
    await mongoose.connect(process.env.DB_URL);

    await Event.deleteMany();
    await Event.insertMany(eventDocument);
    console.log('Events inserted');

    await User.deleteMany();
    await User.insertMany(userDocument);
    console.log('Users inserted');
  } catch (error) {
    console.error('Error seeding database: ', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
}

seedDataBase();
