const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth'); 
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World my friends!')
  })

app.use('/api/auth', authRoute);

module.exports = app;