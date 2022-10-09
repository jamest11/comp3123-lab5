const express = require('express');
const fs = require('fs');
const app = express();
const router = express.Router();

const PORT = 8081;

/*
- Create new html file name home.html 
- add <h1> tag with message 'Welcome to ExpressJs Tutorial'
- Return home.html page to client
*/
router.get('/home', (req,res) => {
    res.sendFile( __dirname + '/' + 'home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
    const user = JSON.parse(fs.readFileSync('user.json'));
    res.send(user)
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  password is valid then send response as below 
    {
        status: true,
        message: 'User Is valid'
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: 'User Name is invalid'
    }
- If password is invalid then send response as below 
    {
        status: false,
        message: 'Password is invalid'
    }
*/
router.get('/login', (req, res) => {
    const user = JSON.parse(fs.readFileSync('user.json'));
    const username = user['username'];
    const password = user['password'];
    let response = null;

    if(req.query.username != username) {
        response = {
            state: false,
            message: 'Username is invalid'
        }
    }
    else if(req.query.password != password) {
        response = {
            state: false,
            message: 'Password is invalid'
        }
    }
    else {
        response = {
            state: true,
            message: 'Login is valid'
        }
    }
    res.send(response)
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
    res.send(`<!DOCTYPE html><h1>${req.params.username} successfully logged out</h1>`);
});

app.use('/', router);

app.listen(process.env.port || PORT);

console.log('Web Server is listening at port '+ (process.env.port || PORT));