const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DrawingSchema = new Schema({
  img: String
})

const Drawing = mongoose.model('Drawing', DrawingSchema)

module.exports = Drawing
