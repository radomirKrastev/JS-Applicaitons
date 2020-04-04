import { createFormEntity } from "./form-helpers.js";
import { myFetch } from "./myFetch.js";
import { user, changeObjProps } from "./objectsHelper.js";
import { viewHandler } from "./views.js";

export let userActions = {
  login: async function() {
    await viewHandler.common.call(this);
    // this.partials.loginForm = await this.load("./templates/login/loginForm.hbs");
    await this.partial("./templates/login/loginForm.hbs");

    let formRef = document.getElementById("login-form");
    let form = createFormEntity(formRef, ["email", "password"]);
    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();

      let formValue = form.getValue();

      try {
        viewHandler.notify(this, "/home");

        let loginResponse = await firebase
          .auth()
          .signInWithEmailAndPassword(formValue.email, formValue.password);

        let token = await firebase.auth().currentUser.getIdToken();
        localStorage.setItem("token", token);
        localStorage.setItem("username", loginResponse.user.email);

        let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
        let loggeduser = Object.keys(allUsers)
          .filter((key) => allUsers[key].username === localStorage.username)
          .map((x) => allUsers[x])[0];
        changeObjProps(user, loggeduser);
        viewHandler.notify(this, "/home", "Successfully logged user.", true);
      } catch (error) {
        viewHandler.notify(this, "", error.message, false);
      }
    });
  },

  register: async function() {
    await viewHandler.common.call(this);
    // this.partials.registerForm = await this.load("./templates/register/registerForm.hbs");
    await this.partial("./templates/register/registerForm.hbs");

    let formRef = document.getElementById("register-form");
    let form = createFormEntity(formRef, ["email", "password", "rePassword"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();
      viewHandler.notify(this, "/home");

      let formValue = await form.getValue();

      try {
        if (formValue.email.length < 3) {
          throw new Error("Username should be atleast 3 characters long!");
        } else if (formValue.password.length < 6) {
          throw new Error("Password should be atleast 3 characters long!");
        }
        if (formValue.password !== formValue.rePassword) {
          throw new Error("Password and repeat password must be the same!");
        }

        let registerResponse = await firebase
          .auth()
          .createUserWithEmailAndPassword(formValue.email, formValue.password);
        let token = await firebase.auth().currentUser.getIdToken();
        localStorage.setItem("token", token);
        localStorage.setItem("username", registerResponse.user.email);

        let newUser = {
          username: localStorage.getItem("username"),
          treksId: []
        };

        changeObjProps(user, newUser);
        myFetch.post(`users/.json?auth=${token}`, user);
        viewHandler.notify(this, "/home", "Successfully registered user.", true);
      } catch (error) {
        viewHandler.notify(this, "", error.message, false);
      }
    });
  },

  logout: function() {
    viewHandler.notify(this, "/home");
    localStorage.clear();
    firebase.auth().signOut();
    viewHandler.notify(this, "/home", "Logout successful.", true);
  }
};
