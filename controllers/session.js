const express = require('express');
const router = express.Router();
const User = require('../models/user');

const hasher = require('../utils/hash');

module.exports = router;

// Sign In –––––––––––––––––––––––––––––––––
router.get('/new', (req, res) => {
  res.render('session/new.ejs', { currentUser: req.session.currentUser });
})

// Attemp to begin new session ––––––––––––
router.post('/', (req, res) => {

  User.findOne({username: req.body.username}, (err, user) => {

    if (err) {
      res.render('error.ejs', {
        message: err.message,
        currentUser: req.session.currentUser || null
      })
      return;
    }

    if(! user){
      res.render('error.ejs', {
        message: 'No user found',
        currentUser: req.session.currentUser || null
      })
      return;
    }

    if (hasher.verify(user.password, req.body.password)) {
      req.session.currentUser = user;
      res.redirect('/drawings')

    } else {
      res.render('error.ejs', {
        message: 'Invalid Password',
        currentUser: req.session.currentUser || null
      })
    }
  })
})

// Log Out –––––––––––––––––––––––––––––––––
router.get('/end', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/drawings')
  })
})
