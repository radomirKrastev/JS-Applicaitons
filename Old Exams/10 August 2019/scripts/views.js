import { user } from "./objectsHelper.js";
import { allCauses } from "./app.js";
import { causeHandler } from "./causeHandler.js";

export let viewHandler = {
  common: async function() {
    this.partials = {
      navbar: await this.load("./templates/navigation/navbar.hbs"),
      footer: await this.load("./templates/footer/footer.hbs")
    };

    this.loggedIn = !!localStorage.getItem("token");
    if (this.loggedIn) {
      this.username = user.username;
      this.causes = allCauses;
    }
  },

  home: async function() {
    await viewHandler.common.call(this);
    // this.partials.trekCard = await this.load("./templates/home/trekCard.hbs");
    this.partial("./templates/home/homePage.hbs");
  },

  dashboard: async function() {
    await viewHandler.common.call(this);
    this.partials.causeCard = await this.load("./templates/dashboard/causeCard.hbs");
    this.partial("./templates/dashboard/dashboardPage.hbs");
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
      if (e.target.id === "successNotification") {
        clearTimeout(alert);
        path === "refresh" ? context.app.refresh() : context.redirect(path);
      } else if (e.target.id === "errorNotification") {
        context.app.refresh();
      }
      document.removeEventListener("click", _redirect);
    }
  },

  details: async function() {
    await viewHandler.common.call(this);
    this.partials.donorView = await this.load("./templates/dashboard/donorView.hbs");
    this.causeId = this.params.id;
    let causeDetailed = this.causes.find((x) => x._id === this.causeId);
    this.creator = causeDetailed.creator;
    this.isCreator = this.creator === user.username;
    this.description = causeDetailed.description;
    this.pictureUrl = causeDetailed.pictureUrl;
    this.donors = causeDetailed.donors.map(function(x) {
      return { name: x };
    });
    console.log(this.donors);
    this.collectedFunds = causeDetailed.collectedFunds;
    this.neededFunds = causeDetailed.neededFunds;

    await this.partial("./templates/dashboard/details.hbs");

    if (!this.isCreator) {
      causeHandler.donate(this, causeDetailed);
    }
  }
};
