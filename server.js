require('dotenv').config();

const express = require('express');
const app = express();

const session = require('express-session')

const mongoose = require('mongoose');

const selectedDB = process.env.DB || 'project';
const mongoURI = 'mongodb://127.0.0.1:27017/' + selectedDB;

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
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({extended: true}))

app.use(require('method-override')('_method'))

app.use(session({
  secret: "sec",
  resave: false,
   saveUninitialized: false
}))

const isAuthenticated = (req, res, next) => {
  if(req.session.currentUser) {
    return next();
  } else {
    // res.redirect('/sessions/new')
    return next();
  }
}


const drawings = require('./controllers/drawing')
app.use('/drawings', isAuthenticated, drawings)

const sessions = require('./controllers/session')
app.use('/sessions', sessions)

const user = require('./controllers/user')
app.use('/users', user)


const imageAPI = require('./controllers/image')
app.use('/img', imageAPI)

const Drawing = require('./models/drawing')


app.get('/', (req, res) => {
  Drawing.aggregate([ {$sample: {size: 1}} ], (err, sample) => {
    if (err) {
      return;
    }
    res.render('home.ejs', {
      id: sample[0]._id,
      currentUser: req.session.currentUser || null
    })
  })
})

app.get('/menu', (req, res) => {
  res.render('menu.ejs', {
    currentUser: req.session.currentUser || null
  })
})

app.get('/error', (req, res) => {
  res.render('error.ejs', {
    currentUser: req.session.currentUser || null,
    message: 'oops',
  })
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening -> http://localhost:${port}/drawings`)
})
