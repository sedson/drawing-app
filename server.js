require('dotenv').config();

const express = require('express');
const app = express();

const session = require('express-session')

const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/project2';

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


app.get('/', (req, res) => {
  console.log(req.session)
  res.render('home.ejs', {currentUser: req.session.currentUser})
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening -> http://localhost:${port}/drawings`)
})
