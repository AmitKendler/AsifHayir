"use strict";

/**
 * Module dependencies.
 */
const voluntaryAssociations = require("../app/controllers/voluntarAssociationController");

/**
 * Expose
 */

module.exports = function(app) {

  app.get("/volas", voluntaryAssociations.getAll);
  app.get("/volas/:id", voluntaryAssociations.getById);
  app.post("/volas", voluntaryAssociations.create);

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
