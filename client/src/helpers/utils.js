export function getFormBody(params) {
  let formBody = [];

  for (let key in params) {
    if (params[key] !== '') {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(params[key]);

      formBody.push(encodedKey + '=' + encodedValue);
    }
  }

  return formBody.join('&');
}
