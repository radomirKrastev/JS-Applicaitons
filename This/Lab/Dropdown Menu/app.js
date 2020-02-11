// function app(dropdownId, ulId, boxId) {
//   return {
//     dropdown: document.getElementById(dropdownId),
//     ul: document.getElementById(ulId),
//     box: document.getElementById(boxId),

//     handleEvent: function(e) {
//       if (this.dropdown.isSameNode(e.target)) {
//         this.dropdownClick();
//       } else if (e.target.classList.value.match("deep")) {
//         this.colorBox(e.target.textContent);
//       }
//     },

//     dropdownClick: function() {
//       if (this.ul.style.display === "none" || this.ul.style.display === "") {
//         this.ul.style.display = "block";
//       } else {
//         this.ul.style.display = "none";
//         this.colorBox("");
//       }
//     },

//     colorBox: function(color) {
//       this.box.style.backgroundColor = color;
//     }
//   };
// }

// function solve() {
//   document.addEventListener("DOMContentLoaded", function() {
//     document.addEventListener("click", app("dropdown", "dropdown-ul", "box"));
//   });
// }

// ^^^ the above solution does not pass Judge tests, but I think it is cleaner

function solve() {
  const ul = document.getElementById("dropdown-ul");
  const box = document.getElementById("box");
  box.style.backgroundColor = "black";
  const dropdown = document.getElementById("dropdown");

  function dropdownClick() {
    if (ul.style.display === "none" || ul.style.display === "") {
      ul.style.display = "block";
    } else {
      ul.style.display = "none";
      colorBox();
    }
  }

  function colorBox(e) {
    if (typeof e === "undefined") {
      box.style.color = "white";
      return (box.style.backgroundColor = "black");
    }

    box.style.color = "black";
    return (box.style.backgroundColor = e.target.textContent);
  }

  Array.from(ul.children).forEach((x) => x.addEventListener("click", colorBox));

  dropdown.addEventListener("click", dropdownClick);
}
