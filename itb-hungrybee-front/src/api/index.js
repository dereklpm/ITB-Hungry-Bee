import axios from "axios"

const client = axios.create({
  baseURL: '/api'
});

client.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json';

  return config;
})

export default client