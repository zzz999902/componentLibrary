import axios from 'axios';

const ins = axios.create(); // 创建一个axios的实例
ins.interceptors.response.use(function (resp) {
  return resp;
});

export default ins;
