const Animal = require('../models/Animal');

const animalsController = {};

animalsController.index = (req, res, next) => {
  Animal.getAll()
    .then((animals) => {
      res.render('animals/index', {
        message: 'ok',
        data: { animals },
      });
    })
    .catch(next);
};

animalsController.show = (req, res, next) => {
  Animal.getById(req.params.id)
    .then((animal) => {
      res.locals.animal = animal;
      next();
    })
    .catch(next);
};

animalsController.create = (req, res) => {
  new Animal({
    name: req.body.name,
    species: req.body.species,
    cuteness: req.body.cuteness,
    location: req.body.location,
  })
    .save()
    .then(() => {
      res.redirect(`/animals`)
    })
    .catch(next);
};

animalsController.update = (req, res) => {
  Animal.getById(req.params.id)
    .then((animal) => {
      return animal.update(req.body);
    })
    .then((updatedAnimal) => {
      res.redirect(`/animals/${updatedAnimal.id}`);
    })
    .catch(next);
};

animalsController.delete = (req, res) => {
  Animal.getById(req.params.id)
    .then((animal) => {
      return animal.delete();
    })
    .then(() => {
      res.redirect('/animals');
    })
    .catch(next);
};

module.exports = animalsController;
