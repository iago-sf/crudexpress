const view = require('./views')

function index(){
  let content = view.header;
  content += `
  <div class="container mt-5">
    <div class="row mt-5">
      <div class="col col-6 mt-5">
        <a href="/country" class="text-center btn btn-outline-success w-100">Países</a>
      </div>
      <div class="col col-6 mt-5">
        <a href="/city" class="text-center btn btn-outline-success w-100">Ciudades</a>
      </div>
    </div>
  </div>
  `;

  content += view.footer;
  return content;
}

module.exports = {
  index,
}