import { fetchData } from "./fetchData.js";

export class Handler {
  constructor(url) {
    this.url = url;
  }

  getTowns() {
    return fetchData(`${this.url}locations.json`);
  }
  getTodayWeather(code) {
    return fetchData(`${this.url}forecast/today/${code}.json`);
  }
  getUpcomingWeather(code) {
    return fetchData(`${this.url}forecast/upcoming/${code}.json`);
  }
}
