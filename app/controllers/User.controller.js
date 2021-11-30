const User = require('../models/User');
const view = require('../views/users.view');

/**********************************************************
 *                        FIND                            *
 **********************************************************/
function find(req, res, next){
  if(req.body.user) {
    User.find(req.body.user)
    .then(users => {
      if(users.length){
        req.body.users = users;
        next();

      } else {
        req.body.error = err;
        next();
      }
    })
    .catch(err =>{
      req.body.error = err;
      next();
    });

  } else {
    User.find({})
    .then(users => {
      if(users.length == 1){
        req.body.users = users;
        next();

      } else {
        next();
      }
    })
    .catch(err =>{
      req.body.error = err;
      next();
    });
  } 
}

/**********************************************************
 *                        CHECK                           *
 **********************************************************/
function check(req, res, next){
  let data = {}

  if(!req.body.login){
    if(!req.body.name || req.body.name.trim() == ''){
      req.body.error = 'err';
      next();
    } else {
      data['name'] = req.body.name;
    }
  }

  if(!req.body.email || req.body.email.trim() == ''
  || !req.body.password || req.body.password.trim() == ''){
    req.body.error = 'err';
    next();

  } else {
    // comprobar email

    // hash de la contraseña

    data['email'] = req.body.email;
    data['password'] = req.body.password;

    req.body.user = data;
    next();
  }
}

/**********************************************************
 *                        LOGIN                           *
 **********************************************************/
function log(req, res, next){
  if(req.body.error){
    res.redirect('/login/error');

  } else {
    // crear cookie
    res.cookie('sesion' , req.body.user['email'], {expire : new Date() + 9999});

    res.redirect('/');
  }
}

function login(req, res, next){
  if(req.params.error){
    res.send(view.login(true));

  } else {
    res.send(view.login());
  }
}

/**********************************************************
 *                       REGISTER                         *
 **********************************************************/
 function register(req, res, next){
  if(req.params.error){
    res.send(view.register(true));

  } else {
    res.send(view.register());
  }
}

function userExists(req, res, next){
  User.find(req.body.user)
    .then(users => {
      if(users.length){
        req.body.exists = true;
        next();

      } else {
        req.body.dExists = true;
        next();
      }
    })
    .catch(err =>{
      req.body.error = err;
      next();
    });
}

function create(req, res, next){
  if(req.body.exists || req.body.error) {
    res.redirect('/register/error');

  } else if (req.body.dExists){
    let user = new User(req.body.user);

    user.save()
      .then(user => 
        res.status(201).redirect('/login')
      )
      .catch(err => res.status(500).send({err}));
  }
}

/**********************************************************
 *                        LOGOUT                          *
 **********************************************************/
function logout(req, res){
  // eliminar la cookie
  res.clearCookie('sesion');
  
  res.redirect('/');
}

/* function deleted(req, res, next){

} */



module.exports = {
  find,
  check,
  log,
  login,
  create,
  register,
  /* deleted, */
  logout,
  userExists,
}