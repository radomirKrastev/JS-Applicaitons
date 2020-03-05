import { fetchData } from "./fetchData.js";
import { fetchWithCache } from "./cache.js";

export class Data {
  constructor(url) {
    this.url = url;
    this.myFetch = fetchWithCache(fetchData.bind(Window, undefined, undefined), 10000);
  }

  getPosts() {
    return this.myFetch(`${this.url}/posts.json`);
  }

  getPost(id) {
    return this.myFetch(`${this.url}/posts/${id}.json`);
  }

  getComments() {
    return this.myFetch(`${this.url}/comments.json`);
  }
}
