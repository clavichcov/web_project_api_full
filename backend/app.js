require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(cors({
  origin: [
    'https://sprint19.chickenkiller.com',
    'https://www.sprint19.chickenkiller.com',
    'https://api.sprint19.chickenkiller.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
/*app.options('*', cors()); configuraciones diferentes por ruta*/

mongoose.connect('mongodb://around:around2025*@localhost:27017/aroundb?authSource=admin')
.then(() => console.log('Conexión a la base de datos establecida'))
.catch((err) => console.error('Error al conectar a la base de datos:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      return User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name || 'Jacques Cousteau',
        about: req.body.about || 'Explorador',
        avatar: req.body.avatar || 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
      });
    })
    .then((user) => {
      console.log('✅ Usuario creado:', user._id);
      res.status(201).send({
        email: user.email,
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
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
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'El correo electrónico y la contraseña son obligatorios'
    });
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Correo electrónico o contraseña incorrectos'
        });
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).json({
              message: 'Correo electrónico o contraseña incorrectos'
            });
          }

          // Aquí deberías generar un token JWT si es requerido
          res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error del servidor',
        error: err
      });
    });
});

/*app.use((req, res, next) => {
    req.user = {
      _id: '6881794117406d0e36185115',
    };
    next();
  });*/

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log('Enlace al servidor en el puerto:', PORT);
  console.log(BASE_PATH);

})
