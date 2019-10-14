const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/hello', (req, res) => res.json({msg: "hello"}));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
