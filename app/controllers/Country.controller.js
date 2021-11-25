const { ObjectID, ObjectId } = require('bson');
const Country = require('../models/Country');
const City = require('../models/City');
const view = require('../views/countries.view');

/**********************************************************
 *                        LISTALL                         *
 **********************************************************/
// Función para mostrar la lista de ciudades
function listall(req, res) {
  Country.find({})
    .then(countries => {
      if(countries.length){ 
        res.status(200).send(view.listCountries({countries}));

      } else {
        res.status(204).send({message: 'NO CONTENT'});
      }
    })
    .catch(err => res.status(500).send({err}));
}

/**********************************************************
 *                        SHOW                            *
 **********************************************************/
// Función para mostrar un país en específico
function show(req, res) {
  if(req.body.error) {
    res.status(500).send({message: 'ALGO SALIÓ MAL'});

  } else {
    if(!req.body.countries) {
      res.status(404).send({message: 'Not Found'});

    } else {
      let countries = req.body.countries[0];

      if(req.body.cities){
        let cities = req.body.cities;
        res.status(200).send(view.singleCountry(countries, cities));
      
      } else {
        res.status(200).send(view.singleCountry(countries));
      } 
      
    }
  }
}

/**********************************************************
 *                        CREATE                          *
 **********************************************************/
// Función para mostrar la pantalla de formulario de un país
function add(req, res) {
  if(req.params.error){
    res.status(201).send(view.createCountry(true));
  } else {
    res.status(201).send(view.createCountry());
  }
}

// Función para sanitizar los parámetros que envia el usuario
function check(req, res, next){
  if(req.params.value) req.body.id = req.params.value;

  if(!req.body.name || req.body.name.trim() == ''
  || !req.body.population || req.body.population.trim() == ''
  || !req.body.language || req.body.language.trim() == ''
  || !req.body.age || req.body.age.trim() == ''){
    req.body.error = 'err';
    next();

  } else {
    if(!req.body.continent){
      req.body.error = 'err';
      next();

    } else {
      if(req.body.soberanity == 'on'){
        req.body.soberanity = true;
      } else {
        req.body.soberanity = false;
      }

      let data = {
        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
        continent: req.body.continent,
        population: req.body.population,
        language: req.body.language,
        age: req.body.age,
        soberanity: req.body.soberanity,
      }

      req.body.countries = data;
      next();
    }
  }
}

// Función para añadir el país a la base de datos
function create(req, res) {
  if(req.body.error){
    res.status(500).redirect('/country/create/error');
  
  } else {
    let country = new Country(req.body.countries);

    country.save()
      .then(country => 
        res.status(201).redirect('/country')
      )
      .catch(err => res.status(500).send({err}));
  }
}

/**********************************************************
 *                        UPDATE                          *
 **********************************************************/
function updateCountry(req, res) {
  if(req.params.error){
    res.status(201).send(view.updateCountry(req.body.countries[0], true));
  } else {
    res.status(201).send(view.updateCountry(req.body.countries[0]));
  }
}

// Función para actualizar un país
function update(req, res) {
  if(req.body.error) {
    res.status(500).redirect(`/country/update/_id/${req.body.id}/error`);

  } else {
    if(!req.body.countries) {
      return res.status(404).send({message: 'Not Found'});
    } else {
      let id = new ObjectId(req.body.id);
      let country = req.body.countries;


      Country.findByIdAndUpdate( id ,  country )
        .then(country => 
          res.status(200).redirect(`/country/_id/${req.body.id}`)
        )
        .catch(err => res.status(500).send({err}))
    }
  }
}

/**********************************************************
 *                      Delete                            *
 **********************************************************/
// Función para eliminar un país
function deleted(req, res) {
  if(req.body.error) { 
    res.status(500).send({error});
  
  } else if(!req.body.countries){
    res.status(404).send({message: 'Not Found'});
  
  } else {
    req.body.countries[0].remove()
      .then(country => {
        res.status(200).redirect('/country')
      })
      .catch(err => res.status(500).send({err}));
  }
}

/**********************************************************
 *                        FIND                            *
 **********************************************************/
// Función para encontrar un país
function find(req, res, next){
  let query = {};
  query[req.params.key] = req.params.value;
  
  Country.find(query)
    .then(countries => {
      if(!countries.length){
        next();

      } else {
        req.body.countries = countries;
        next();
      }
    })
    .catch(err =>{
      req.body.error = err;
      next();
    });
}

// Función para encontrar las ciudades de un país
function findRelatedCities(req, res, next){
  City.find({country: req.body.countries[0].name})
    .then(cities => {
      if(!cities.length){
        next();

      } else {
        req.body.cities = cities;
        next();
      }
    })
    .catch(err =>{
      req.body.error = err;
      next();
    });
}

module.exports = {
  listall,
  show,
  create,
  update,
  deleted,
  find,
  add,
  check,
  updateCountry,
  findRelatedCities,
}