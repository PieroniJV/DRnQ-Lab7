const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Using mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.q42plqc.mongodb.net/?retryWrites=true&w=majority');
}

//Representation of a book object
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

//Instance of book 
const bookModel = mongoose.model('Books', bookSchema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/books', (req, res) => {
  console.log(req.body);
  //Adds book to database
  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })
  res.send('Data Recieved');
})

app.get('/api/books', (req, res) => {
  //retrive book data
  bookModel.find((error, data) => {
    res.json(data);
  })
})

//retrieving book by id from database
app.get('/api/books/:id', (req, res) => {
  console.log(req.params.id);

  bookModel.findById(req.params.id, (error, data)=>{
    res.json(data);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})