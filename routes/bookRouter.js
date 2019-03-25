const express = require("express");

function routes() {
    const bookRouter = express.Router()
    const book = require("../model/bookModel")
    //Get and query
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
    //Post && Save data
    bookRouter.route('/books')
        .post((req, res) => {
            const Book = new book(req.body)
            Book.save()
            return res.status(201).json(Book)
        })
    // middleware to find book by id and call this one for every put or get the data      
    bookRouter.use('/books/:id', (req, res, next) => {
        book.findById(req.params.id, (err, book) => {
            if (err) {
                return res.send(err)
            }
            if (book) {
                req.book = book;
                return next()
            }
            return res.sendStatus(404)
        })
    })

    bookRouter.route('/books/:id')
        .get((req, res) => res.json(req.book))
        // Put
        .put((req, res) => {
            const {
                book
            } = req
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;

            book.save()
            return res.json(book)

        })

        // Update
        .patch((req, res) => {
            const {book} = req;
            // Check the id exist or not if it is then delete this id
            if (req.body._id) {
                delete req.body._id
            }
            // update only one key.
            Object.entries(req.body).forEach(item => {
                const key = item[0];
                const value = item[1];
                book[key] = value
            });
            // save this to mongoDB
            req.book.save((err) => {
                if (err) {
                    return res.send(err)
                }
                return res.json(book)
            })

        })
    return bookRouter
}

module.exports = routes;