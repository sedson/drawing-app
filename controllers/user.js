const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Drawing = require('../models/drawing');

const colors = require('../utils/colors')

module.exports = router;

router.get('/new', (req, res) => {
  res.render('user/new.ejs', {
    colors: colors,
    currentUser: req.session.currentUser || null
  });
})

router.get('/json', (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
})

router.post('/', (req, res) => {
  User.create(req.body, (err, newUsr) => {
    if (err) {
      res.render('error.ejs', {
        message: err.message,
        currentUser: req.session.currentUser || null
      });
      return;
    }
    req.session.currentUser = newUsr;
    res.redirect('/drawings');
  });
})

router.get('/:user', (req, res) => {
  Drawing.find({createdBy: req.params.user }).sort({createdAt: -1}).exec((err, list) => {
    res.render('user/index.ejs', {
      data: list,
      user: req.params.user,
      currentUser: req.session.currentUser || null
    })
  })
})
