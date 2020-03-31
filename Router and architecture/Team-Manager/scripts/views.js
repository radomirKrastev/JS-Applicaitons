import { user } from "./user.js";
import { allTeams } from "./app.js";

export let viewHandler = {
  common: async function() {
    this.partials = {
      header: await this.load("./templates/common/header.hbs"),
      footer: await this.load("./templates/common/footer.hbs")
    };

    this.username = sessionStorage.getItem("username");
    this.loggedIn = !!sessionStorage.getItem("token");

    if (this.loggedIn) {
      this.hasNoTeam = user.teamId === "";
      this.teams = allTeams;
    }
  },

  home: async function() {
    await viewHandler.common.call(this);
    this.partial("./templates/home/home.hbs");
  },

  about: async function() {
    await viewHandler.common.call(this);
    this.partial("./templates/about/about.hbs");
  },

  catalog: async function() {
    await viewHandler.common.call(this);
    this.partials.team = await this.load("./templates/catalog/team.hbs");

    this.hasNoTeam = user.teamId === "";
    this.partial("./templates/catalog/teamCatalog.hbs");
  },

  details: async function() {
    await viewHandler.common.call(this);
    this.teamId = this.params.id.substring(1);
    let teamDetailed = this.teams.find((x) => x._id === this.teamId);

    this.members = teamDetailed.members;
    this.comment = teamDetailed.comment;
    this.isAuthor = teamDetailed.creatorUsername === user.username;
    this.isOnTeam = this.teamId === user.teamId;
    this.hasNoTeam = user.teamId === "";

    this.partials.teamMember = await this.load("./templates/catalog/teamMember.hbs");
    this.partials.teamControls = await this.load("./templates/catalog/teamControls.hbs");

    await this.partial("./templates/catalog/details.hbs");
  }
};
