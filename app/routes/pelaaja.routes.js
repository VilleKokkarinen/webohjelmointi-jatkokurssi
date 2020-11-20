module.exports = app => {
  const pelaajat = require("../controllers/pelaaja.controller.js");

  // Create a new Pelaaja
  app.post("/pelaajat", pelaajat.create);

  // Retrieve all Pelaajas
  app.get("/pelaajat", pelaajat.findAll);

  // Retrieve a single Pelaaja with pelaajaId
  app.get("/pelaajat/:Id", pelaajat.get);

  // Update a Pelaaja with pelaajaId
  app.put("/pelaajat/:Id", pelaajat.update);

  // Delete a Pelaaja with pelaajaId
  app.delete("/pelaajat/:Id", pelaajat.delete);
};