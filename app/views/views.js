function navbar(logged){
  let  nav = `
  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <i class="bi bi-house-fill" style="font-size: 2rem;"></i>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" class="nav-link px-2 link-dark">Home</a></li>
        <li><a href="/country" class="nav-link px-2 link-dark">Países</a></li>
        <li><a href="/city" class="nav-link px-2 link-dark">Ciudades</a></li>
      </ul>`;
      
  if(!logged){
    nav += `
      <div class="col-md-3 text-end">
        <a href="/login" class="btn btn-outline-primary me-2">Login</a>
        <a href="/register" class="btn btn-primary">Sign-up</a>
      </div>`;

  } else {
    nav += `
      <div class="col-md-3 text-end">
        <a href="/logout" class="btn btn-primary me-2">Logout</a>
      </div>`;
  }
  
  nav += `
      </header>
  </div>`;

  return nav;
}

function header() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="https://thumbs.gfycat.com/DisloyalSpiffyBlacklab-size_restricted.gif">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
    <title>Iago Senin</title>
  </head>
  <body>`;
}

function footer(){
  return `
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  </body>
  </html>`
}
module.exports = {
 navbar,
 footer,
 header
}
