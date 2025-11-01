const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: 'Error en el servidor', error: err }));
}

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'ID de usuario no encontrado' });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de usuario no válido' });
      }
      res.status(500).send({ message: 'Error en el servidor', error: err });
    });
};

module.exports.createUser = (req, res) => {
  const {
    email,
    password,
    name = 'Jacques Cousteau',
    about = 'Explorador',
    avatar = 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
  } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'El correo electrónico y la contraseña son obligatorios'
    });
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      return User.create({
        email,
        password: hash,
        name,
        about,
        avatar
      });
    })
  .then((user) => {
      const userResponse = {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar
      };
      res.status(201).send(userResponse);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({
          message: 'El correo electrónico ya está registrado'
        });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Datos de entrada no válidos',
          errors: Object.values(err.errors).map(error => error.message)
        });
      }
      res.status(500).send({ message: 'Error del servidor', error: err });
    });
};

module.exports.updateUser = (req, res) => {

};

module.exports.updateAvatar = (req, res) => {

};