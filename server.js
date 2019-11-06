const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./helpers/fileUpload');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./services/passport')(passport);

const users = require('./routes/users');
app.use('/api/users', users);

const home = require('./routes/home');
app.use('/api/home', home);

const homeBasedProgram = require('./routes/homeBasedProgram');
app.use('/api/homeBasedProgram', homeBasedProgram);

const aboutUs = require('./routes/aboutUs');
app.use('/api/aboutUs', aboutUs);

const school = require('./routes/school');
app.use('/api/schools', school);

const center = require('./routes/center');
app.use('/api/centers', center);

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('successfully connected to database...'))
  .catch((err) => console.log('error occurred while connecting to database', err));

const PORT = process.env.PORT || 4000;

app.get('/hello', (req, res) => {
  res.json({msg: "hello"});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
