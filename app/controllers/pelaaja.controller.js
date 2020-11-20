const Pelaaja = require("../models/pelaaja.model.js");

// Create and Save a new Pelaaja
exports.create = (req, res) => {
   // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pelaaja
  const pelaaja = new Pelaaja({  
    Id: req.body.Id,
    Sukunimi: req.body.Sukunimi,
    Etunimi: req.body.Etunimi,
    Pelinumero: req.body.Pelinumero,
    Joukkue_id: req.body.Joukkue_id,
  });

  // Save Pelaaja in the database
  Pelaaja.create(pelaaja, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pelaaja."
      });
    else res.send(data);
  });
};

// Retrieve all Pelaajas from the database.
exports.findAll = (req, res) => {
   Pelaaja.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pelaajat."
      });
    else res.send(data);
  });
};

// find specified pelaaja
exports.get = (req, res) => {
  Pelaaja.get(req.params.Id, (err, data) => {
   if (err) {
     if (err.kind === "not_found") {
       res.status(404).send({
         message: `Not found Pelaaja with id ${req.params.Id}.`
       });
     } 
   } else res.send(data);
 });
};


// Update a Pelaaja identified by the pelaajaId in the request
exports.update = (req, res) => {
   // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Pelaaja.update(
    req.body.Id,
    new Pelaaja(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pelaaja with id ${req.body.Id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pelaaja with id " + req.body.Id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pelaaja with the specified pelaajaId in the request
exports.delete = (req, res) => {
   Pelaaja.remove(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pelaaja with id ${req.params.Id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Pelaaja with id " + req.params.Id
        });
      }
    } else res.send({ message: `Pelaaja was deleted successfully!` });
  });
};