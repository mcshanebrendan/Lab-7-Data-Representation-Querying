const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');


app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongoose code recieved from lab 7 pdf 
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

//async function
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.1lnehjk.mongodb.net/MYDB?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//book schema used for mongodb
const bookSchema = new mongoose.Schema({
  title:String,
  cover:String,
  author:String
})

//creates book model
const bookModel = mongoose.model('brendans_books', bookSchema);

app.post('/api/book', (req,res)=>{
    console.log(req.body);
  //creates book in mongo
    bookModel.create({title:req.body.title,
    cover:req.body.cover,
    author:req.body.author
  })
  //then and catch 
    .then(()=>{res.send("Book Created")})
    .catch(()=>{res.send("Book Not Created")})
    
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//asynchronous method
app.get('/api/books', async(req, res)=>{

  let books = await bookModel.find({});
  res.json(books);

})
//async method
//specifies book by id
app.get('/api/book/:id', async(req, res)=>{
console.log(req.params.id);

let book = await bookModel.findById(req.params.id);
res.send(book);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})