const express = require('express');
const animalRouter = express.Router();

const animalsController = require('../controllers/animals-controller');
const { getPictureOfAnimal } = require('../services/animal-helpers');

animalRouter.get('/', animalsController.index);
animalRouter.post('/', animalsController.create);

animalRouter.get('/add', (req, res) => {
  res.render('animals/add');
});

animalRouter.get('/:id([0-9]+)', animalsController.show, getPictureOfAnimal, (req, res) => {
  res.render('animals/show', {
    animal: res.locals.animal,
    animalPicture: res.locals.animalPicture,
  });
});
animalRouter.get('/:id([0-9]+)/edit', animalsController.show, (req, res) => {
  res.render('animals/edit', {
    animal: res.locals.animal,
  });
});

animalRouter.put('/:id', animalsController.update);

animalRouter.delete('/:id', animalsController.delete);

module.exports = animalRouter;
