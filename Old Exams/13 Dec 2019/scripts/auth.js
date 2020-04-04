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

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();
      let formValue = form.getValue();

      let loginResponse = await firebase
        .auth()
        .signInWithEmailAndPassword(formValue.username, formValue.password);

      let token = await firebase.auth().currentUser.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("username", loginResponse.user.email);

      let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());

      let loggeduser = Object.keys(allUsers)
        .filter((key) => allUsers[key].username === localStorage.username)
        .map((x) => allUsers[x])[0];

      changeUserProps(user, loggeduser);

      this.redirect("/home");
    });
  },

  register: async function() {
    await viewHandler.common.call(this);
    this.partials.registerForm = await this.load("./templates/register/registerForm.hbs");
    await this.partial("./templates/register/registerPage.hbs");

    let formRef = document.getElementById("register-form");
    let form = createFormEntity(formRef, ["username", "password", "repeatPassword"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();
      let formValue = await form.getValue();

      try {
        if (formValue.username.length < 3) {
          throw new Error("Username should be atleast 3 characters long!");
        } else if (formValue.password.length < 3) {
          throw new Error("Password should be atleast 3 characters long!");
        }
        if (formValue.password !== formValue.repeatPassword) {
          throw new Error("Password and repeat password must be the same!");
        }

        viewHandler.notify(this, "/home");

        let registerResponse = await firebase
          .auth()
          .createUserWithEmailAndPassword(formValue.username, formValue.password);

        let token = await firebase.auth().currentUser.getIdToken();
        localStorage.setItem("token", token);
        localStorage.setItem("username", registerResponse.user.email);

        let newUser = {
          username: localStorage.getItem("username"),
          ideasId: []
        };

        changeUserProps(user, newUser);
        myFetch.post(`users/.json?auth=${token}`, user);

        viewHandler.notify(this, "/home", "User registration successful.", true);
      } catch (error) {
        viewHandler.notify(this, "/home", error.message, false);
      }
    });
  },

  logout: function() {
    localStorage.clear();
    firebase.auth().signOut();
    this.redirect("/home");
  }
};
