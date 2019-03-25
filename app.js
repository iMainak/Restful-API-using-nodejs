const express = require("express");
const mongoose = require("mongoose")
const port = process.env.PORT || 3000;

const app = express();

// use bookRouter we can get the data and post the data
const bookRouter = require('./routes/bookRouter')()

// Use bodyParser for post data
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
      extended: true
}))
app.use(bodyParser.json())

//Connect mongoDB
const db = mongoose.connect('mongodb://localhost/bookAPI');

// 
app.use('/', bookRouter);
app.get('/', (req, res) => {
      res.send("Welcome to my NODEMON API");
})

// Start Server
app.listen(port, () => {
      console.log(`Running on port ${port}`)
})