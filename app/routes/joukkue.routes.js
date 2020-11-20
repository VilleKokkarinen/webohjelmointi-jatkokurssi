module.exports = app => {
  const joukkueet = require("../controllers/joukkue.controller.js");

  // Create a new Joukkue
  app.post("/joukkueet", joukkueet.create);

  // Retrieve all Joukkues
  app.get("/joukkueet", joukkueet.findAll);

  // Retrieve a single Joukkue with joukkueId
  app.get("/joukkueet/:Id", joukkueet.get);

  // Update a Joukkue with joukkueId
  app.put("/joukkueet/:Id", joukkueet.update);

  // Delete a Joukkue with joukkueId
  app.delete("/joukkueet/:Id", joukkueet.delete);
};