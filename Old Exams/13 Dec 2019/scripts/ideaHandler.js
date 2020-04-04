import { createFormEntity } from "./form-helpers.js";
import { myFetch } from "./myFetch.js";
import { user } from "./user.js";
import { allIdeas } from "./app.js";
import { viewHandler } from "./views.js";

export let ideaHandler = {
  addComment: async function(context, ideaDetailed) {
    let formRef = document.getElementById("add-comment-form");
    let form = createFormEntity(formRef, ["newComment"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();
      let ideaComment = form.getValue();

      ideaDetailed.comments.push({ comment: ideaComment.newComment });

      let token = localStorage.token;

      let ideaAddResult = await myFetch
        .patch(`ideas/${context.ideaId}.json?auth=${token}`, ideaDetailed)
        .then((x) => x.json());

      context.app.refresh();
    });
  },

  like: async function(context, id) {
    let ideaToLike = context.ideas.find((x) => x._id === id);

    ideaToLike.likes++;
    let token = localStorage.token;

    let ideaEdit = await myFetch
      .patch(`ideas/${id}.json?auth=${token}`, ideaToLike)
      .then((x) => x.json());

    context.app.refresh();
  },

  delete: async function() {
    await viewHandler.common.call(this);
    this.ideaId = this.params.id;
    let ideaToDelete = this.ideas.find((x) => x._id === this.ideaId);

    let token = localStorage.token;

    await myFetch.delete(`ideas/${this.ideaId}.json?auth=${token}`);

    user.ideasId.splice(
      user.ideasId.findIndex((x) => x === this.ideaId),
      1
    );

    allIdeas.splice(
      allIdeas.findIndex((x) => x === this.ideaId),
      1
    );

    let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
    let currentKey = Object.keys(allUsers).find((key) => allUsers[key].username === user.username);

    myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);
    this.redirect("/dashboard");
  },

  create: async function() {
    await viewHandler.common.call(this);
    this.partials.createForm = await this.load("./templates/create/createForm.hbs");
    await this.partial("./templates/create/createPage.hbs");

    let formRef = document.getElementById("create-form");
    let form = createFormEntity(formRef, ["title", "description", "imageURL"]);

    formRef.addEventListener("submit", async (e) => {
      e.preventDefault();

      let newIdea = form.getValue();
      newIdea.creator = user.username;
      newIdea.likes = 0;
      newIdea.comments = [];

      let token = localStorage.token;

      let ideaAddResult = await myFetch
        .post(`ideas/.json?auth=${token}`, newIdea)
        .then((x) => x.json());

      newIdea._id = ideaAddResult.name;
      allIdeas.push(newIdea);

      user.ideasId.push(ideaAddResult.name);

      let allUsers = await myFetch.get(`users/.json?auth=${token}`).then((x) => x.json());
      let currentKey = Object.keys(allUsers).find(
        (key) => allUsers[key].username === user.username
      );

      myFetch.patch(`users/${currentKey}.json?auth=${token}`, user);
      this.redirect("/dashboard");
    });
  }
};
