const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./src/helpers/file_upload');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./src/services/passport')(passport);

const users = require('./src/routes/users');
app.use('/api/users', users);

const home = require('./src/routes/home');
app.use('/api/home', home);

const homeBasedProgram = require('./src/routes/home_based_program');
app.use('/api/homeBasedProgram', homeBasedProgram);

const aboutUs = require('./src/routes/about_us');
app.use('/api/aboutUs', aboutUs);

const school = require('./src/routes/school');
app.use('/api/schools', school);

const center = require('./src/routes/center');
app.use('/api/centers', center);

const db = require('./src/config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('successfully connected to database...'))
  .catch((err) => console.log('error occurred while connecting to database', err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;

app.get('/hello', (req, res) => {
  res.json({msg: "hello"});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
