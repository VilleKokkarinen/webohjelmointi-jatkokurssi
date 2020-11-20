const Joukkue = require("../models/joukkue.model.js");

// Create and Save a new Joukkue
exports.create = (req, res) => {
   // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Joukkue
  const joukkue = new Joukkue({  
    Id: req.body.Id,
    Nimi: req.body.Nimi,
    Kaupunki: req.body.Kaupunki,
    Perustamisvuosi: req.body.Perustamisvuosi,
  });

  // Save Joukkue in the database
  Joukkue.create(joukkue, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Joukkue."
      });
    else res.send(data);
  });
};

// Retrieve all Joukkueet from the database.
exports.findAll = (req, res) => {
   Joukkue.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving joukkuet."
      });
    else res.send(data);
  });
};

// find specified joukkue
exports.get = (req, res) => {
  Joukkue.get(req.params.Id, (err, data) => {
   if (err) {
     if (err.kind === "not_found") {
       res.status(404).send({
         message: `Not found Joukkue with id ${req.params.Id}.`
       });
     } 
   } else res.send(data);
 });
};


// Update a Joukkue identified by the joukkueId in the request
exports.update = (req, res) => {
   // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Joukkue.update(
    req.body.Id,
    new Joukkue(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Joukkue with id ${req.body.Id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Joukkue with id " + req.body.Id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Joukkue with the specified joukkueId in the request
exports.delete = (req, res) => {
   Joukkue.remove(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Joukkue with id ${req.params.Id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Joukkue with id " + req.params.Id
        });
      }
    } else res.send({ message: `Joukkue was deleted successfully!` });
  });
};