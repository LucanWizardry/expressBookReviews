/* 
  Routes that an authorized user can access
*/

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js"); // books array
const regd_users = express.Router();

let users = [];

// validate username
// practice project index.js, lines 8-20
const isValid = (username) => { //returns boolean

    // filter customers array for any users with the same username
    let userswithname = users.filter((user) => {
        return user.username === username;
    }); 

    // return true if username is found, otherwise false
    if(userswithname.length > 0){
        return true;
    } else {
        return false;
    }  
}

// validate username and password
// practice project index.js, line 22-34
const authenticatedUser = (username,password) => { //returns boolean

    // filter users array for matching username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    // return true if user found, otherwise return false
    if(validusers.length > 0){
    return true;
    } else {
    return false;
  }
}


// Only registered users can login
// practice project, index.js lines 61-86
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("Customer successfully logged in");
    } 
    else {
        return res.status(208).json({ message: "Invalid Login. Check username and password." });
    }
});


// Add a book review
// Practice project, friends.js lines 43-73
// referenced discussion forum: https://www.coursera.org/learn/developing-backend-apps-with-nodejs-and-express/discussions/forums/6ceCzmdZEe2BdBJXrx375w/threads/mrUhSuO5Ee2f_gpjj07RGQ
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let book = books[isbn]; // fetch book within array
    let review = req.query.review;
    const customer = req.session.authorization['username']; // get username

    
    if (isbn) { // if isbn can be found
        if (review) { // if review is valid
            //update review
            book['reviews'][customer] = review;
            books[isbn] = book;
            res.send('Review has been added for book ${isbn}');
        } else {
            // error if review is empty
            return res.status(404).json({ message: 'Unable to input review: ${review}' });
        }
    } 
    else {
        //error statement if book doesn't exist
        return res.status(404).json({ message: 'Book ${isbn} cannot be found' });
    }
});


// delete a book review
// practice project friends.js, lines 76-90
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let book = books[isbn];
    const customer = req.session.authorization['username']; // get username

    delete book['reviews'][customer];

    res.send('Review deleted.');
});
  


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
