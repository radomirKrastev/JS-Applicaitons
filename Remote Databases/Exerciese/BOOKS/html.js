export const html = {
  tbody: () => document.querySelector("tbody"),
  titleNew: () => document.getElementById("title"),
  authorNew: () => document.getElementById("author"),
  isbnNew: () => document.getElementById("isbn"),
  tagsNew: () => document.getElementById("tags"),
  createForm: () => document.getElementById("create-form"),
  editForm: () => document.getElementById("edit-form"),
  titleEdit: () => document.getElementById("edit-title"),
  authorEdit: () => document.getElementById("edit-author"),
  isbnEdit: () => document.getElementById("edit-isbn"),
  tagsEdit: () => document.getElementById("edit-tags")
};
