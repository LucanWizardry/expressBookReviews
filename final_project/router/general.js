const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();


public_users.post("/register", (req,res) => {

  //same as friends.js POST request, lines 30-43

  if (req.body.email) {
    // Create or update friend's details based on provided email
    friends[req.body.email] = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "DOB": req.body.DOB
    };
  }
  // Send response indicating user addition
  res.send("The user" + (' ') + (req.body.firstName) + (' ') + (req.body.lastName) + " Has been added!");

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //referencing practice project exercise 2, friends.js lines 12-18
  res.send(JSON.stringify(books,null,10));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //practice project, friends.js lines 20-27
  const book = req.params.isbn;
  res.send(books[book]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const authorName = req.params.author;
  res.send(books[authorName]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const bookTitle = req.params.title;
  res.send(books[bookTitle]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
