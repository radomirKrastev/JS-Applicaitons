import { user } from "./objectsHelper.js";
import { allTreks } from "./app.js";
import { trekHandler } from "./trekHandler.js";

export let viewHandler = {
  common: async function() {
    this.partials = {
      navbar: await this.load("./templates/navigation/navbar.hbs"),
      footer: await this.load("./templates/footer/footer.hbs")
    };

    this.loggedIn = !!localStorage.getItem("token");

    if (this.loggedIn) {
      this.username = user.username;
      this.treks = allTreks;
    }
  },

  home: async function() {
    await viewHandler.common.call(this);
    this.partials.trekCard = await this.load("./templates/home/trekCard.hbs");

    this.partial("./templates/home/homePage.hbs");
  },

  profile: async function() {
    await viewHandler.common.call(this);
    this.username = user.username;

    this.totalUserTreks = this.treks
      .filter((x) => x.organizer === this.username)
      .sort(function(a, b) {
        return b.likes - a.likes;
      });

    this.treksCount = this.totalUserTreks.length;
    this.partials.userTrek = await this.load("./templates/profile/userTrek.hbs");
    this.partial("./templates/profile/profilePage.hbs");
  },

  notify: async function(context, path, message, successful) {
    await viewHandler.common.call(context);
    let alert;

    if (message) {
      context.message = message;
      context.successful = successful;

      if (successful) {
        context.partials.success = await context.load("./templates/notifications/success.hbs");
        await context.partial("./templates/notifications/notificationsPiece.hbs");
        alert = setTimeout(function() {
          path === "refresh" ? context.app.refresh() : context.redirect(path);
        }, 5000);
      } else {
        context.partials.error = await context.load("./templates/notifications/error.hbs");
        await context.partial("./templates/notifications/notificationsPiece.hbs");
      }

      document.addEventListener("click", _redirect);
    } else {
      context.partials.loading = await context.load("./templates/notifications/loading.hbs");
      await context.partial("./templates/notifications/notificationsPiece.hbs");
    }

    function _redirect(e) {
      if (e.target.id === "successBox") {
        clearTimeout(alert);
        path === "refresh" ? context.app.refresh() : context.redirect(path);
      } else if (e.target.id === "errorBox") {
        context.app.refresh();
      }

      document.removeEventListener("click", _redirect);
    }
  },

  details: async function() {
    await viewHandler.common.call(this);

    this.trekId = this.params.id;
    let trekDetailed = this.treks.find((x) => x._id === this.trekId);
    this.likes = trekDetailed.likes;
    this.organizer = trekDetailed.organizer;
    this.isOrganizer = this.organizer === user.username;
    this.location = trekDetailed.location;
    this.description = trekDetailed.description;
    this.imageURL = trekDetailed.imageURL;
    this.dateTime = trekDetailed.dateTime;

    await this.partial("./templates/home/details.hbs");
    if (!this.isOrganizer) {
      document.getElementById("like").addEventListener("click", (e) => {
        trekHandler.like(this, this.trekId);
      });
    }
  }
};
