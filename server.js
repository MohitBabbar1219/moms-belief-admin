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

const aboutUs = require('./src/routes/about_us');
app.use('/api/about_us', aboutUs);

const center = require('./src/routes/center');
app.use('/api', center);

const db = require('./src/config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('successfully connected to database...'))
  .catch((err) => console.log('error occurred while connecting to database', err));

const PORT = process.env.PORT || 4000;

app.post('/hello', upload.array('centers', 4), (req, res) => {
  console.log(req.files);
  res.json({msg: req.body.msg});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
