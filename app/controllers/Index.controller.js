const view = require('../views/index.view');

function index(req, res){
  if(req.cookies.sesion){
    res.send(view.index(true));
  } else {
    res.send(view.index(false));
  }
}

module.exports = {
  index,
}