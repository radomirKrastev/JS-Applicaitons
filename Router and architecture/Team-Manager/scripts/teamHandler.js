import { createFormEntity } from "./form-helpers.js";
import { myFetch } from "./myFetch.js";
import { user } from "./user.js";
import { allTeams } from "./app.js";
import { viewHandler } from "./views.js";

export let teamHandler = {
  edit: async function() {
    await viewHandler.common.call(this);
    this.teamId = this.params.id.substring(1);
    let teamToEdit = this.teams.find((x) => x._id === this.teamId);

    this.partials.editForm = await this.load("./templates/edit/editForm.hbs");

    await this.partial("./templates/edit/editPage.hbs");

    let formRef = document.getElementById("edit-form");
    let form = createFormEntity(formRef, ["name", "comment"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();

      let editedTeam = form.getValue();
      teamToEdit.name = editedTeam.name;
      teamToEdit.comment = editedTeam.comment;

      let token = sessionStorage.token;

      let teamAddResult = await myFetch
        .patch(`teams/${this.teamId}.json?auth=${token}`, editedTeam)
        .then((x) => x.json());

      this.redirect("#/catalog");
    });
  },

  join: async function() {
    await viewHandler.common.call(this);

    if (!this.hasNoTeam) {
      return;
    }

    this.teamId = this.params.id.substring(1);
    let teamToJoin = this.teams.find((x) => x._id === this.teamId);
    teamToJoin.members.push({ username: user.username });

    user.teamId = this.teamId;

    let token = sessionStorage.token;

    let teamEdit = await myFetch
      .patch(`teams/${this.teamId}.json?auth=${token}`, teamToJoin)
      .then((x) => x.json());

    let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
    let currentKey = Object.keys(allUsers).find((key) => allUsers[key].username === user.username);

    myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);

    this.redirect("#/catalog");
  },

  leave: async function() {
    await viewHandler.common.call(this);
    let teamToLeave = this.teams.find((x) => x._id === user.teamId);
    teamToLeave.members = teamToLeave.members.filter((x) => x.username !== user.username);

    let token = sessionStorage.token;

    let teamEdit = await myFetch
      .patch(`teams/${user.teamId}.json?auth=${token}`, teamToLeave)
      .then((x) => x.json());

    let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
    let currentKey = Object.keys(allUsers).find((key) => allUsers[key].username === user.username);

    user.teamId = "";
    myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);

    this.redirect("#/catalog");
  },

  create: async function() {
    await viewHandler.common.call(this);
    this.partials.createForm = await this.load("./templates/create/createForm.hbs");
    await this.partial("./templates/create/createPage.hbs");

    let formRef = document.getElementById("create-form");
    let form = createFormEntity(formRef, ["name", "comment"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();

      let newTeam = form.getValue();
      newTeam.creatorUsername = user.username;
      newTeam.members = [{ username: user.username }];

      let token = sessionStorage.token;

      let teamAddResult = await myFetch
        .post(`teams/.json?auth=${token}`, newTeam)
        .then((x) => x.json());

      newTeam._id = teamAddResult.name;
      allTeams.push(newTeam);

      user.teamId = teamAddResult.name;

      let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
      let currentKey = Object.keys(allUsers).find(
        (key) => allUsers[key].username === user.username
      );

      myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);
      this.redirect("#/catalog");
    });
  }
};
