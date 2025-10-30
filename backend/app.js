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

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a la base de datos establecida'))
.catch((err) => console.error('Error al conectar a la base de datos:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({email: user.email, _id: user._id});
    })
    .catch((err) => {
      res.status(400).send(err);
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
