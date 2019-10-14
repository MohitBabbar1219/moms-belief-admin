const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./src/config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('successfully connected to database...'))
  .catch((err) => console.log('error occurred while connecting to database', err));

const PORT = process.env.PORT || 4000;

app.post('/hello', (req, res) => res.json({msg: req.body.data.msg}));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
