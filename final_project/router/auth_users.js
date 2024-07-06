/* 
  Routes that an authorized user can access
*/

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js"); // books array
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    // same functionality as the doesExist function in the practice project, lines 8-20 on index.js

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


const authenticatedUser = (username,password)=>{ //returns boolean
    // write code to check if username and password match the one we have in records.
    // same functionality as authenticatedUser function in practice project, line 22-34

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
    let book = books[isbn];

    if (book) { //check if book exists
        let title = req.body.title;

        if (review) { //update reviews
            book[review] = review;
        }
        res.send('${review} has been added to the book, ${title}.');
    } 
    else {
        //error statement if 
        res.send('Unable to find book with isbn ${isbn}');
    }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
