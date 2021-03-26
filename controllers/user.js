const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Drawing = require('../models/drawing');

const hasher = require('../utils/hash');

module.exports = router;

router.get('/new', (req, res) => {
  res.render('user/new.ejs', {
    currentUser: req.session.currentUser || null
  });
})

router.get('/json', (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
})

router.post('/', (req, res) => {

  if (req.body.password !== req.body['confirm-password']) {
    res.render('error.ejs', {
      message: 'Passwords must match.',
      currentUser: req.session.currentUser || null
    });
    return;
  }

  const encrypted = hasher.hash(req.body.password);

  const newUser = {
    username: req.body.username,
    password: encrypted,
    color: req.body.color
  }

  User.create(newUser, (err, createdUser) => {
    if (err) {
      res.render('error.ejs', {
        message: err.message,
        currentUser: req.session.currentUser || null
      });
      return;
    }
    req.session.currentUser = createdUser;
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
