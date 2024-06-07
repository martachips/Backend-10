const mongoose = require('mongoose');

const attendantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    confirmedEvents: [{ type: mongoose.Types.ObjectId, ref: 'events' }]
  },
  {
    timestamps: true,
    collection: 'attendants'
  }
);

const Attendant = mongoose.model('attendants', attendantSchema, 'attendants');
module.exports = Attendant;
