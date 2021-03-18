const express = require('express');
const router = express.Router();

const User = require('../models/user');

module.exports = router;

router.get('/new', (req, res) => {
  res.render('user/new.ejs', {
    currentUser: req.session.currentUser || null
  })
})

router.get('/json', (req, res) => {
  User.find({}, (err, data) => {
    res.json(data)
  })
})

router.post('/', (req, res) => {
  User.create(req.body, (err, newUsr) => {
    if (err) {
      res.render('error.ejs', {message: err.message})
      return;
    }
    console.log(`User: ${newUsr.username} added to db!`)
    res.redirect('/drawings')
  })
})
