const express = require('express');
var cookieParser = require('cookie-parser');
var sessions = require('express-session');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var dashboardRouter = require('./routes/dashboard');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(sessions({
    secret : 'loginapp',
    resave : true,
    saveUninitialized : true
  }))
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', dashboardRouter);

app.set('view engine', 'hbs');
const path = require('path');
const publicdir = path.join(__dirname, './public');
app.use(express.static(publicdir));

app.listen(7123, () => {
    console.log();
})

module.exports = app;