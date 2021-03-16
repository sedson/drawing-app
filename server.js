require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/project';

const db = mongoose.connection;

const mongooseOpts = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongoURI, mongooseOpts);

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")})
db.on('disconnected', ()=> { console.log("mongo disconnected")})



// MIDDLEWARE
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('method-override')('_method'))


const drawingsRoutes = require('./controllers/drawing')
app.use('/drawings', drawingsRoutes)



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening -> http://localhost:${port}/drawings`)
})
