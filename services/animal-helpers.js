const fetch = require('node-fetch');
require('dotenv').config();

const getPictureOfAnimal = (req, res, next) => {
  fetch(`https://api.pexels.com/v1/search?query=${res.locals.animal.species}`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY,
    },
  })
    .then((fetchRes) => fetchRes.json())
    .then((allPictures) => {
      console.log(allPictures);
      if (!allPictures.photos.length) {
        res.locals.animalPicture = null;
      } else {
        // looking at the postman response to get this
        const picture = allPictures.photos[0].src.medium;
        res.locals.animalPicture = picture;
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = {
  getPictureOfAnimal,
};
