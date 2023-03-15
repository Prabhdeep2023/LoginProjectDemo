var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/", (req, res) => {
    res.render("register");
})

router.post("/auth", (req, res) => {
    const { name, email, password, password_confirm } = req.body;

    if(name.trim().length == 0 || email.trim().length == 0 || password.length == 0) {
        return res.render('register', { message: 'Please fill all the fields!' })
    }
    else if(password !== password_confirm) {
        return res.render('register', { message: 'Passwords do not match!' })
    }
    else {
        db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
            if(error){
                console.log(error)
            }
            if( result.length > 0 ) {
                return res.render('register', { message: 'This email is already in use' })
            }
    
            db.query('INSERT INTO users SET ?', {name: name, email: email, password: password}, (error, results) => {
                if(error) {
                    console.log(error)
                }
                else {
                    return res.render('register', { message: 'User registered!' })
                }
            })
        })
    }
})

module.exports = router;