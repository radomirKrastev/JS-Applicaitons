import { createFormEntity } from "./form-helpers.js";
import { myFetch } from "./myFetch.js";
import { user, changeObjProps } from "./objectsHelper.js";
import { allCauses } from "./app.js";
import { viewHandler } from "./views.js";

export let causeHandler = {
  donate: async function(context, causeToDonate) {
    // viewHandler.notify(context, `#/details/${context.causesId}`);
    let formRef = document.getElementById("donate-form");
    let form = createFormEntity(formRef, ["currentDonation"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();
      let causeDonation = form.getValue();

      causeToDonate.donors.push(user.username);
      causeToDonate.collectedFunds += Number(causeDonation.currentDonation);

      let token = localStorage.token;

      let causeAddResult = await myFetch
        .patch(`causes/${context.causeId}.json?auth=${token}`, causeToDonate)
        .then((x) => x.json());

      viewHandler.notify(context, "refresh", "Donation successful!", true);
    });
  },

  delete: async function() {
    await viewHandler.common.call(this);
    viewHandler.notify(this, "/delete");
    this.causeId = this.params.id;
    let causeToDelete = this.causes.find((x) => x._id === this.causeId);
    let token = localStorage.token;
    await myFetch.delete(`causes/${this.causeId}.json?auth=${token}`);
    user.causesId.splice(
      user.causesId.findIndex((x) => x === this.causeId),
      1
    );
    allCauses.splice(
      allCauses.findIndex((x) => x === this.causeId),
      1
    );
    let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
    let currentKey = Object.keys(allUsers).find((key) => allUsers[key].username === user.username);
    myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);
    viewHandler.notify(this, "/dashboard", "You deleted the cause successfully.", true);
  },

  create: async function() {
    await viewHandler.common.call(this);
    this.partials.createForm = await this.load("./templates/create/createForm.hbs");
    await this.partial("./templates/create/createPage.hbs");
    let formRef = document.getElementById("create-form");
    let form = createFormEntity(formRef, ["cause", "pictureUrl", "neededFunds", "description"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();
      viewHandler.notify(this, "/home");
      try {
        let newCause = form.getValue();
        Object.keys(newCause).forEach(function(x) {
          if (newCause[x].length <= 0) {
            throw new Error("Invalid input.");
          }
        });

        newCause.creator = user.username;
        newCause.donors = [];
        newCause.collectedFunds = 0;
        let token = localStorage.token;
        let causeKey = await myFetch
          .post(`causes/.json?auth=${token}`, newCause)
          .then((x) => x.json());
        newCause._id = causeKey.name;
        allCauses.push(newCause);
        user.causesId.push(causeKey.name);
        let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
        let currentKey = Object.keys(allUsers).find(
          (key) => allUsers[key].username === user.username
        );
        myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);
        viewHandler.notify(this, "/dashboard", "Cause created successfully.", true);
      } catch (error) {
        viewHandler.notify(this, "", error.message, false);
      }
    });
  }
};
