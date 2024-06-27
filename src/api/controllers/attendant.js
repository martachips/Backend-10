const User = require('../models/user');
const Attendant = require('../models/attendant');
const Event = require('../models/event');
const confirmAttendanceEmail = require('../../utils/sendEmail/sendEmail');

const getAttendants = async (req, res, next) => {
  try {
    const attendants = await Attendant.find().populate('confirmedEvents');
    return res.status(200).json(attendants);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Request error showing 'attendants'", error);
  }
};

const getAttendantsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendant = await Attendant.findById(id).populate('confirmedEvents');
    return res.status(200).json(attendant);
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Error finding attendant`, error);
  }
};

const confirmAssistance = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { eventId } = req.params;

    const existingAttendant = await Attendant.findOne({
      email,
      confirmedEvents: eventId
    });

    if (existingAttendant) {
      return res
        .status(400)
        .json({ message: 'This user is already confirmed in this event' });
    }

    if (req.user) {
      await confirmAuthenticatedUser(req.user, eventId, res);
    } else {
      await confirmNewAttendant(name, email, eventId, res);
    }
    console.log('Calling function to send email');
    confirmAttendanceEmail(req.user || { name, email }, eventId);
    console.log('Email confirmation sent');
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error confirming attendance', error });
  }
};

const confirmAuthenticatedUser = async (user, eventId, res) => {
  try {
    const existingUser = await User.findById(user._id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    let attendant = await Attendant.findOne({ email: user.email });

    if (!attendant) {
      attendant = new Attendant({
        name: user.name,
        email: user.email,
        confirmedEvents: [eventId]
      });
    } else {
      await Attendant.findByIdAndUpdate(attendant._id, {
        $push: { confirmedEvents: eventId }
      });
    }

    await User.findByIdAndUpdate(user._id, {
      $push: { eventsToAttend: eventId }
    });

    await updateEventWithAttendant(eventId, attendant._id);
    console.log(`Updated user: ${user._id} with event: ${eventId}`);
    console.log('User eventsToAttend:', existingUser.eventsToAttend);

    return res
      .status(200)
      .json({ message: 'Assistance confirmed successfully', attendant });
  } catch (error) {
    console.error('Error confirming authenticated user', error);
    return res
      .status(500)
      .json({ message: 'Error confirming authenticated user', error });
  }
};

const confirmNewAttendant = async (name, email, eventId, res) => {
  try {
    let attendant = await Attendant.findOne({ email });

    if (!attendant) {
      attendant = new Attendant({
        name,
        email,
        confirmedEvents: [eventId]
      });
      await Attendant.save();
    } else {
      await Attendant.findByIdAndUpdate(attendant._id, {
        $push: { confirmedEvents: eventId }
      });
    }

    await updateEventWithAttendant(eventId, attendant._id);

    return res
      .status(200)
      .json({ message: 'Assistance confirmed successfully' });
  } catch (error) {
    console.error('Error confirming new attendant', error);
    return res
      .status(500)
      .json({ message: 'Error confirming new attendant', error });
  }
};

const updateEventWithAttendant = async (eventId, attendantId) => {
  try {
    await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { confirmedAttendants: attendantId } },
      { new: true }
    );
  } catch (error) {
    console.error('Error updating event with attendant: ', error);
    throw new Error('Error updating event');
  }
};

module.exports = {
  getAttendants,
  getAttendantsById,
  confirmAssistance
};
