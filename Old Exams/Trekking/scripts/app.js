import { userActions } from "./auth.js";
import { viewHandler } from "./views.js";
import { trekHandler } from "./trekHandler.js";

export let allTreks = [];

var app = Sammy("#main", function() {
  this.use("Handlebars", "hbs");

  this.get("/", viewHandler.home);
  this.get("/home", viewHandler.home);
  this.get("/login", userActions.login);
  this.post("/login", () => false);
  this.get("/register", userActions.register);
  this.post("/register", () => false);
  this.get("/logout", userActions.logout);
  this.get("#/edit/:id", trekHandler.edit);
  this.get("/edit", trekHandler.edit);
  this.get("/create", trekHandler.create);
  this.post("/create", () => false);
  this.get("/home/:id", viewHandler.details);
  this.get("/home/:id", () => false);
  this.get("#/delete/:id", trekHandler.delete);
  this.get("/profile", viewHandler.profile);
});

(() => {
  app.run("/");
})();
