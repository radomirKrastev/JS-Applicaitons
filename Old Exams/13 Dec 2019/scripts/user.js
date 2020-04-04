export let user = { username: "", ideasId: [] };

export function changeUserProps(obj, newObj) {
  let keys = Object.keys(obj);
  let newKeys = Object.keys(newObj);

  newKeys.forEach(function(key) {
    if (keys.includes(key)) {
      obj[key] = newObj[key];
    }
  });

  return obj;
}
