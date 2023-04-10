const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('strictQuery', false)

const port = 3000;

const start = async () => {
    await mongoose.connect('mongodb://127.0.0.1/philippine');
    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`)
      })
}

start();


