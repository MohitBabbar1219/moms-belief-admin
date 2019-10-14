const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./src/helpers/file_upload');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'src/public')));

app.use(passport.initialize());
require('./src/services/passport')(passport);

const users = require('./src/routes/users');
app.use('/api/users', users);

const db = require('./src/config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('successfully connected to database...'))
  .catch((err) => console.log('error occurred while connecting to database', err));

const PORT = process.env.PORT || 4000;

app.post('/hello', upload.single('testimonialImage'), (req, res) => {
  console.log(req.file);
  res.json({msg: req.body.msg});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
