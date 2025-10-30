const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: `no es un correo electrónico válido!`
    },
  },

  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'Debe tener al menos 6 caracteres'],
  },

  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'Debe tener al menos 2 caracteres'],
    maxlength: 50,
    trim: true,
    default: 'Jacques Cousteau'
  },

  about: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    minlength: [2, 'Debe tener al menos 2 caracteres'],
    maxlength: 200,
    trim: true,
    default: 'Explorador'
  },
  avatar: {
    type: String,
    required: [true, 'El enlace del avatar es obligatorio'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(v);
      },
      message: props => `${props.value} no es una URL válida!`
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
  },
});

module.exports = mongoose.model('user', userSchema);