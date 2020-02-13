class Company {
  _departments;
  _departmentsData;
  constructor() {
    this._departments = [];
    this._departmentsData = [];
  }

  addEmployee(username, salary, position, department) {
    if (this._validateValue.apply([username, salary, position, department])) {
      let employee = {
        username: `${username}`,
        salary: `${salary}`,
        position: `${position}`,
        department: `${department}`
      };

      this._departments.push(employee);

      let dep = this._departmentsData.find((x) => x.name === department);

      if (typeof dep === "undefined") {
        dep = { name: department, totalSalaries: 0, count: 0 };
        this._departmentsData.push(dep);
      }

      dep.totalSalaries += salary;
      dep.count++;
      return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    throw new Error("Invalid input!");
  }

  bestDepartment() {
    let bestDepartment = this._departmentsData.sort(
      (a, b) =>
        this._findAverageSalary.call(b) - this._findAverageSalary.call(a)
    )[0];

    let average = this._findAverageSalary.call(bestDepartment);

    let result = `Best Department is: ${bestDepartment.name}\n`;
    result += `Average salary: ${average.toFixed(2)}`;

    this._departments
      .filter((x) => x.department === bestDepartment.name)
      .sort((a, b) => {
        let result = b.salary - a.salary;

        if (result === 0) {
          return a.username.localeCompare(b.username);
        }

        return result;
      })
      .forEach((x) => (result += `\n${x.username} ${x.salary} ${x.position}`));

    return result;
  }

  _findAverageSalary() {
    return this.totalSalaries / this.count;
  }

  _validateValue() {
    for (let i = 0; i < this.length; i++) {
      if (typeof this[i] === "undefined" || this[i] === null) {
        return false;
      }

      if ((!isNaN(this[i]) && this[i] === "") || this[i] < 0) {
        return false;
      }
    }

    return true;
  }
}

let c = new Company();
c.addEmployee("Aribe", 0, "engineer", "Construction");
c.addEmployee("Besho", 50000, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Atan", 50000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Ziko", 500, "graphical designer", "Marketing");
c.addEmployee("Gosho", 250, "HR", "Human resources");
console.log(c.bestDepartment());
