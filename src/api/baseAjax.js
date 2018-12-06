import axios from 'axios';
export default (url, params) => {
  return axios.post(url, params).then(res => {
    return res.data
  })
}
