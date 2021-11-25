const view = require('../views/index.view');

function index(req, res){
  res.send(view.index());
}

module.exports = {
  index,
}