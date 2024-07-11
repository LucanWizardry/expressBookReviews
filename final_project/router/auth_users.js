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
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.params.review;
    const customer = req.session.accessToken; // get access token as customer username

    let bookReviews = books[isbn].reviews; // review array

    //check if isbn and review are provided
    if (isbn && review) {
        if (review) { // if review is not empty
            //update reviews
            bookReviews.push( {"customer":customer, 
                                "review":review } );
        } else {
            // error if review is empty
            return res.status(404).json({ message: 'Unable to input review' });
        }
        res.send(books[book]);
    } 
    else {
        //error statement if book doesn't exist
        return res.status(404).json({ message: 'Error inputting review.' });
    }
});

// delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.accessToken;

    isbn.forEach((review) => {
        if(books[isbn]){

        }
    })
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
