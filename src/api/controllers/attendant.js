const User = require('../models/user');
const Attendant = require('../models/attendant');
const Event = require('../models/event');

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

    try {
      if (req.user) {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        let attendant = await Attendant.findOne({ email: req.user.email });

        if (!attendant) {
          attendant = new Attendant({
            name: req.user.name,
            email: req.user.email,
            confirmedEvents: [eventId]
          });
        } else {
          attendant.confirmedEvents.addToSet(eventId);
        }

        await attendant.save();

        user.eventsToAttend.addToSet(eventId);
        await user.save();

        await Event.findByIdAndUpdate(
          eventId,
          {
            $addToSet: { confirmedAttendants: attendant._id }
          },
          { new: true }
        );

        console.log(`Updated user: ${user._id} with event: ${eventId}`);
        console.log('User eventsToAttend:', user.eventsToAttend);

        return res
          .status(200)
          .json({ message: `Assistance confirmed succesfully`, attendant });
      } else {
        const newAttendant = new Attendant({
          name,
          email,
          confirmedEvents: [eventId]
        });
        await newAttendant.save();
        await Event.findByIdAndUpdate(
          eventId,
          { $addToSet: { confirmedAttendants: newAttendant._id } },
          { new: true }
        );

        return res
          .status(200)
          .json({ message: 'Assistance confirmed successfully', newAttendant });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error confirming attendance' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error confirming attendance', error);
  }
};

module.exports = {
  getAttendants,
  getAttendantsById,
  confirmAssistance
};
