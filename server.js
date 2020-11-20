
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

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', Handlebars({
layoutsDir: __dirname + '/views/layouts',
}));

app.use(express.static('./public'))

app.get("/", (req, res) => {

    const alasvetovalikko = [ //mieluusti hakisi jostain eikä kovakoodattu :)
        {
            text:'eka',
        },
        {
            text:'toka',
        },
        {
            text:'kolmas',
        },
        {
            text:'neljäs',
        },
        {
            text:'viides',
        }
    ]

    const seurTapaht= [
        {
            date: '28.10.2018',
            text: 'Suomi-Unkari miesten maaottelu'
        },
        {
            date: '01.11.2018',
            text: 'Futsal turnaus Kuopiossa'
        },
        {
            date: '12.11.2018 ',
            text: 'Kauden päättäjäiset Keskuskentällä'
        },
        {
            date: '28.11.2018',
            text: 'Pikkujoulut'
        }
    ]

    res.render('football', { layout: 'index', options: alasvetovalikko, tapahtumat: seurTapaht });
});

require("./app/routes/pelaaja.routes.js")(app);
require("./app/routes/joukkue.routes.js")(app);
require("./app/routes/sarjataulu.routes.js")(app);


// set port, listen for requests
app.listen(defaultPort, () => {
  console.log(`Server is running on port ${defaultPort}`);
});
