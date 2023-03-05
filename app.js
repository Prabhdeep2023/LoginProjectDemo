const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
var cookieParser = require('cookie-parser');
var sessions = require('express-session');
var sessionvar;

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(sessions({
    secret : 'loginapp',
    resave : true,
    saveUninitialized : true
  }))
app.use(cookieParser());

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL successfully connected!")
    }
})

app.set('view engine', 'hbs');
const path = require('path');
const publicdir = path.join(__dirname, './public');
app.use(express.static(publicdir));

app.listen(5000, () => {
    console.log()
})

app.get("/", (req, res) => {
    sessionvar = req.session;
    if (sessionvar.user_id)
        res.render("dashboard", { session: sessionvar });
    else
        res.render("index",  { session: req.session });
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/auth/register", (req, res) => {
    const { name, email, password, password_confirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }
        if( result.length > 0 ) {
            return res.render('register', { message: 'This email is already in use' })
        }
        else if(password !== password_confirm) {
            return res.render('register', { message: 'Passwords do not match!' })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
            if(error) {
                console.log(error)
            }
            else {
                return res.render('register', { message: 'User registered!' })
            }
        })
    })
})

app.post('/auth/login', function(request, response) {
    var user_email_address = request.body.email;
    var user_password = request.body.password;
  
    if (user_email_address && user_password)
    {
      query = `Select * from users where email = "${user_email_address}"`;
      db.query(query, async (error, data) => {
        if (data.length > 0)
        {
            let passwordMatch = await bcrypt.compare(user_password, data[0].password);
            if(passwordMatch)
            {
                sessionvar = request.session;
                sessionvar.user_id = data[0].id;
                sessionvar.name = data[0].name;
                response.render("dashboard", { session: request.session });
            }
            else
            {
                return response.render('login', { errormessage: 'Incorrect password!' })
            }
        }
        else
        {
            return response.render('login', { errormessage: 'Incorrect email address!' })
        }
          //response.end();
      });
    }
    else
    {
        return res.render('login', { errormessage: 'Please enter email address and password.' })
    }
  });

  app.get('/logout', function(request, response, next){
    request.session.destroy();
    response.redirect("/");
  });