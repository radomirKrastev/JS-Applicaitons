function factory(str) {
  let template = {};

  JSON.parse(str).forEach((x) => Object.assign(template, x));
  return template;
}

console.log(factory(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`));
console.log(
  factory(
    `[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`
  )
);
