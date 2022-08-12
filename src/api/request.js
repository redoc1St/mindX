import axios from 'axios';

const ins = axios.create({
  baseURL: 'http://localhost:8080',

});

ins.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (!token) return config;
  config.headers['authorization'] = `Bearer ${token}`;
  return config;
}, function (error) {
  return Promise.error(error);
})

// ins.interceptors.response.use(function (response) {    //thay res.data =res thôi
//   return response.data;
// }, function (error) {
//   return Promise.reject(error);
// })

export default ins;
