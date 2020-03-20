import { html } from "./html.js";

export function getBook() {
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
