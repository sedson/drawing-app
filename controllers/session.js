const express = require('express');
const router = express.Router();
const User = require('../models/user')

module.exports = router;

router.get('/new', (req, res) => {
  res.render('session/new.ejs', { currentUser: req.session.currentUser });
})

router.post('/', (req, res) => {
  console.log(req.body)
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      res.render('error.ejs', {message: err.message})
      return;
    }

    if(! user){
      res.render('error.ejs', {message: 'No user found'})
      return;
    }

    if(req.body.password === user.password){
      req.session.currentUser = user;
      console.log(req.session)
      res.redirect('/drawings')

    } else {
      res.render('error.ejs', {message: 'Invalid Password'})
    }
  })
})

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/drawings')
  })
})
