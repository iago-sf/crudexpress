const express = require('express');
const CountryController = require('../controllers/Country.controller');

const router = express.Router();

router.get('/', CountryController.listall)
      
      .get('/create(/:error)?', CountryController.add)
      .post('/', CountryController.check, CountryController.create)
      
      .get('/:key/:value', CountryController.find,  CountryController.findRelatedCities, CountryController.show)

      .get('/update/:key/:value/:error?', CountryController.find, CountryController.updateCountry)
      .post('/update/:key/:value', CountryController.check, CountryController.update)
      
      .get('/delete/:key/:value', CountryController.find, CountryController.deleted)

module.exports = router;