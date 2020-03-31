import { FetchData } from "./myFetch.js";
import { html } from "./html.js";
const myFetch = new FetchData();
const url = "https://students-8511e.firebaseio.com";

async function getCurrentId() {
  let obj = await myFetch.get(url + "/students.json").then((x) => x.json());
  let key = Object.keys(obj)[Object.keys(obj).length - 1];
  let result = obj[key].id ? obj[key].id : 0;
  return result;
}

export const actions = {
  load: async function() {
    try {
      let studentsJSON = await myFetch.get(url + "/students.json").then((x) => x.json());
      let students = modifyBooksResponse(studentsJSON);
      let result = await populateTemplate(students);
      html.tbody().innerHTML = result;
    } catch (e) {
      console.log(e.message);
    }
  },
  create: async function() {
    try {
      let newStudent = await getStudent();
      let response = await myFetch.post(url + `/students.json`, newStudent).then((x) => x.json());

      clearForm(html.createForm());
      actions.load();
    } catch (e) {
      console.log(e.message);
    }
  }
};

async function getStudent() {
  let studentId = (await getCurrentId()) + 1;

  return {
    id: studentId++,
    firstName: html.firstName().value,
    lastName: html.lastName().value,
    facultyNumber: html.facultyNumber().value,
    grade: html.grade().value
  };
}

function clearForm(form) {
  [...form.querySelectorAll(`input`)].map((x) => (x.value = ""));
}

function modifyBooksResponse(studentsJSON) {
  return Object.keys(studentsJSON).map(function(key) {
    return studentsJSON[key];
  });
}

async function populateTemplate(students) {
  let allStudentsHdb = await myFetch.get(`./allStudents.handlebars`).then((x) => x.text());
  let studentHdb = await myFetch.get(`./student.handlebars`).then((x) => x.text());

  Handlebars.registerPartial("student", studentHdb);
  let allStudentsTemplate = Handlebars.compile(allStudentsHdb);
  return allStudentsTemplate({ students });
}
