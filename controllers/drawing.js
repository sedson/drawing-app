const express = require('express');
const router = express.Router();

module.exports = router;

const Drawing = require('../models/drawing')

router.get('/', (req, res) => {
  Drawing.find({}, (err, data) => {
    if (err) return
    res.render('index.ejs', {data: data})
  })
})

router.get('/new', (req, res) => {
  res.render('new.ejs')
})



router.get('/:id/edit', (req, res) => {
  Drawing.findById(req.params.id, (err, data) => {
    res.render('edit.ejs', {item: data})
  })
})

router.post('/', (req, res) => {
  Drawing.create(req.body, (err, data) => {
    if(err){
      console.log(err.message)
    } else {
      console.log('nice')
      res.redirect('/drawings')
    }
  })
})

router.put('/:id', (req, res) => {
  Drawing.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if(err) console.log(err.message)
    // res.redirect('/drawings')
  })
})

router.delete('/:id', (req, res) => {
  Drawing.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) {
      console.log(err)
    }
    if(data) console.log('deleted')
    res.redirect('/drawings')
  })
})

router.get('/:id', (req, res) => {
  Drawing.findById(req.params.id, (err, data) => {
    res.render('show.ejs', {item: data})
  })
})
