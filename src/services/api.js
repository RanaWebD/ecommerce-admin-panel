import axios from "axios";

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers["Access-Control-Allow-Origin"] = '*';
    // axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
  } else {
    delete axios.defaults.headers.common["Authorization"];
    axios.defaults.headers["Access-Control-Allow-Origin"] = '*';
    // axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
  }
}
// method - the HTTP verb you want to use
// path - the route path / endpoint
// data - (optional) data in JSON form for POST requests

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
