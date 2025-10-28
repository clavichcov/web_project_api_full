const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'Debe tener al menos 2 caracteres'],
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'El enlace de la imagen de la tarjeta es obligatorio'],
    minlength: [2, 'Debe tener al menos 2 caracteres'],
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v),
      message: 'El enlace debe ser una URL válida',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);