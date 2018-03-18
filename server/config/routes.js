"use strict";

/**
 * Module dependencies.
 */
const voluntaryAssociations = require("../app/controllers/voluntarAssociationController");
const giveaways = require("../app/controllers/giveawayController");
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
   * Givaway
   */
  app.get("/giveaways", giveaways.getAllGivaways);
  app.get("/giveaways/:id", giveaways.getGiveawayById);
  app.post("/giveaways", giveaways.createGiveaway);
  app.post("/giveaways/:id/products", giveaways.addProductToGiveaway);
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
