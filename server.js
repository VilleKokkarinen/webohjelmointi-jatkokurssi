
const { v4: uuidv4 } = require('uuid');
const session = require('express-session')
const FileStore = require('session-file-store')(session);



const express = require("express");
const Handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const defaultPort = require("./app/config/portconfig.js");

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

// parsettaa json pyynnöt
app.use(bodyParser.json());

// parsettaa muut pyynnöt
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    genid: (req) => {
      return uuidv4() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'secretti',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  }))

// appi käyttää handlebar moottoria
app.set('view engine', 'handlebars');

app.engine('handlebars', Handlebars({
layoutsDir: __dirname + '/views/layouts',
}));

app.use(express.static('./public'))

app.get("/", (req, res) => {

    var session = req.session; // nykyinen sessio

    if (session.LOGGEDIN == true) { // jos käyttäjä oli jo kirjautunut sisään
        console.log('käyttäjä on kirjautunut sisään')
        res.render('football', { layout: 'index' });
      }
    else {
        console.log('käyttäjä ei ole kirjautunut sisään, kirjaudutaan sisään')
        session.LOGGEDIN = true; // "kirjaudutaan sisään" automaattisesti, jos ei ole
        res.redirect('/')
    }
});

app.get('/login', (req, res) => {
    console.log('käyttäjä kirjautuu sisään: ', req.sessionID)
    var session = req.session;
    session.LOGGEDIN = true;
    return res.send('kirjauduttu sisään');
  })

app.get('/logout', (req, res) => {
    console.log('käyttäjä kirjautuu ulos', req.sessionID)
    var session = req.session;
    session.LOGGEDIN = false;
    return res.send('kirjauduttu ulos');
})
// kuuntelee porttia
app.listen(defaultPort, () => {
  console.log(`Server is running on port ${defaultPort}`);
});
