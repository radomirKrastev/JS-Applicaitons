import { contacts } from "./contacts.js";

// function compile(template) {
//   return function(data) {
//     return data.map((x) => {
//       let res = template;
//       Object.keys(x).forEach((y) => {
//         res = res.replace(`{{${y}}}`, x[y]);
//       });

//       return res;
//     });
//   };
// }

// async function main() {
//   try {
//     const template = await fetch("/contact-card.handlebars").then((x) => x.text());
//     let templateFn = compile(template);
//     document.querySelector("#contacts").innerHTML = templateFn(contacts);
//   } catch (e) {
//     console.log(e.message);
//   }
// }

const handleBars = window.Handlebars;

async function main() {
  try {
    const contactCard = await fetch("/contact-card.handlebars").then((x) => x.text());
    const contactCards = await fetch("/contact-cards.handlebars").then((x) => x.text());

    handleBars.registerPartial("contact", contactCard);
    const allContacts = handleBars.compile(contactCards);
    document.body.insertAdjacentHTML("beforeend", allContacts({ contacts }));
  } catch (e) {
    console.log(e.message);
  }
}

function attachEvents() {
  document.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
      let element = document.getElementById(`${e.target.dataset.id}`);

      element.style.display === "none"
        ? (element.style.display = "block")
        : (element.style.display = "none");
    }
  });
}

attachEvents();

main();
