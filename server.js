// Dependencies
const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const db= require('./db.js'); 

// Initialize Express
const app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:true}));

//uses sesion for cookies
app.use(session({
    secret:'password'
    // resave: true,
    // saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create connection
if (process.env.JAWSDB_URL) {
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 8889,
        user: "root",
        password: "root",
        database: "nps_db"
    });
}

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/select", function(req, res) {

    connection.query("SELECT * FROM selections;", function(err, data) {
        if (err) {
            return res.status(500).end();
        } else {
            // let html = buildCheck(data);
            // res.send(html);
        }
        res.json(data);
    });
});

app.put("/checked/:id", function(req, res) {
    connection.query("UPDATE selections SET checked = ? WHERE id = ?", [req.body.checked, req.body.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        }
        else if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

//auth server recator to clay's work
// Start the server


//uses sesion for cookies
app.use(session({
    secret:'password'
    // resave: true,
    // saveUninitialized: true
}));

//specifies what folder to use for express


app.get('/', function(req, res) {
    res.render('home', {
        title : "Home"
    });
});

app.get('/dashboard',isAuthenticated,function(req, res,next) {
    res.render('dashboard', {
        title : "Dashboard"
    });
});




//need to refactor for this project
app.post('/auth/register',function(req,res,next){ 
        console.log(req.body);
        var hashedPw=bcrypt.hashSync(req.body.password,10);
        db.users.create({username:req.body.username,email:req.body.email,password:hashedPw})
        .then(function(user){
            console.log(user);
            res.json({username:req.body.username,URL:'dashboard'}); ///res.json sends it back to front end 
        }).catch(function(err){
            console.log(err);
        });
});
// passport.authenticate('local'); endpoint will only run if logged in
app.post('/auth/login',passport.authenticate('local'),function(req,res,next){
    req.isAuthenticated();
    res.json({URL:'/dashboard'}); //telling window.location where to route to
});


//isAuthenticated is used to ask if user is logged in or not
function isAuthenticated(req,res,next){
    if(req.isAuthenticated(req)){
        console.log(req);
        next();
    }else{
        res.redirect("/login");
    }
}

app.get('/auth/logout', function (req, res) {
    res.json({URL:'/'});
    req.logout();
});
 


//coodinate port with original project port

var PORT = process.env.PORT || 3000;

app.listen(PORT,function(){ 
 console.log(`listening on port ${PORT}..`);
});