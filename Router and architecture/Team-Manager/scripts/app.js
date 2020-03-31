import { userActions } from "./auth.js";
import { viewHandler } from "./views.js";
import { teamHandler } from "./teamHandler.js";

export let allTeams = [];

var app = Sammy("#main", function() {
  this.use("Handlebars", "hbs");

  this.get("#/", viewHandler.home);
  this.get("#/home", viewHandler.home);
  this.get("#/about", viewHandler.about);
  this.get("#/login", userActions.login);
  this.post("#/login", () => false);
  this.get("#/register", userActions.register);
  this.post("#/register", () => false);
  this.get("#/logout", userActions.logout);
  this.get("#/catalog", viewHandler.catalog);
  this.get("#/create", teamHandler.create);
  this.post("#/create", () => false);
  this.get("#/catalog/:id", viewHandler.details);
  this.get("#/edit/:id", teamHandler.edit);
  this.get("#/edit/:id", () => false);
  this.get("#/join/:id", teamHandler.join);
  this.get("#/leave", teamHandler.leave);
});

(() => {
  app.run("#/");
})();
