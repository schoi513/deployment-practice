const db = require('../db/config');

class Animal {
  constructor(animal) {
    this.id = animal.id || null;
    this.name = animal.name;
    this.location = animal.location;
    this.cuteness = animal.cuteness;
    this.species = animal.species;
  }

  static getAll() {
    return db
      .manyOrNone('SELECT * FROM animals ORDER BY id ASC')
      .then((animals) => {
        return animals.map((animal) => {
          return new this(animal);
        });
      });
  }

  static getById(id) {
    return db
      .oneOrNone('SELECT * FROM animals WHERE id = $1', id)
      .then((animal) => {
        if (animal) return new this(animal);
        throw new Error('Animal not found');
      });
  }

  save() {
    return db
      .one(
        `
      INSERT INTO animals (name, cuteness, species, location)
      VALUES ($/name/, $/cuteness/, $/species/, $/location/)
      RETURNING *`,
        this
      )
      .then((animal) => {
        return Object.assign(this, animal);
      });
  }

  update(changes) {
    Object.assign(this, changes);
    return db
      .oneOrNone(
        `
      UPDATE animals SET
        name = $/name/,
        cuteness = $/cuteness/,
        species = $/species/,
        location = $/location/
      WHERE id = $/id/
      RETURNING *
    `,
        this
      )
      .then((animal) => {
        return Object.assign(this, animal);
      });
  }

  delete() {
    return db.oneOrNone('DELETE FROM animals WHERE id = $1', this.id);
  }
}

module.exports = Animal;
