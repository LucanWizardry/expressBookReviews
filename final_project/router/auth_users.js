/* 

Routes that an authorized user can access


*/

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let customer = [];

const isValid = (username)=>{ //returns boolean
  // write code to check is the username is valid
  // same functionality as the doesExist function in the practice project, lines 8-20 on index.js

  // filter user array for any users with the same username
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


//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
