const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'Debe tener al menos 2 caracteres'],
    maxlength: 30,
    trim: true
  },
  about: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    minlength: [2, 'Debe tener al menos 2 caracteres'],
    maxlength: 30,
    trim: true
  },
  avatar: {
    type: String,
    required: [true, 'El enlace del avatar es obligatorio'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v);
      },
      message: props => `${props.value} no es una URL válida!`
    }
  },
});

module.exports = mongoose.model('user', userSchema);