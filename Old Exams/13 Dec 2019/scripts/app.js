import { userActions } from "./auth.js";
import { viewHandler } from "./views.js";
import { ideaHandler } from "./ideaHandler.js";

export let allIdeas = [];

var app = Sammy("#main", function() {
  this.use("Handlebars", "hbs");

  this.get("/", viewHandler.home);
  this.get("/home", viewHandler.home);
  this.get("/login", userActions.login);
  this.post("/login", () => false);
  this.get("/register", userActions.register);
  this.post("/register", () => false);
  this.get("/logout", userActions.logout);
  this.get("/dashboard", viewHandler.dashboard);
  this.get("/create", ideaHandler.create);
  this.post("/create", () => false);
  this.get("/dashboard/:id", viewHandler.details);
  this.get("/dashboard/:id", () => false);
  this.get("#/like/:id", ideaHandler.like);
  this.get("#/like/:id", () => false);
  this.get("#/delete/:id", ideaHandler.delete);
  this.get("/profile", viewHandler.profile);
});

(() => {
  app.run("/");
})();
