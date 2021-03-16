const express = require('express');
const router = express.Router();

const fs = require('fs')
const path = require('path')
const imageDataURI = require('image-data-uri')

module.exports = router;

const DrawingModel = require('../models/drawing')

router.get('/', (req, res) => {
  DrawingModel.find({}, (err, data) => {
    if (err) return
    res.render('index.ejs', {data: data})
  })
})

router.get('/new', (req, res) => {
  res.render('new.ejs')
})



router.get('/:id/edit', (req, res) => {
  DrawingModel.findById(req.params.id, (err, data) => {
    res.render('edit.ejs', {item: data})
  })
})

router.post('/', (req, res) => {
  // const imageData = req.body.img.split('base64,')[1]
  // DrawingModel.create({}, (err, data) => {
  //   if (err) {
  //     console.log(err.message)
  //   }
  //   if (data) {
  //     const parentDir = path.resolve(__dirname, '..')
  //     const fileName = `${parentDir}/images/${data._id}.png`;
  //     imageDataURI.outputFile(req.body.img, fileName)
  //   }
  // })

  DrawingModel.create(req.body, (err, data) => {
    if(err){
      console.log(err.message)
    } else {
      console.log('nice')
      res.redirect('/drawings')
    }
  })
})

router.put('/:id', (req, res) => {
  DrawingModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if(err) console.log(err.message)
    // res.redirect('/drawings')
  })
})

router.delete('/:id', (req, res) => {
  DrawingModel.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) {
      console.log(err)
    }
    if(data) console.log('deleted')
    res.redirect('/drawings')
  })
})

router.get('/:id', (req, res) => {
  DrawingModel.findById(req.params.id, (err, data) => {
    res.render('show.ejs', {item: data})
  })
})
