module.exports = app => {
  const sarjataulut = require("../controllers/sarjataulu.controller.js");

  // Create a new Sarjataulu
  app.post("/sarjataulut", sarjataulut.create);

  // Retrieve all Sarjataulus
  app.get("/sarjataulut", sarjataulut.findAll);

  // Retrieve a single Sarjataulu with sarjatauluId
  app.get("/sarjataulut/:Id", sarjataulut.get);

  // Update a Sarjataulu with sarjatauluId
  app.put("/sarjataulut/:Id", sarjataulut.update);

  // Delete a Sarjataulu with sarjatauluId
  app.delete("/sarjataulut/:Id", sarjataulut.delete);
};