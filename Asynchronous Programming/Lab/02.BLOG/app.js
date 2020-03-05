import { showPostData, loadPosts } from "./views.js";
import { Data } from "./data.js";

const urlTemplate = "https://blog-apps-c12bf.firebaseio.com";
const data = new Data(urlTemplate);

const actions = {
  btnLoadPosts: async function() {
    const posts = await data.getPosts();
    loadPosts(posts, html);
  },
  btnViewPost: async function() {
    const post = await data.getPost(html.select().value);
    const comments = await data.getComments();
    showPostData(post, comments, html);
  }
};

const html = {
  select: () => document.querySelector("#posts"),
  title: () => document.querySelector("#post-title"),
  body: () => document.querySelector("#post-body"),
  comments: () => document.querySelector("#post-comments")
};

function handleEvent(e) {
  if (typeof actions[e.target.id] === "function") {
    actions[e.target.id]();
  }
}

function attachEvents() {
  document.addEventListener("click", handleEvent);
}

attachEvents();
