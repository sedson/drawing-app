const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DrawingSchema = new Schema({
  img: {type: String},
  title: {type: String},
  createdBy: {type: String},
  createdAt: {type: Number},  
})

const Drawing = mongoose.model('Drawing', DrawingSchema)

module.exports = Drawing
