export function getFormBody(params) {
  let formBody = [];

  for (let key in params) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(params[key]);

    formBody(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
}
