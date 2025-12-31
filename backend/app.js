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
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

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

mongoose.connect('mongodb://around:around2025*@localhost:27017/aroundb?authSource=admin')
.then(() => console.log('Conexión a la base de datos establecida'))
.catch((err) => console.error('Error al conectar a la base de datos:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);

app.post('/signin', login);

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log('Enlace al servidor en el puerto:', PORT);
  console.log(BASE_PATH);

})
