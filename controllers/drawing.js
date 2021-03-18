const express = require('express');
const router = express.Router();

module.exports = router;

const Drawing = require('../models/drawing')

// INDEX –––––––––––––––––––––––––––––––––––
router.get('/', (req, res) => {
  Drawing.find({}, (err, data) => {
    if (err) return
    res.render('drawing/index.ejs', {
      data: data,
      currentUser: req.session.currentUser
    })
  })
})

// JSON ––––––––––––––––––––––––––––––––––––
router.get('/json', (req, res) => {
  Drawing.find({}, '-img', (err, data) => {
    res.json(data);
  })
})

// NEW –––––––––––––––––––––––––––––––––––––
router.get('/new', (req, res) => {
  res.render('drawing/new.ejs', {
    currentUser: req.session.currentUser
  })
})


// EDIT ––––––––––––––––––––––––––––––––––––
router.get('/:id/edit', (req, res) => {
  Drawing.findById(req.params.id, (err, data) => {
    res.render('drawing/edit.ejs', {
      item: data,
      currentUser: req.session.currentUser
    })
  })
})

// CREATE / POST –––––––––––––––––––––––––––
router.post('/', (req, res) => {

  if (! req.session.currentUser) {
    res.status(400).send();
    return;
  }
  console.log(req.body.title);

  const newDrawing = {
    img: req.body.img,
    title: req.body.title,
    createdBy: req.session.currentUser.username,
    createdAt: Date.now(),
    color: req.session.currentUser.color,
    editLog: []
  }

  Drawing.create(newDrawing, (err, data) => {
    if(err){
      console.log(err.message)
    } else {
      console.log('Create - Success')
      res.status(200).send()
    }
  })
})

// UPDATE ––––––––––––––––––––––––––––––––––
router.put('/:id', (req, res) => {

  if (! req.session.currentUser) {
    res.status(400).send();
    return;
  }

  const newEdit = {
    editedBy: req.session.currentUser.username,
    editedAt: Date.now(),
    editColor: req.session.currentUser.color
  }

  const updateOperation = {
    $set: {
      img: req.body.img
    },
    $push: {
      editLog: newEdit
    }
  }



  Drawing.findByIdAndUpdate(req.params.id, updateOperation, (err, data) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log('Put - Success')
      res.status(200).send()
    }
  })
})

// DELETE ––––––––––––––––––––––––––––––––––
router.delete('/:id', (req, res) => {
  Drawing.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) {
      console.log(err)
    }
    if(data) console.log('deleted')
    res.redirect('/drawings')
  })
})

// SHOW ––––––––––––––––––––––––––––––––––––
router.get('/:id', (req, res) => {
  Drawing.findById(req.params.id, (err, data) => {
    res.render('drawing/show.ejs', {
      item: data,
      currentUser: req.session.currentUser
    })
  })
})
