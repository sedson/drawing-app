const mongoose = require('mongoose')
const Schema = mongoose.Schema

const editSchema = new Schema({
  editedBy: String,
  editedAt: Number,
  editColor: String,
})

const DrawingSchema = new Schema({
  img: {type: String},
  title: {type: String},
  createdBy: {type: String},
  createdAt: {type: Number},
  color: {type: String},
  editsLocked: {type: Boolean, default: false},
  editLog: [editSchema]
})


const Drawing = mongoose.model('Drawing', DrawingSchema)

module.exports = Drawing
