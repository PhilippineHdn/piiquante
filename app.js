const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./routes/auth'); 
const sauceRoute = require('./routes/sauce');


const app = express();

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use('/api/auth', authRoute);
app.use('/api/sauces', sauceRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: "This route doesn't exist" })
});

module.exports = app;