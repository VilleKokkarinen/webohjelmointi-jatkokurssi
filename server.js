
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


// appi käyttää handlebar moottoria
app.set('view engine', 'handlebars');

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

    //renderöi aloitussivun, aloitustiedoilla
    res.render('football', { layout: 'index', options: alasvetovalikko, tapahtumat: seurTapaht });
});

//requiraa nuo restin pyynnöt
require("./app/routes/pelaaja.routes.js")(app);
require("./app/routes/joukkue.routes.js")(app);
require("./app/routes/sarjataulu.routes.js")(app);

// kuuntelee porttia
app.listen(defaultPort, () => {
  console.log(`Server is running on port ${defaultPort}`);
});
