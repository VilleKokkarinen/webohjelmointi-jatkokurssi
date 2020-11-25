
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
      console.log(req.sessionID)
      return uuidv4() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'secretti',
    resave: false,
    saveUninitialized: true
  }))


// appi käyttää handlebar moottoria
app.set('view engine', 'handlebars');

app.engine('handlebars', Handlebars({
layoutsDir: __dirname + '/views/layouts',
}));

app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.render('football', { layout: 'index', });
});

app.get('/login', (req, res) => { // luo keksin
    console.log(req.sessionID)
    res.redirect('/')
  })
  
app.post('/login', (req, res, next) => {
    req.login(user, (err) => {
    return res.send('session keksi luotu');
    })
(req, res, next);
})

app.get('/logout', (req, res) => {
    res.clearCookie('sessionID')
    return res.send('session keksi poistettu')
})
// kuuntelee porttia
app.listen(defaultPort, () => {
  console.log(`Server is running on port ${defaultPort}`);
});
