const express = require('express');
const router = express.Router();

module.exports = router;

const Drawing = require('../models/drawing')

// INDEX –––––––––––––––––––––––––––––––––––
router.get('/', (req, res) => {
  Drawing.find({}, (err, data) => {
    if (err) return
    res.render('index.ejs', {data: data})
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
  res.render('new.ejs')
})


// EDIT ––––––––––––––––––––––––––––––––––––
router.get('/:id/edit', (req, res) => {
  Drawing.findById(req.params.id, (err, data) => {
    res.render('edit.ejs', {item: data})
  })
})

// CREATE / POST –––––––––––––––––––––––––––
router.post('/', (req, res) => {
  Drawing.create(req.body, (err, data) => {
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
  Drawing.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
    res.render('show.ejs', {item: data})
  })
})
