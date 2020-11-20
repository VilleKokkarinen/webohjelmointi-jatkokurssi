const sql = require("./db.js");

// constructor
const Sarjataulu = function(sarjataulu) {
  this.Id = sarjataulu.Id;
  this.Joukkue_id = sarjataulu.Joukkue_id;
  this.Ottelumaara = sarjataulu.Ottelumaara;
  this.Voittoja = sarjataulu.Voittoja;
  this.Tappioita = sarjataulu.Tappioita;
  this.Tasapeleja = sarjataulu.Tasapeleja;
  this.Tehdyt_maalit = sarjataulu.Tehdyt_maalit;
  this.Paastetut_maalit = sarjataulu.Paastetut_maalit;
  this.Pisteet = sarjataulu.Pisteet;
};

Sarjataulu.create = (newSarjataulu, result) => {

  for (const [key, value] of Object.entries(newSarjataulu)) {
    if(value == null || value == ""){
      const err = {message: key + " oli tyhjä"}
      result(err, null);
      return;
    }
  }

  sql.query("INSERT INTO sarjataulukko SET ?", newSarjataulu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newSarjataulu });
  });
};

Sarjataulu.get = (Id, result) => {
  sql.query(`SELECT * FROM sarjataulukko WHERE Id = ${Id}`, (err, res) => {
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

Sarjataulu.getAll = result => {
  sql.query("SELECT * FROM sarjataulukko", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("getting all sarjataulus");
    result(null, res);
  });
};


Sarjataulu.update = (id, sarjataulu, result) => {
  sql.query(
    `UPDATE sarjataulukko
    SET Joukkue_id = ?,
    Ottelumaara = ?,
    Voittoja = ?,
    Tappioita = ?
    Tasapeleja = ?
    Tehdyt_maalit = ?
    Paastetut_maalit = ?
    Pisteet = ?
     WHERE Id = ?`,
    [ sarjataulu.Joukkue_id,
      sarjataulu.Ottelumaara,
      sarjataulu.Voittoja,
      sarjataulu.Tappioita,
      sarjataulu.Tasapeleja,
      sarjataulu.Tehdyt_maalit,
      sarjataulu.Paastetut_maalit,
      sarjataulu.Pisteet,
      id],
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

      result(null, { id: id, ...sarjataulu });
    }
  );
};

Sarjataulu.remove = (id, result) => {
  sql.query("DELETE FROM sarjataulukko WHERE Id = ?", id, (err, res) => {
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

module.exports = Sarjataulu;