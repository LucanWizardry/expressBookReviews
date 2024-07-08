/*
  Routs with a general user can access
*/

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();


// Register a new user
public_users.post("/register", (req,res) => {
    // practice project, index.js lines 88-106
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "Customer successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "Customer account already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register customer."});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //referencing practice project exercise 2, friends.js lines 12-18
    res.send(JSON.stringify(books,null,4));
});


//practice project, friends.js lines 20-27
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const book = req.params.isbn;

    //include IF statement in case there's an error and it can't find the book
    if (book) {
        res.send(books[book]);
    } else {
        res.send('${book} not in library.');
    }
 });
  

// practice project, index.js lines 22-34
// reference forum: https://www.coursera.org/learn/developing-backend-apps-with-nodejs-and-express/discussions/weeks/4/threads/hGZORAUAEe643RLITiuXsw/replies/0a_7uwXNEe65SQ6UWPAg1Q/comments/ymg7fQUTEe6o_Q5C2YUKMw

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let booksByAuthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
        if(books[isbn]["author"] === req.params.author) {
            booksByAuthor.push({"isbn":isbn,
                                "title":books[isbn]["title"],
                                "reviews":books[isbn]["reviews"]});
        }
        });
    res.send(JSON.stringify({booksByAuthor}, null, 4));
  });


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const bookTitle = req.params.title;
    let isbn = Object.keys(books);
    let booksByTitle = [];

    isbn.forEach((isbn) => {
        if(books[isbn]["title"] === bookTitle) {
            booksByTitle.push( {"isbn":isbn,
                                "title":books[isbn]["title"],
                                "author":books[isbn]["author"]});
        }
    });

    //check if array is empty
    if (booksByTitle.length > 0){
        res.send(JSON.stringify({booksByTitle}, null, 4));
    } else {
        res.send('No books by that title in database');
    }
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    if (isbn) {
        res.send(books[isbn].reviews);
    }
    else {
        res.send('No reviews written.');
    }
});


module.exports.general = public_users;
