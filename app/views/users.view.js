const view = require('./views');

function login(err){
  let content = view.header;
  content += `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-md-6 mt-3">
        <form action="/login" method="POST">
          <input type="hidden" id="login" name="login" value="true">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Your email" >
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Write a good password" >
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
  content += view.footer;

  return content;
}

function register(err){
  let content = view.header;
  content += `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-md-6 mt-3">
        <form action="/register" method="POST">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" name="name"  placeholder="Your name">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Your email" >
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Write a good password" >
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
  content += view.footer;

  return content;
}

module.exports = {
  login,
  register
}