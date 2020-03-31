import { createFormEntity } from "./form-helpers.js";
import { myFetch } from "./myFetch.js";
import { user, changeUserProps } from "./user.js";
import { viewHandler } from "./views.js";

export let userActions = {
  login: async function() {
    await viewHandler.common.call(this);
    this.partials.loginForm = await this.load("./templates/login/loginForm.hbs");
    await this.partial("./templates/login/loginPage.hbs");

    let formRef = document.getElementById("login-form");
    let form = createFormEntity(formRef, ["username", "password"]);

    formRef.addEventListener("submit", (e) => {
      e.preventDefault();
      let formValue = form.getValue();

      firebase
        .auth()
        .signInWithEmailAndPassword(formValue.username, formValue.password)
        .then((resp) => {
          firebase
            .auth()
            .currentUser.getIdToken()
            .then(async function(token) {
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("username", resp.user.email);

              let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());

              let loggeduser = Object.keys(allUsers)
                .filter((key) => allUsers[key].username === user.username)
                .map((x) => allUsers[x])[0];

              changeUserProps(user, loggeduser);
            });

          this.redirect("#/home");
        });
    });
  },

  register: async function() {
    await viewHandler.common.call(this);
    this.partials.registerForm = await this.load("./templates/register/registerForm.hbs");
    await this.partial("./templates/register/registerPage.hbs");

    let formRef = document.getElementById("register-form");
    let form = createFormEntity(formRef, ["username", "password", "repeatPassword"]);

    formRef.addEventListener("submit", (e) => {
      e.preventDefault();
      let formValue = form.getValue();

      if (formValue.password !== formValue.repeatPassword) {
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(formValue.username, formValue.password)
        .then((resp) => {
          firebase
            .auth()
            .currentUser.getIdToken()
            .then(function(token) {
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("username", resp.user.email);

              let newUser = {
                username: sessionStorage.getItem("username"),
                teamId: ""
              };

              changeUserProps(user, newUser);

              myFetch.post(`users/.json?auth=${token}`, user);
            });

          this.redirect("#/home");
        });
    });
  },

  logout: function() {
    sessionStorage.clear();
    firebase.auth().signOut();
    this.redirect("#/home");
  }
};
