const { deleteFile } = require('../../utils/deleteIMG');
const Event = require('../models/event');
const User = require('../models/user');

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate([
      { path: 'confirmedAttendants' },
      { path: 'createdBy' }
    ]);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(400).json('Error showing all the events', error);
  }
};

const getEventById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate([
      { path: 'confirmedAttendants' },
      { path: 'createdBy' }
    ]);
    return res.status(200).json(event);
  } catch (error) {
    console.error(`Error showing the event with ID: ${id}`, error);
    return res
      .status(400)
      .json({ message: `Error showing the event with ID: ${id}`, error });
  }
};

const getEventByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const eventByCategory = await Event.find({ category }).populate([
      { path: 'confirmedAttendants' },
      { path: 'createdBy' }
    ]);
    return res.status(200).json(eventByCategory);
  } catch (error) {
    return res.status(400).json('Error showing events by category');
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { title, link, date, location, description, category } = req.body;
    const creator = req.user._id;

    const newEvent = new Event({
      title,
      link,
      date,
      location,
      description,
      category,
      createdBy: creator,
      validated: false
    });

    if (req.file) {
      newEvent.img = req.file.path;
    }

    const event = await newEvent.save();
    await User.findByIdAndUpdate(creator, {
      $push: {
        eventsCreated: event._id
      }
    });
    await event.save();
    return res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error creating the event', error);
  }
};

const validateEvent = async (req, res, next) => {
  try {
    const eventID = req.params.id;
    const event = await Event.findByIdAndUpdate(
      eventID,
      { validated: true },
      { new: true }
    );

    if (!event) {
      return res.status(400).json('Event not found');
    }
    return res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error validating the event', error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldEvent = await Event.findById(id);
    if (!oldEvent) {
      return res.status(404).json('Event not found');
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!updatedEvent) {
      return res
        .status(400)
        .json({ error: `Event not found to update` })
        .json({ error: 'Updated event not found' });
    }

    if (req.file) {
      if (
        oldEvent.img !=
        'https://res.cloudinary.com/dg1hbudfu/image/upload/v1713774429/Events/calendar-event-svgrepo-com_ibkqsh.svg'
      ) {
        deleteFile(oldEvent.img);
      }
      oldEvent.img = req.file.path;
    }
    await updatedEvent.save();

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error updating event', error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (
      deletedEvent.img !==
      'https://res.cloudinary.com/dg1hbudfu/image/upload/v1713774429/Events/calendar-event-svgrepo-com_ibkqsh.svg'
    ) {
      deleteFile(deletedEvent.img);
    }

    return res.status(200).json(deletedEvent);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json('Request error. Event could not be deleted', error);
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  validateEvent,
  updateEvent,
  deleteEvent,
  getEventByCategory
};
