import { FetchData } from "./myFetch.js";
import { html } from "./html.js";
const myFetch = new FetchData();
const url = "https://books-e3e80.firebaseio.com";

export const actions = {
  load: async function() {
    try {
      let booksJSON = await myFetch.get(url + "/books.json").then((x) => x.json());
      let books = modifyBooksResponse(booksJSON);
      let result = await populateTemplate(books);
      html.tbody().innerHTML = result;
    } catch (e) {
      console.log(e.message);
    }
  },
  create: async function() {
    try {
      let newBook = getBook();
      let response = await myFetch.post(url + "/books.json", newBook).then((x) => x.json());

      clearForm(html.createForm());
      actions.load();
    } catch (e) {
      console.log(e.message);
    }
  },
  edit: async function(element) {
    try {
      let editedBook = getBook();
      let id = element.parentElement.classList[0];
      let response = await myFetch
        .patch(url + `/books/${id}/.json`, editedBook)
        .then((x) => x.json());

      html.editForm().style.display = "none";
      actions.load();
    } catch (e) {
      console.log(e.message);
    }
  },
  delete: async function(element) {
    try {
      let id = element.parentElement.classList[0];
      let response = await myFetch.delete(url + `/books/${id}/.json`).then((x) => x.json());
      actions.load();
    } catch (e) {
      console.log(e.message);
    }
  }
};

export function formLoad(td) {
  html.editForm().style.display = "block";
  let parent = td.parentElement;
  parent.querySelector("button.edit").disabled = false;
  html.titleEdit().value = parent.dataset.title;
  html.authorEdit().value = parent.dataset.author;
  html.isbnEdit().value = parent.dataset.isbn;
  html.tagsEdit().value = parent.dataset.tags;
}

function clearForm(form) {
  [...form.querySelectorAll(`input`)].map((x) => (x.value = ""));
}

function getBook() {
  if (html.editForm().style.display === "block") {
    return {
      author: html.authorEdit().value,
      isbn: html.isbnEdit().value,
      title: html.titleEdit().value,
      tags: html.tagsEdit().value
    };
  }

  return {
    author: html.authorNew().value,
    isbn: html.isbnNew().value,
    title: html.titleNew().value,
    tags: html.tagsNew().value
  };
}

function modifyBooksResponse(booksJSON) {
  return Object.keys(booksJSON).map(function(key) {
    booksJSON[key].id = key;
    return booksJSON[key];
  });
}

async function populateTemplate(books) {
  let allBooksHdb = await myFetch.get(`./allBooks.handlebars`).then((x) => x.text());
  let bookHdb = await myFetch.get(`./book.handlebars`).then((x) => x.text());

  Handlebars.registerPartial("book", bookHdb);
  let allBooksTemplate = Handlebars.compile(allBooksHdb);
  return allBooksTemplate({ books });
}
