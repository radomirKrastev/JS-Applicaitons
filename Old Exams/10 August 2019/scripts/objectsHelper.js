export let user = { username: "", causesId: [] };

export function changeObjProps(obj, newObj) {
  let keys = Object.keys(obj);
  let newKeys = Object.keys(newObj);

  newKeys.forEach(function(key) {
    if (keys.includes(key)) {
      obj[key] = newObj[key];
    }
  });

  return obj;
}
