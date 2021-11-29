const express = require('express');
const UserController = require('../controllers/User.controller');

const router = express.Router();

router.get('/login/:error?', UserController.login)
      .post('/login', UserController.check, UserController.find, UserController.log)
      
      .get('/register/:error?', UserController.register)
      .post('/register', UserController.check, UserController.userExists, UserController.create)

      // .get('/update/:key/:value/:error?', UserController.find, UserController.updateUser)
      // .post('/update/:key/:value', UserController.check, UserController.update)
      
      // .get('/delete', UserController.find, UserController.deleted)

      .get('/logout', UserController.logout)

module.exports = router;