// Small API to send image data through HTTP request
// Grabs the base64 png string from mongo and sends it as a buffer
// Thanks to Ben Damient on this Stack Overflow thread
// https://stackoverflow.com/questions/28440369/rendering-a-base64-png-with-express

const express = require('express')
const router = express.Router();

module.exports = router;

const Drawing = require('../models/drawing')

// GET IMAGE –––––––––––––––––––––––––––––––
router.get('/:id', (req, res) => {

  Drawing.findById(req.params.id, (err, data) => {
    if (err) {
      console.log (err.message);
      return;
    }

    if (! data.img) return;

    let imgDataUrl = data.img;


    // strip the data URL header
    imgDataUrl = imgDataUrl.split('base64,')[1];

    let imgOut = Buffer.from(imgDataUrl, 'base64');

    // console.log(imgOut.length / 1e6);

    res.writeHead(200, {
      'Content-Type' : 'image/png',
      'Contnent-Length' : imgOut.length
    });
    res.end(imgOut)
  })
})
