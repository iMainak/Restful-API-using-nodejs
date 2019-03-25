# ReST(Representational State Transfer)
It revolves around resource where every component is a resource and a resource is accessed by a common interface using HTTP standard methods.
*  A REST Server simply provides access to resources and REST client accesses and modifies the resources.
*  A RESTful web service usually defines a URL(Uniform Resource Identifier) a service, provides resource representation such as JSON and set of HTTP methods.

## Uniform Interface:
When you are dealing with an interface for a Restaful server, it will behave in a very sprcific way that is uniform from one service to the next.

## Express :
Express 3.x is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can then use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views.

**Mongoose** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
## Understand the code
```js
const express = require("express");
const mongoose = require("mongoose")
const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
/*
mongo bookAPI < booksJSON.js This going to create bookAPI data base in mongodb. 
*/
const db = mongoose.connect('mongodb://localhost/bookAPI');
const book = require("./model/bookModel")
bookRouter.route('/books')
      .get((req, res) => {
            book.find((err, books) => {
                  if (err) {
                        return res.send(err)
                  }
                  return res.json(books)

            })
});

app.use('/', bookRouter);
// routes
/* app.get('/',() =>{}) 
it means is every time I GET request to '/' and i am going to respond thorough a function and this function have two variables passed into it. One is req and another one is res.
suppose you open "localhost:4000/" then u get this message "Welcome to my NODEMON API"
*/ 
app.get('/', (req, res) => {
      res.send("Welcome to my NODEMON API");
})
// SERVER listen
app.listen(port, () => {
      console.log(`Running on port ${port}`)
})
```
## Query:

**Query for particular field**
"book.find" takes a parameter query it will filter the list based on whatever is in thhat javascript 
object. 
```js
bookRouter.route('/books')
      .get((req, res) => {
            const query = {"author":"yolo"}
            book.find(query, (err, books) => {
                  if (err) {
                        return res.send(err)
                  }
                  return res.json(books)

            })
});
```
**Query for anything by using URL**
"req.query" it takes the query string and creates an object out of it.  
```js
bookRouter.route('/books')
      .get((req, res) => {
            const query = req.query
            book.find(query, (err, books) => {
                  if (err) {
                        return res.send(err)
                  }
                  return res.json(books)

            })
});   
```
and now whatever you type into the URL(http://localhost:4000/books?author=yolo) is going be split into a javaScript object that we are passing into MongoDB.

**Getting a Single Item**
```js
bookRouter.route('/books/:id')
      .get((req, res) => {
            book.findById(req.params.id, (err, book) => {
                  if (err) {
                        return res.send(err)
                  }
                  return res.json(book)
            })
});
```
req.params contains route parameters (in the path portion of the URL), and req.query contains the URL query parameters (after the ? in the URL).

## Post Data:
**Post data using Body Parser**
"Body Parser", this Package allows you to use a series of middleware, which can decode data in different formats.
```js
app.use(bodyParser.urlencoded({extended:false}))
```
``{extended:false}`` is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays. The ectended version allows more data flexibility, but it is outmatched by JSON. 
```js
bookRouter.route('/books/post')
      .post((req,res) => {
            const Book = new book(req.body)
            Book.save() // Save the data in mongoDB
            return res.status(201).json(Book)
})
```
## Patch(Update the data):
```js
bookRouter.rote('/books/put')
      .patch((req,res) => {
            const {book} = req;
            if (req.body._id) {
                  delete req.body._id
            }
            Object.entries(req.body).forEach( item => {
                  const key = item[0];
                  const value = item[1];
                  book[key] = value;
            });
            req.book.save((err) =>{
                  if(err) {
                       return res.send(err)
                  }
                  return res.json(book)
            })
      })
```