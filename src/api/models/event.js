const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    img: {
      type: String,
      default:
        'https://res.cloudinary.com/dg1hbudfu/image/upload/v1713774429/Events/calendar-event-svgrepo-com_ibkqsh.svg'
    },
    category: {
      type: String,
      required: true,
      enum: ['Rock', 'Pop', 'Electronic', 'Indie', 'Hiphop', 'Mix']
    },
    confirmedAttendants: [{ type: mongoose.Types.ObjectId, ref: 'attendants' }],
    validated: { type: Boolean, default: false },
    createdBy: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
  },
  {
    timestamps: true,
    collection: 'events'
  }
);

const Event = mongoose.model('events', eventSchema, 'events');
module.exports = Event;
