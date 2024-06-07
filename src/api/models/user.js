const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    imgProfile: {
      type: String,
      default:
        'https://res.cloudinary.com/dg1hbudfu/image/upload/v1715254691/Users/user-square-svgrepo-com_vogrix.svg'
    },
    role: { type: String, default: 'user', enum: ['admin', 'user'] },
    eventsToAttend: [{ type: mongoose.Types.ObjectId, ref: 'events' }],
    eventsCreated: [{ type: mongoose.Types.ObjectId, ref: 'events' }]
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');
module.exports = User;
