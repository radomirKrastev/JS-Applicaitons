import { user } from "./user.js";
import { allIdeas } from "./app.js";
import { ideaHandler } from "./ideaHandler.js";

export let viewHandler = {
  common: async function() {
    this.partials = {
      navbar: await this.load("./templates/navigation/navbar.hbs"),
      footer: await this.load("./templates/footer/footer.hbs")
    };

    this.loggedIn = !!localStorage.getItem("token");

    if (this.loggedIn) {
      this.ideas = allIdeas;
    }
  },

  home: async function() {
    await viewHandler.common.call(this);
    this.partial("./templates/home/homePage.hbs");
  },

  profile: async function() {
    await viewHandler.common.call(this);

    this.username = user.username;
    this.totalUserIdeas = this.ideas
      .filter((x) => x.creator === this.username)
      .sort(function(a, b) {
        return b.likes - a.likes;
      });

    this.ideasCount = this.totalUserIdeas.length;
    this.partials.userIdea = await this.load("./templates/profile/userIdea.hbs");
    this.partial("./templates/profile/profilePage.hbs");
  },

  dashboard: async function() {
    await viewHandler.common.call(this);
    this.partials.ideaCard = await this.load("./templates/dashboard/ideaCard.hbs");

    this.partial("./templates/dashboard/dashboardPage.hbs");
  },

  notify: async function(context, path, message, successful) {
    await viewHandler.common.call(context);

    if (message) {
      context.message = message;
      context.successful = successful;

      let alert;

      if (successful) {
        context.partials.success = await context.load("./templates/notifications/success.hbs");
        await context.partial("./templates/notifications/notificationsPiece.hbs");

        alert = setTimeout(function() {
          context.redirect(path);
        }, 3000);
      } else {
        context.partials.error = await context.load("./templates/notifications/error.hbs");
        await context.partial("./templates/notifications/notificationsPiece.hbs");
      }

      document.addEventListener("click", function(e) {
        if (e.target.id === "successBox" || e.target.id === "errorBox") {
          clearTimeout(alert);
          context.redirect(path);
        }
      });
    } else {
      context.partials.loading = await context.load("./templates/notifications/loading.hbs");
      await context.partial("./templates/notifications/notificationsPiece.hbs");
    }
  },

  details: async function() {
    await viewHandler.common.call(this);
    this.ideaId = this.params.id;
    let ideaDetailed = this.ideas.find((x) => x._id === this.ideaId);

    this.likes = ideaDetailed.likes;
    this.comments = ideaDetailed.comments;
    this.isAuthor = ideaDetailed.creator === user.username;
    this.title = ideaDetailed.title;
    this.description = ideaDetailed.description;
    this.imageURL = ideaDetailed.imageURL;

    this.partials.comment = await this.load("./templates/dashboard/comment.hbs");
    this.partials.commentForm = await this.load("./templates/dashboard/commentForm.hbs");

    await this.partial("./templates/dashboard/details.hbs");

    if (!this.isAuthor) {
      ideaHandler.addComment(this, ideaDetailed);

      document.getElementById("like").addEventListener("click", (e) => {
        ideaHandler.like(this, this.ideaId);
      });
    }
  }
};
