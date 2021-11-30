const view = require('./views')

function index(logged){
  let content = view.header();
  content += view.navbar(logged);
  content += `
  <div class="d-flex h-100 text-center">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <main class="px-3">
        <h1>Bienvenido.</h1>
        <p class="lead">Esta es la página principal del proyecto CRUD con una API con express de Iago Senin Fernandez.</p>
        <p class="lead">
          <a href="/countries" class="btn btn-lg btn-secondary fw-bold">Ir a países</a>
        </p>
      </main>
    </div>
  </div>
  `;

  content += view.footer();
  return content;
}

module.exports = {
  index,
}