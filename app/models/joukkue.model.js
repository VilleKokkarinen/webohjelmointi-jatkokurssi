const sql = require("./db.js");

// constructor
const Joukkue = function(joukkue) {
  this.Id = joukkue.Id;
  this.Nimi = joukkue.Nimi;
  this.Kaupunki = joukkue.Kaupunki;
  this.Perustamisvuosi = joukkue.Perustamisvuosi;
};

Joukkue.create = (newJoukkue, result) => {

  for (const [key, value] of Object.entries(newJoukkue)) {
    if(value == null || value == ""){
      const err = {message: key + " oli tyhjä"}
      result(err, null);
      return;
    }
  }

  sql.query("INSERT INTO joukkue SET ?", newJoukkue, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newJoukkue });
  });
};

Joukkue.get = (Id, result) => {
  sql.query(`SELECT * FROM joukkue WHERE Id = ${Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Joukkue.getAll = result => {
  sql.query("SELECT * FROM joukkue", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("getting all joukkues");
    result(null, res);
  });
};

Joukkue.update = (id, joukkue, result) => {
  sql.query(
    "UPDATE joukkue SET Nimi = ?, Kaupunki = ?, Perustamisvuosi = ? WHERE Id = ?",
    [joukkue.Nimi, joukkue.Kaupunki, joukkue.Perustamisvuosi, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...joukkue });
    }
  );
};

Joukkue.remove = (id, result) => {
  sql.query("DELETE FROM joukkue WHERE Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Joukkue;