function assembleCar(carData) {
  const engines = [
    { power: 90, volume: 1800 },
    { power: 120, volume: 2400 },
    { power: 200, volume: 3500 }
  ];

  return {
    model: carData.model,
    engine: engines.find((x) => carData.power <= x.power),
    carriage: { type: carData.carriage, color: carData.color },
    wheels:
      carData.wheelsize % 2 === 0
        ? new Array(4).fill(carData.wheelsize - 1)
        : new Array(4).fill(carData.wheelsize)
  };
}

console.log(
  assembleCar({ model: "Opel Vectra", power: 110, color: "grey", carriage: "coupe", wheelsize: 17 })
);

console.log(
  assembleCar({
    model: "VW Golf II",
    power: 90,
    color: "blue",
    carriage: "hatchback",
    wheelsize: 14
  })
);
