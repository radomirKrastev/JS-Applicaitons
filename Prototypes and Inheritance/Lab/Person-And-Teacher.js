function solve() {
  class Person {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }

    toString() {
      return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
    }
  }

  class Teacher extends Person {
    constructor(name, email, subject) {
      super(name, email);
      this.subject = subject;
    }

    toString() {
      return `${super.toString().substr(0, super.toString().length - 1)}, subject: ${
        this.subject
      })`;
    }
  }

  class Student extends Person {
    constructor(name, email, course) {
      super(name, email);
      this.course = course;
    }

    toString() {
      return `${super.toString().substr(0, super.toString().length - 1)}, course: ${this.course})`;
    }
  }

  return { Person, Teacher, Student };
}

let result = solve();
let teacher = new result.Teacher("John", "Dow", "Physics");
let str = teacher.toString();

function classToExtend(c) {
  c.prototype.species = "Human";
  c.prototype.toSpeciesString = function() {
    return `I am a ${this.species}. ${this.toString()}`;
  };
}

classToExtend(result.Person);
let person = new result.Person("Mike", "Tyson");

let pStr = person.toSpeciesString();
let c = person.species;
