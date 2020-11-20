const Sarjataulu = require("../models/sarjataulu.model.js");

// Create and Save a new Sarjataulu
exports.create = (req, res) => {
   // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Sarjataulu
  const sarjataulu = new Sarjataulu({  
    Id: req.body.Id,
    Joukkue_id: req.body.Joukkue_id,
    Ottelumaara: req.body.Ottelumaara,
    Voittoja: req.body.Voittoja,
    Tappioita: req.body.Tappioita,
    Tasapeleja: req.body.Tasapeleja,
    Tehdyt_maalit: req.body.Tehdyt_maalit,
    Paastetut_maalit: req.body.Paastetut_maalit,
    Pisteet: req.body.Pisteet,
  });

  // Save Sarjataulu in the database
  Sarjataulu.create(sarjataulu, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sarjataulu."
      });
    else res.send(data);
  });
};

// Retrieve all Sarjataulus from the database.
exports.findAll = (req, res) => {
   Sarjataulu.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sarjataulut."
      });
    else res.send(data);
  });
};

// find specified sarjataulu
exports.get = (req, res) => {
  Sarjataulu.get(req.params.Id, (err, data) => {
   if (err) {
     if (err.kind === "not_found") {
       res.status(404).send({
         message: `Not found Sarjataulu with id ${req.params.Id}.`
       });
     } 
   } else res.send(data);
 });
};


// Update a Sarjataulu identified by the sarjatauluId in the request
exports.update = (req, res) => {
   // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Sarjataulu.update(
    req.body.Id,
    new Sarjataulu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Sarjataulu with id ${req.body.Id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Sarjataulu with id " + req.body.Id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Sarjataulu with the specified sarjatauluId in the request
exports.delete = (req, res) => {
   Sarjataulu.remove(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sarjataulu with id ${req.params.Id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Sarjataulu with id " + req.params.Id
        });
      }
    } else res.send({ message: `Sarjataulu was deleted successfully!` });
  });
};