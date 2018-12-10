import axios from 'axios';
import http from './baseAjax';
//const host = 'app';
const host = 'http://61.191.56.32:8088/app';
export default {
  login: (params) => axios.post(`${host}/loginIn`, params),
  currentOrders: (params) => http(`${host}/currentOrders`, params),
  scanByUser: (params) => http(`${host}/scanByUser`, params),
  getPayImage: (params) => http(`${host}/getPayImage`, params),
  createOrder: (params) => http(`${host}/createOrder`, params),
  busorderDetail: (params) => http(`${host}/busorderDetail`, params),
}
