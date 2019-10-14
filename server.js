const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.post('/hello', (req, res) => res.json({msg: req.body.data.msg}));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
