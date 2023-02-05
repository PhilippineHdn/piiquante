const express = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World my friends!')
})

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
        MyModel.find({}, function (err, docs) {
            console.log(docs)
          });
      })
}

start();


