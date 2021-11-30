const view = require('./views')
  
function listCities(logged, cities){
  let content = view.header();
  content += view.navbar(logged);
  content += `
  <div class="container align-content-center">
    <div class="row justify-content-center">
      <div class="col col-9">
        <div class="row justify-content-center">
  `;

  for(city of cities.cities){
    // console.log(city);
    content += `
    <div class="col-3 mt-3">
      <div class="card h-30">
        <div class="card-body">
          <h4 class="card-title text-center">${city.name}</h4>
    
          <p class="card-text">País al que pertenece: ${city.country}</p>
          <p class="card-text">Población: ${city.population}</p>
          <p class="card-text">
            <a href="/city/_id/${city._id}" class="btn btn-info w-100 text-white">Ver la ciudad</a>
          </p>
        </div>
      </div>
    </div>`;
  }

  content += `
        </div>
      </div>
      <div class="col col-3">
        <div class="text-center mt-3">
          <a href="/city/create" class="btn btn-info text-white w-100">Añadir ciudad</a>
        </div>
        <div class="text-center mt-3">
          <img src="https://cdn-icons-png.flaticon.com/512/269/269947.png" alt="cities image" class="w-100">
        </div>
      </div>
    </div>
  </div>`;
  content += view.footer();

  //console.log(content);
  return content;
}

function singleCity(city){
  let content = view.header();
  content += `
  <div class="container align-content-center">
    <div class="row justify-content-between m-3">
      <div class="col col-6 text-start">
        <h1 class="">${city.name}</h1>
      </div>
      <div class="col col-6 text-end">
        ${
        city.indgLang 
          ? '<img src="https://www.svgrepo.com/show/293715/language.svg" style="filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%); width: 4rem ;" alt="Own languaje" class="text-success">'
          : '' // <img src="https://www.svgrepo.com/show/293715/language.svg" width="70%" style="filter: invert(16%) sepia(83%) saturate(7470%) hue-rotate(359deg) brightness(109%) contrast(116%);" alt="Own languaje" class="text-danger">
        }
      </div>
    </div>
    
    <iframe class="m-3 w-100" src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d13994.504847825392!2d${city.coordenatey}46032717!3d${city.coordenatex}36074592!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1637186936971!5m2!1ses!2ses" height="400px" style="border:0;" allowfullscreen="" loading="lazy" id="map" name="map"></iframe>
    
    <div class="row justify-content-center">
      <div class="col m-3">
        <p class="">País al que pertenece: ${city.country}</p>
        <p class="">Población: ${city.population}</p>
        <div class="row justify-content-center">
          <div class="col col-6 text-center">
            <a href="/city/update/_id/${city._id}" class="btn btn-warning w-50">Actualizar</a>
          </div>
          <div class="col col-6 text-center">
            <a href="/city/delete/_id/${city._id}" class="btn btn-danger w-50">Borrar</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  content += view.footer();

  return content;
}

function createCity (err, countries){
  let content = view.header();
  content += `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-md-6 mt-3">
        <form action="/city" method="POST">
          <div class="mb-3">
            <label for="cityName" class="form-label">Nombre de la ciudad</label>
            <input type="text" class="form-control" id="name" name="name"  placeholder="The city">
          </div>
          <div class="mb-3">
            <label for="cityCountry" class="form-label">País en el que se encuentra</label>
            <select class="form-select" name="continent" id="cityCountry">
              <option value="" disabled selected>Escoge un país</option>`;
    
  for(country of countries){
    content += `<option value="${country.name}">${country.name}</option>`;
  }

  content += `
            </select>
          </div>
          <div class="mb-3">
            <label for="cityPopulation" class="form-label">Población total</label>
            <input type="number" class="form-control" id="population" name="population" placeholder="Number of population" >
          </div>
          <div class="mb-3">
            <label for="cityCoordinates" class="form-label">Coordenadas</label>
            <input type="text" class="form-control" id="coordinates" name="coordinates" placeholder="Coordinates as: 10.101010, 20.202020" >
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="indgLangCity" name="indgLang">
            <label class="form-check-label" for="indgLangCity">¿Tiene idioma propio?</label>
          </div>
          ${
            err
              ? '<div class="mb-3"><label class="bg-danger bg-gradient bg-opacity-75 border border-danger text-white rounded p-1">Completa todos los campos de forma correcta</label></div>'
              : ''
          }
          <button type="submit" class="btn btn-primary">Añadir</button>
        </form>
      </div>
    </div>
  </div>`;
  content += view.footer();

  return content;
}

function updateCity (city, countries, err){
  let content = view.header();
  content += `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-md-6 mt-3">
        <form action="/city/update/_id/${city._id}" method="POST">
          <div class="mb-3">
            <label for="cityName" class="form-label">Nombre de la ciudad</label>
            <input type="text" class="form-control" id="name" name="name"  placeholder="The city" value="${city.name}">
          </div>
          <div class="mb-3">
            <label for="cityCountry" class="form-label">País en el que se encuentra</label>
            <select class="form-select" name="continent" id="cityCountry">
              <option value="" disabled selected>Escoge un país</option>`;
    
  for(country of countries){
    content += `<option value="${country.name}">${country.name}</option>`;
  }

  content += `
            </select>
          </div>
          <div class="mb-3">
            <label for="cityPopulation" class="form-label">Población total</label>
            <input type="number" class="form-control" id="population" name="population" placeholder="Number of population" value="${city.population}">
          </div>
          <div class="mb-3">
            <label for="cityCoordinates" class="form-label">Coordenadas</label>
            <input type="text" class="form-control" id="coordinates" name="coordinates" placeholder="Coordinates as: 10.101010, 20.202020" value="${city.coordenatex}, ${city.coordenatey}">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="indgLangCity" name="indgLang" ${city.indgLang ? 'checked' : ''}>
            <label class="form-check-label" for="indgLangCity">¿Tiene idioma propio?</label>
          </div>
          ${
            err
              ? '<div class="mb-3"><label class="bg-danger bg-gradient bg-opacity-75 border border-danger text-white rounded p-1">Completa todos los campos de forma correcta</label></div>'
              : ''
          }
          <button type="submit" class="btn btn-primary">Añadir</button>
        </form>
      </div>
    </div>
  </div>`;
  content += view.footer();

  return content;
}

module.exports = { listCities, createCity, updateCity, singleCity }