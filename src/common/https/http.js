import axios from 'axios';

axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.defaults.withCredentials = true;

axios.interceptors.request.use((request) => {
  return request;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // TODO: 401 鉴权失败处理
  return Promise.reject(error);
});

export default axios;
