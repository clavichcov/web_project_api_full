const { mongo, default: mongoose } = require('mongoose');
const Card = require('../models/card');


module.exports.getCards = (req, res) => {
  Card.find({}).orFail()
    .then(cards => res.send(cards))
    .catch(err => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'No se encontraron tarjetas' });
      }
      res.status(500).send({ message: 'Error en el servidor', error: err })
    });
};

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Datos de la tarjeta no válidos',
          error: err
        });
      }
      res.status(500).send({ message: 'Error del servidor', error: err });
    });
};

module.exports.deleteCard = (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params._id)) {
      return res.status(400).send({
        message: 'ID de tarjeta no válido'
      });
    }
    Card.findOneAndDelete({
      _id: req.params._id,
      owner: req.user._id
    })
    .then(deletedCard => {
      if (!deletedCard) {
        return res.status(404).send({
          message: 'Tarjeta no encontrado o no tienes permisos'
        });
      }
      res.status(200).send({
        message: 'Tarjeta eliminada correctamente'
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error del servidor', error: err.message
      });
    })
};

module.exports.addLikeOrDislike = (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    return res.status(400).send({
      message: 'ID de tarjeta no válido'
    });
  }


  Card.findOne({ _id: req.params._id })
    .then(card => {
      if (!card) {
        return res.status(404).send({
          message: 'Tarjeta no encontrada'
        });
      }


      const isDislike = card.likes.includes(req.user._id);
      const update = isDislike
        ? { $pull: { likes: req.user._id } }
        : { $addToSet: { likes: req.user._id } };


      return Card.findOneAndUpdate(
        { _id: req.params._id },
        update,
        { new: true }
      ).then(updatedCard => ({
        action: isDislike ? 'dislike' : 'like',
        data: updatedCard
      }));
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error del servidor',
        error: err
      });
    });
};