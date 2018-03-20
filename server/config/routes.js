"use strict";

/**
 * Module dependencies.
 */
const voluntaryAssociations = require("../app/controllers/voluntarAssociationController");
const giveaways = require("../app/controllers/giveawayController");
const vehicles = require("../app/controllers/vehicleController");
const routes = require("../app/controllers/routeController");
const users = require("../app/controllers/usersController");

/**
 * Expose
 */
 
module.exports = function(app) {

  /**
   * Voluntary assoiciation
   */
  app.get("/volas", voluntaryAssociations.getAll);
  app.get("/volas/:id", voluntaryAssociations.getById);
  app.post("/volas", voluntaryAssociations.create);

   /**
   * Vehicle
   */
  app.get("/getVehicles", vehicles.getAllVehicles);
  app.get("/getVehicle/:id", vehicles.getVehicleById);
  app.post("/addVehicle", vehicles.createVehicale);
  app.delete("/deleteVehicle/:id", vehicles.deleteVehicle);
  app.put("/updateVehicle/:id", vehicles.updateVehicle);
  
  /**
   * Givaway
   */
  app.get("/giveaways", giveaways.getAllGivaways);
  app.get("/giveaways/:id", giveaways.getGiveawayById);
  app.post("/giveaways", giveaways.createGiveaway);
  app.post("/giveaways/:id/products", giveaways.addProductToGiveaway);

  /**
   * Route
   */
  app.post("/addRoute", routes.createRoute);
  app.put("/updateRoute/:id", routes.updateRoute);
  app.get("/getRoutes", routes.getAllRoutes);
  app.get("/getRoute/:id", routes.getRouteById);

  /**
   * User
   */
  app.post("/addUser", users.addUser);
  app.get("/getAllUsers", users.getAllUsers);

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (err.message &&
      (~err.message.indexOf("not found") ||
        ~err.message.indexOf("Cast to ObjectId failed"))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render("500", { error: err.stack });
  });
};
