const { ObjectID, ObjectId } = require('bson');
const Country = require('../models/Country');
const City = require('../models/City');
const view = require('../views/cities.view');

/**********************************************************
 *                        LISTALL                         *
 **********************************************************/
// Función para mostrar la lista de ciudades
function listall(req, res) {
  City.find({})
    .then(cities => {
      if(cities.length){ 
        res.status(200).send(view.listCities({cities}));

      } else {
        res.status(204).send({message: 'NO CONTENT'});
      }
    })
    .catch(err => res.status(500).send({err}));
}

/**********************************************************
 *                        SHOW                            *
 **********************************************************/
// Función para mostrar una ciudad en específico
function show(req, res) {
  if(req.body.error) {
    return res.status(500).send({error});

  } else {
    if(!req.body.cities) {
      res.status(404).send({message: 'Not Found'});

    } else {
      let cities = req.body.cities[0];
      res.status(200).send(view.singleCity(cities));
    }
  }
}

/**********************************************************
 *                        CREATE                          *
 **********************************************************/
// Función para mostrar la pantalla de formulario de una ciudad
function add(req, res) {
  if(req.params.error){
    res.status(201).send(view.createCity(true, req.body.countries));
  } else {
    res.status(201).send(view.createCity(false, req.body.countries));
  }
}

// Función para sanitizar los parámetros que envia el usuario
function check(req, res, next){
  if(req.params.value) req.body.id = req.params.value;

  if(!req.body.name || req.body.name.trim() == ''
  || !req.body.country || req.body.country.trim() == ''
  || !req.body.population || req.body.population.trim() == ''
  || !req.body.coordinates || req.body.coordinates.trim() == ''){
    req.body.error = 'err';
    next();
  
  } else {
    req.body.coordinates = req.body.coordinates.split(',');
    if(!req.body.coordinates[1]){
      req.body.error = 'err';
      next();
    }

    if(req.body.indgLang == 'on'){
      req.body.indgLang = true;
    } else {
      req.body.indgLang = false;
    }

    let data = {
      name: req.body.name,
      population: req.body.population,
      country: req.body.country.charAt(0).toUpperCase() + req.body.country.slice(1),
      indgLang: req.body.indgLang,
      coordenatex: req.body.coordinates[0].trim(),
      coordenatey: req.body.coordinates[1].trim(),
    }

    req.body.cities = data;
    next();
  }
}

// Función para añadir la ciudad a la base de datos
function create(req, res) {
  if(req.body.error){
    res.status(500).redirect('/city/create/error');
  
  } else {
    let city = new City(req.body.cities);

    city.save()
      .then(city => 
        res.status(201).redirect('/city')
      )
      .catch(err => res.status(500).send({err}));
  }
}

/**********************************************************
 *                        UPDATE                          *
 **********************************************************/
function updateCity(req, res) {
  if(req.params.error){
    res.status(201).send(view.updateCity(req.body.cities[0], req.body.countries, true));

  } else {
    res.status(201).send(view.updateCity(req.body.cities[0], req.body.countries, false));
  }
}

// Función para actualizar una ciudad
function update(req, res) {
  if(req.body.error) {
    res.status(500).redirect(`/city/update/_id/${req.body.id}/error`);

  } else {
    if(!req.body.cities) {
      return res.status(404).send({message: 'Not Found'});
    } else {
      let id = new ObjectId(req.body.id);
      let city = req.body.cities;


      City.findByIdAndUpdate( id ,  city )
        .then(city => 
          res.status(200).redirect(`/city/_id/${req.body.id}`)
        )
        .catch(err => res.status(500).send({err}))
    }
  }
}

/**********************************************************
 *                      Delete                            *
 **********************************************************/
// Función para eliminar una ciudad
function deleted(req, res) {
  if(req.body.error) { 
    res.status(500).send({error});
  
  } else if(!req.body.cities){
    res.status(404).send({message: 'Not Found'});
  
  } else {
    req.body.cities[0].remove()
      .then(city => {
        res.status(200).redirect('/city')
      })
      .catch(err => res.status(500).send({err}));
  }
}

/**********************************************************
 *                        FIND                            *
 **********************************************************/
// Función para encontrar una ciudad
function find(req, res, next){
  let query = {};
  query[req.params.key] = req.params.value;
  
  City.find(query)
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
    })
}

function findCountry(req, res, next){
  Country.find({})
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

module.exports = {
  listall,
  show,
  create,
  update,
  deleted,
  find,
  add,
  check,
  updateCity,
  findCountry,
}