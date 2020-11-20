const sql = require("./db.js");

// constructor
const Pelaaja = function(pelaaja) {
  this.Id = pelaaja.Id;
  this.Sukunimi = pelaaja.Sukunimi;
  this.Etunimi = pelaaja.Etunimi;
  this.Pelinumero = pelaaja.Pelinumero;
  this.Joukkue_id = pelaaja.Joukkue_id;
};

Pelaaja.create = (newPelaaja, result) => {

  for (const [key, value] of Object.entries(newPelaaja)) {
    if(value == null || value == ""){
      const err = {message: key + " oli tyhjä"}
      result(err, null);
      return;
    }
  }

  sql.query("INSERT INTO pelaaja SET ?", newPelaaja, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newPelaaja });
  });
};

Pelaaja.get = (Id, result) => {
  sql.query(`SELECT * FROM pelaaja WHERE Id = ${Id}`, (err, res) => {
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

Pelaaja.getAll = result => {
  sql.query("SELECT * FROM pelaaja", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("getting all pelaajas");
    result(null, res);
  });
};

Pelaaja.update = (id, pelaaja, result) => {
  sql.query(
    "UPDATE pelaaja SET Sukunimi = ?, Etunimi = ?, Pelinumero = ? Joukkue_id = ? WHERE Id = ?",
    [pelaaja.Sukunimi, pelaaja.Etunimi, pelaaja.Pelinumero, pelaaja.Joukkue_id, id],
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

      result(null, { id: id, ...pelaaja });
    }
  );
};

Pelaaja.remove = (id, result) => {
  sql.query("DELETE FROM pelaaja WHERE Id = ?", id, (err, res) => {
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

module.exports = Pelaaja;