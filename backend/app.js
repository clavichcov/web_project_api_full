const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const path = require('path');
const bodyParser = require('body-parser');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => console.log('Conexión a la base de datos establecida'))
.catch((err) => console.error('Error al conectar a la base de datos:', err));

app.use((req, res, next) => {
  req.user = {
    _id: '6881794117406d0e36185115',
  };
  next();
});

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);



/*
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado, no encontrado' });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
});
*/
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log('Enlace al servidor en el puerto:', PORT);
  console.log(BASE_PATH);

})
