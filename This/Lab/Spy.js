function spy(target, method) {
  const original = target[method];

  const result = { count: 0 };

  target[method] = function() {
    result.count++;
    return original.apply(target, arguments);
  };

  return result;
}

let obj = {
  method: () => "invoked"
};
let spy1 = spy(obj, "method");

obj.method();
obj.method();
obj.method();

console.log(spy1); // { count: 3 }

let spy2 = spy(console, "log");

console.log(spy2); // { count: 1 }
console.log(spy2); // { count: 2 }
console.log(spy2); // { count: 3 }

// VVV the implementation below is more advanced and it is more suitable for real project

// function spy(object, method) {
//   let result = {
//     count: 0
//   };

//   object.result = result;

//   return new Proxy(object, {
//     get: function(obj, prop) {
//       if (Reflect.get(obj, prop)) {
//         if (method === prop) {
//           result.count++;
//         }

//         return Reflect.get(obj, prop);
//       } else {
//         console.log(`Prop ${prop} not found!`);
//         return () => {};
//       }
//     }
//   });
// }

// let obj = {
//   method: () => "invoked"
// };
// let spy1 = spy(obj, "method");

// console.log(obj.method());
// console.log(spy1.method());
// spy1.notAMethod();

// console.log(spy1.result); // { count: 3 }

// let spy2 = spy(console, "log");

// console.log(spy2.log);
// console.log(spy2.log);
// console.log(spy2.log);

// console.log(spy2.result);
