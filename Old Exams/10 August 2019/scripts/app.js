import { userActions } from "./auth.js";
import { viewHandler } from "./views.js";
import { causeHandler } from "./causeHandler.js";

export let allCauses = [];

var app = Sammy("#main", function() {
  this.use("Handlebars", "hbs");

  this.get("/", viewHandler.home);
  this.get("/home", viewHandler.home);
  this.get("/login", userActions.login);
  this.post("/login", () => false);
  this.get("/register", userActions.register);
  this.post("/register", () => false);
  this.get("/logout", userActions.logout);
  this.get("/create", causeHandler.create);
  this.post("/create", () => false);
  this.get("/dashboard", viewHandler.dashboard);
  this.get("#/details/:id", viewHandler.details);
  this.get("#/details/:id", () => false);
  this.get("#/delete/:id", causeHandler.delete);
});

(() => {
  app.run("/");
})();
