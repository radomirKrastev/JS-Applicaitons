import { createFormEntity } from "./form-helpers.js";
import { myFetch } from "./myFetch.js";
import { user, changeObjProps } from "./objectsHelper.js";
import { allTreks } from "./app.js";
import { viewHandler } from "./views.js";

export let trekHandler = {
  edit: async function() {
    await viewHandler.common.call(this);
    await this.partial("./templates/edit/editForm.hbs");
    this.trekId = this.params.id;
    let trekToEdit = this.treks.find((x) => x._id === this.trekId);

    let oldTrek = {
      location: trekToEdit.location,
      dateTime: trekToEdit.dateTime,
      description: trekToEdit.description,
      imageURL: trekToEdit.imageURL
    };

    let formRef = document.getElementById("edit-form");
    let form = createFormEntity(formRef, ["location", "dateTime", "description", "imageURL"]);

    form.setValue(oldTrek);

    formRef.addEventListener("submit", async (e) => {
      viewHandler.notify(this, "/home");

      e.preventDefault();
      let editedTrek = form.getValue();
      changeObjProps(trekToEdit, editedTrek);

      let token = localStorage.token;

      let trekAddResult = await myFetch
        .patch(`treks/${this.trekId}.json?auth=${token}`, editedTrek)
        .then((x) => x.json());

      viewHandler.notify(this, `/home`, "Trek edited successfully.", true);
    });
  },

  like: async function(context, id) {
    viewHandler.notify(context, "/home");
    let trekToLike = context.treks.find((x) => x._id === id);
    trekToLike.likes++;
    let token = localStorage.token;
    let trekEdit = await myFetch
      .patch(`treks/${id}.json?auth=${token}`, trekToLike)
      .then((x) => x.json());

    viewHandler.notify(context, "refresh", "You liked the trek successfully", true);
  },

  delete: async function() {
    await viewHandler.common.call(this);

    viewHandler.notify(this, "/home");
    this.trekId = this.params.id;
    let trekToDelete = this.treks.find((x) => x._id === this.trekId);

    let token = localStorage.token;

    await myFetch.delete(`treks/${this.trekId}.json?auth=${token}`);
    user.treksId.splice(
      user.treksId.findIndex((x) => x === this.trekId),
      1
    );

    allTreks.splice(
      allTreks.findIndex((x) => x === this.trekId),
      1
    );

    let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
    let currentKey = Object.keys(allUsers).find((key) => allUsers[key].username === user.username);
    myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);
    viewHandler.notify(this, "/home", "You closed the trek successfully.", true);
  },

  create: async function() {
    await viewHandler.common.call(this);
    // this.partials.createForm = await this.load("./templates/create/createForm.hbs");
    await this.partial("./templates/create/createForm.hbs");

    let formRef = document.getElementById("create-form");
    let form = createFormEntity(formRef, ["location", "dateTime", "description", "imageURL"]);
    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();
      viewHandler.notify(this, "/home");

      try {
        let newTrek = form.getValue();
        if (newTrek.location < 6 || newTrek.description < 10) {
          throw new Error("Invalid input.");
        }

        newTrek.organizer = user.username;
        newTrek.likes = 0;

        let token = localStorage.token;
        let trekKey = await myFetch
          .post(`treks/.json?auth=${token}`, newTrek)
          .then((x) => x.json());
        newTrek._id = trekKey.name;
        allTreks.push(newTrek);
        user.treksId.push(trekKey.name);

        let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
        let currentKey = Object.keys(allUsers).find(
          (key) => allUsers[key].username === user.username
        );

        myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);
        viewHandler.notify(this, "/home", "Trek created successfully.", true);
      } catch (error) {
        viewHandler.notify(this, "", error.message, false);
      }
    });
  }
};
