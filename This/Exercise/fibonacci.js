function getFibonator() {
  let result = { fib: [] };

  return () => {
    if (result.fib.length === 0 || result.fib.length === 1) {
      result.fib.push(1);
      return 1;
    }

    result.fib.push(
      result.fib[result.fib.length - 1] + result.fib[result.fib.length - 2]
    );

    return result.fib[result.fib.length - 1];
  };
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
