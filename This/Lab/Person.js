class Person {
  _firstName;
  _lastName;
  _fullName;

  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    return (this._firstName = value);
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    return (this._lastName = value);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    let parts = value.split(" ");
    if (parts.length === 2) {
      this.firstName = parts[0];
      this.lastName = parts[1];
    }
  }
}
