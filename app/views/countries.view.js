const view = require('./views')
  
function listCountries(logged, countries){
  let img = countrySVG();

  let content = view.header();
  content += view.navbar(logged);
  content += `
  <div class="container align-content-center"> 
    <div class="row justify-content-center">
      <div class="col col-9">
        <div class="row justify-content-center">
  `;

  for(country of countries.countries){
    content += `
    <div class="col-3 mt-3">
      <div class="card h-30">
        <div class="card-body">
          <h4 class="card-title text-center">${country.name}</h4>
            
          <p class="card-text">Idioma: ${country.language}</p>
          <p class="card-text">Población: ${country.population}</p>
          <div class="row justify-content-center">
            <div class="col col-md-12">
            <a href="/country/_id/${country._id}" class="btn btn-info w-100 text-white">Ver el país</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  content += `
        </div>
      </div>
      <div class="col col-3">
        <div class="text-center mt-3">
          <a href="/country/create" class="btn btn-info text-white w-100">Añadir país</a>
        </div>
        <div class="text-center mt-3">
          ${img}
        </div>
      </div>
    </div>
  </div>`;
  content += view.footer();

  return content;
}

function singleCountry(country, cities){
  let date = new Date();

  let content = view.header();
  content += `
  <div class="container align-content-center">
    <div class="row justify-content-between m-3">
      <div class="col col-6 text-start">
        <h1 class="">${country.name}</h1>
      </div>
      <div class="col col-6 text-end">
        ${
        country.soberanity 
          ? '<img src="https://i.pinimg.com/originals/83/b1/f3/83b1f39083f8dc4a4e31c1b4b8e8706e.png" style="width: 4rem ;" alt="Soberanity" class="text-success">'
          : ''
        }
      </div>
    </div>
 
    <div class="row justify-content-center">
      <div class="col m-3">
        <p class="">Continente: `;
        
  switch(country.continent){
    case 'AM': 
      content += 'América'
      break;
    case 'EU': 
      content += 'Europa'
      break;
    case 'AS': 
      content += 'Asia' 
      break;
    case 'AF': 
      content += 'Africa'
      break;
    case 'OC': 
      content += 'Oceanía'
      break;
    case 'AN': 
      content += 'Antartica'
      break;
    default: 'No se encontró el continente';
  } 

  content +=`
        </p>
        <p class="">Idioma: ${country.language}</p>
        <p class="">Población: ${country.population}</p>
        <p class="">Edad: fundado en el `;

  if(Math.sign(country.age) == 1){
    content += Math.abs(country.age) + ' D.C';

  } else {
    content += Math.abs(country.age) + ' A.C';
  } 
  
  content +=`
        tiene ${date.getFullYear() - country.age} años</p>
        <div class="row justify-content-center">
          <div class="col col-6 text-center">
            <a href="/country/update/_id/${country._id}" class="btn btn-warning w-50">Actualizar</a>
          </div>
          <div class="col col-6 text-center">
            <a href="/country/delete/_id/${country._id}" class="btn btn-danger w-50">Borrar</a>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-between m-3">
      <div class="col col-12">`;

  if(!cities){
    content += `<div class="text-center">No hay ciudades asociadas a este país</div>`;
  
  } else {
    for(city of cities){
      content += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title text-center">${city.name}</h4>

            <p class="card-text">Idioma: `;
            if(city.indgLang) {
              content += `tienen idioma propio`;
            
            } else {
              content += `usan el idioma del país`;
            }
            
      content += 
            `</p>
            <p class="card-text">Población: ${city.population}</p>
            <div class="row justify-content-center">
              <div class="col col-md-12">
                <a href="/city/_id/${city._id}" class="btn btn-outline-info w-100">Ver más</a>
              </div>
            </div>
          </div>
        </div>`;
    }
  }
  
  content += `
      </div>
    </div>
  </div>`;


  content += view.footer();

  return content;
}

function createCountry (err){
  let date = new Date();

  let content = view.header();
  content += `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-md-6 mt-3">
        <form action="/country" method="POST">
          <div class="mb-3">
            <label for="countryName" class="form-label">Nombre del país</label>
            <input type="text" class="form-control" id="name" name="name"  placeholder="Nombre del país">
          </div>
          <div class="mb-3">
            <label for="countryContinent" class="form-label">Continente donde se ubica</label>
            <select class="form-select" name="continent" id="countryContinent">
              <option value="" disabled selected>Escoge un continente</option>
              <option value="EU">Europa</option>
              <option value="AM">America</option>
              <option value="AS">Asia</option>
              <option value="AF">Africa</option>
              <option value="OC">Oceanía</option>
              <option value="AN">Antártida</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="countryLanguage" class="form-label">Idioma del país</label>
            <input type="text" class="form-control" id="countryLanguage" name="language" placeholder="Lengua que se habla" >
          </div>
          <div class="mb-3">
            <label for="countryPopulation" class="form-label">Población total</label>
            <input type="number" class="form-control" id="population" name="population" placeholder="Numero de habitantes" >
          </div>
          <div class="mb-3">
            <label for="countryAge" class="form-label">Fundación del país (negativo si es A.C.)</label>
            <input type="number" class="form-control" id="age" name="age" max="${ date.getFullYear() }" placeholder="1300" >
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="soberanity" name="soberanity">
            <label class="form-check-label" for="soberanity">¿Se gobierna a sí mismo?</label>
          </div>
          ${
            err
              ? '<div class="mb-3"><label class="bg-danger bg-gradient bg-opacountry-75 border border-danger text-white rounded p-1">Completa todos los campos de forma correcta</label></div>'
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

function updateCountry (country, err){
  let date = new Date();
  let continent = Array();

  switch (country.continent){
    case 'AM':
      continent['AM'] = true;
      break;
    case 'EU':
      continent['EU'] = true;
      break;
    case 'AS':
      continent['AS'] = true;
      break;
    case 'AF':
      continent['AF'] = true;
      break;
    case 'OC':
      continent['OC'] = true;
      break;
    case 'AN':
      continent['AN'] = true;
      break;
    default: 
      continent['disabled'] = true;
      break;
  }

  let content = view.header();
  content += `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-md-6 mt-3">
        <form action="/country/update/_id/${country._id}" method="POST">
          <div class="mb-3">
            <label for="countryName" class="form-label">Nombre del país</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Nombre del país" value="${country.name}">
          </div>
          <div class="mb-3">
            <label for="countryContinent" class="form-label">Continente donde se ubica</label>
            <select class="form-select" name="continent" id="countryContinent">
              <option value="" disabled ${ continent['disabled'] ? 'selected' : ''}>Escoge un continente</option>
              <option value="EU" ${ continent['EU'] ? 'selected' : ''}>Europa</option>
              <option value="AM" ${ continent['AM'] ? 'selected' : ''}>America</option>
              <option value="AS" ${ continent['AS'] ? 'selected' : ''}>Asia</option>
              <option value="AF" ${ continent['AF'] ? 'selected' : ''}>Africa</option>
              <option value="OC" ${ continent['OC'] ? 'selected' : ''}>Oceanía</option>
              <option value="AN" ${ continent['AN'] ? 'selected' : ''}>Antártida</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="countryLanguage" class="form-label">Idioma del país</label>
            <input type="text" class="form-control" id="countryLanguage" name="language" placeholder="Lengua que se habla" value="${country.language}">
          </div>
          <div class="mb-3">
            <label for="countryPopulation" class="form-label">Población total</label>
            <input type="number" class="form-control" id="population" name="population" placeholder="Numero de habitantes" value="${country.population}">
          </div>
          <div class="mb-3">
            <label for="countryAge" class="form-label">Fundación del país (negativo si es A.C.)</label>
            <input type="number" class="form-control" id="age" name="age" max="${ date.getFullYear() }" placeholder="1300" value="${country.age}">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="soberanity" name="soberanity" ${country.soberanity ? 'checked' : ''}>
            <label class="form-check-label" for="soberanity">¿Se gobierna a sí mismo?</label>
          </div>
          ${
            err
              ? '<div class="mb-3"><label class="bg-danger bg-gradient bg-opacountry-75 border border-danger text-white rounded p-1">Completa todos los campos de forma correcta</label></div>'
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

function countrySVG(){
  let rng = Math.floor(Math.random()*4);

  switch (rng){
    case 0:
      return `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="230px" height="260px" viewBox="0 0 230 260" enable-background="new 0 0 230 260" xml:space="preserve">
      <path d="M174.276,218.293l-13.415,2.241l-14.306,4.967l-9.421,1.646l-12.335-4.724l-2.349,3.806l-5.101-1.862l-5.642,8.233
        l4.886,5.992l4.724-0.378l20.757,10.986l2.915-0.486l6.155,2.538l3.401,5.074L165.126,258l6.235-8.26l-5.425-8.476l2.618-11.58
        L174.276,218.293z M53.295,150.838l-5.912-4.291l-8.017,8.151l-13.064,5.264l4.912,8.071l0.783,32.715l3.293,4.13l4.778,1.971
        l4.454-8.449l9.42,1.808l1.674-10.365l1.566-13.55l-2.052-3.536l2.268-11.04L53.295,150.838z M216.547,153.106l-40.894-16.736
        l3.509-8.88l-3.482-3.617l-16.654,1.619l-19.678-13.955l-10.77-23.322l-24.024-17.95l-2.51-10.069l2.078-4.237l-1.7-9.34
        l21.702-16.843l0.054-0.513l-4.616-12.012l5.021-6.073L103.42,8.262l-5.965-5.911L80.341,2l-2.645,4.805l-9.474-2.214l0.108,8.044
        l-4.562-1.943l-5.048,6.505l-14.468,6.505l-2.888,7.342l-8.449-10.743l-10.257,7.801l-5.426-1.215L4.06,30.558l5.101,14.496
        l-7.018,8.205l5.453,5.615l-3.59,4.076l3.185,7.801l11.85,4.076l0.027,7.585l8.017-3.671l9.177-11.094l10.905,0.728l18.922,13.416
        l0.675,5.992l7.538,17.873l45.908,40l13.334-0.945l5.507,7.342l9.366,7.369l5.318-1.673l5.237,6.748l-1.431,4.049l8.8,5.425
        l5.83-1.511l13.55,30.448l-7.018,4.372l1.674,3.806l-5.021,10.906l3.05,4.021l6.56-1.106l1.187-5.021l7.423-8.854l-1.241-6.451
        l6.559-5.803l4.265,0.405l-0.081-12.957l-11.718-7.866l7.021-20.126l9.475,4.616l4.912-0.216l6.937,9.07l6.101,2.321l2.051-8.368
        L216.547,153.106z"/>
      </svg>
      `;
    case 1:
      return `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="238px" height="260px" viewBox="0 0 238 260" enable-background="new 0 0 238 260" xml:space="preserve">
      <path d="M77.972,205.527l3.567,4.927l-6.62,7.338l-10.572-0.462l-5.414,2.72l-4.773,8.442l-5.517-1.155l-2.078-1.719l-1.129-8.827
        l4.927-4.208l1.822-5.029l5.671,1.642l6.928-1.18l0.975-2.899l8.031-3.13L77.972,205.527z M231.618,32.893l1.257-8.365l-4.644,5.055
        h-5.979l-2.284-2.746l-7.082-1.052l-9.391-7.133L189.948,2l-4.773,6.363l2.617,7.287l-1.745,15.164l-4.003,4.131l1.411,6.415
        l-2.822,3.823l-5.594-0.693l-7.415,7.852l-5.209,1.719l-1.309,7.595l4.798,4.901l-2.284,7.698l3.053,2.951l6.004-7.544l1.001-5.825
        l-5.722-2.335l1.232-4.465l4.798-1.078l3.823,4.542l9.571-5.542l20.604,12.188l1.488-7.133l3.746-6.363l8.981-6.569l9.109-0.103
        l4.567-6.004L231.618,32.893z M187.1,94.603l-3.438-4.003l-0.821-12.83l-6.543-2.335l-1.95,6.492l6.492-1.693l-0.693,5.979
        l-12.701,1.77l-5.183,3.053l0.565,3.9l1.283,16.935l-2.463,7.082l-4.901,10.366l-1.796,6.825l-8.442,6.081l-4.234,7.672
        l-4.978,3.875l-9.366,3.515l-4.285,3.721l-4.105-3.695l1.206-5.953l-5.209-1.591l-0.231,8.929l-8.365,10.341l-4.285,5.517
        l0.026,6.286l-7.595,1.18l-3.515-4.413l-5.568,1.77l-7.492,0.565l-15.703,1.334l-0.975-1.386l-9.468,1.001l-3.849,4.567
        l-11.906,8.237l-4.388,4.182l-5.157-0.513l-3.823,5.388l5.927,4.054l8.621-0.949l3.951,3.105l2.669-5.645l4.978,0.385l13.728-4.105
        l8.288-0.411l5.081-2.977l6.723-0.616l4.388,2.848l5.619-0.898l-5.363,6.902l-0.744,7.569l10.315,7.954l3.669-3.567l3.772-6.8
        l10.879-6.261l-5.799-4.747l3.772-6.184l2.284,4.696l8.262,2.232l11.316-0.411l5.26-6.877l2.72,6.774l6.03-2.463l-0.616-4.516
        l6.851-3.002l3.618-4.054l1.206-2.181l-0.231,11.803l8.083-3.772l1.36-6.748l5.619-3.079l-4.157-7.775l3.284-12.522l2.386-2.181
        l1.206-7.518l-1.591-9.366l2.386-8.801l3.387-0.693l4.336-10.238l2.951-1.026l3.053-9.519l-1.796-8.313L187.1,94.603z
        M35.609,213.815l-8.083-1.36l-3.9-5.542h-6.569l-2.001,4.465l-5.748,2.13l-3.669,1.95l-3.515,6.184l3.438,6.261l5.363-4.67
        l2.617-3.413l0.924,3.079l2.258,3.284l-1.206,7.108l-3.875,4.542l-3.413,6.569l2.309,3.284l-2.489,6.8L18.905,258l4.182-6.261
        l2.617,1.77l7.441-20.579l3.284-3.336l2.669-3.336l-4.285-6.774L35.609,213.815z"/>
      </svg>
      `;
    case 2:
      return `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="260px" height="169px" viewBox="0 0 260 169" enable-background="new 0 0 260 169" xml:space="preserve">
      <polygon points="251.32,102.84 231.379,106.967 226.45,111.846 224.474,125.883 217.343,135.365 209.187,133.939 194.5,139.042 
        179.239,134.715 160.274,102.514 158.449,81.473 162.002,69.964 147.489,64.335 133.428,39.541 126.297,33.66 116.84,34.061 
        111.786,40.817 101.803,34.862 97.975,25.43 86.016,15.045 72.48,14.645 66.3,18.599 49.963,17.773 20.364,4.337 2,2.01 
        10.682,29.433 23.242,42.868 23.611,48.786 18.588,54.051 35.148,65.727 36.902,77.62 52.064,90.881 49.587,78.896 42.832,60.832 
        26.219,34.136 19.564,26.229 18.888,9.816 33.425,18.224 39.229,39.064 63.048,65.186 62.898,65.41 63.766,70.309 91.395,101.488 
        95.873,110.995 95.023,118.501 91.42,121.079 101.128,132.838 132.702,150.126 173.709,164.012 188.896,156.132 207.886,166.99 
        217.669,157.982 229.828,154.329 219.595,146.549 223.248,141.044 240.011,138.318 245.59,132.663 252.246,132.813 253.226,119.389 
        258,108.394 "/>
      </svg>
      `;
    case 3:
      return `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="260px" height="214px" viewBox="0 0 260 214" enable-background="new 0 0 260 214" xml:space="preserve">
      <path d="M258,105.681l-3.841,13.29l-15.339-8.169l14.289-9.808L258,105.681z M250.702,49.524l-0.589-15.826l-22.407,3.713
        l-15.211-8.835l-26.991,2.074l-34.442-15.416l-27.682-1.383l-7.964-4.2l-18.924,2.996L62.946,6.808L46.634,9.292L34.163,2.071
        L21.871,5.938L2,18.666l10.294,10.525L9.016,34.21l4.404,12.292l8.271-2.33l3.047,9.27l29.987-1.741l1.178,16.85l-7.068,6.504
        l-5.813,36.619l-10.883-0.179l11.498,18.438l-8.732,14.98l8.425,7.017l-13.06,16.543l2.049,10.192l11.216,1.152l14.084,7.58
        l-4.481,3.969l5.608,12.24l11.805,8.323l7.99-7.682l18.694-11.293l50.678-1.639l8.937-16.543l15.288-5.147l8.169-21.382
        l15.185-11.319l-5.634-3.764l-6.786-16.824l25.249-42.278l21.434-7.605L250.702,49.524z"/>
      </svg>
      `;
  }
}

module.exports = { listCountries, createCountry, updateCountry, singleCountry }