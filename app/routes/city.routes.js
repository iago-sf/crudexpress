const express = require('express');
const CityController = require('../controllers/City.controller');

const router = express.Router();

router.get('/', CityController.listall)
      
      .get('/create(/:error)?', CityController.findCountry, CityController.add)
      .post('/', CityController.check, CityController.create)
      
      .get('/:key/:value', CityController.find, CityController.show)

      .get('/update/:key/:value/:error?', CityController.find, CityController.findCountry, CityController.updateCity)
      .post('/update/:key/:value', CityController.check, CityController.update)
      
      .get('/delete/:key/:value', CityController.find, CityController.deleted)

module.exports = router;