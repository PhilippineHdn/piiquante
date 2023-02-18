const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('strictQuery', false)


const port = 3000;

const start = async () => {
    const result = await mongoose.connect('mongodb://127.0.0.1/philippine');
    app.listen(port, async () => {
        console.log(`Example philippine's app listening on port ${port}`)
        const Schema = mongoose.Schema;
        const ObjectId = Schema.ObjectId;

        const schemaTest = new Schema({
        firstName: String,
        lastName: String,
        _id: ObjectId
        });
        const MyModel = mongoose.model('informations', schemaTest);
        const docs = await MyModel.find();
      })
}

start();


