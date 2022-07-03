import axios from 'axios'
import Cookies from 'universal-cookie'

axios.interceptors.request.use(config => {
  const cookies = new Cookies()
  const at = cookies.get('accessToken')
  if (at) {
    config.headers.Authorization = at
  }
  return config
})

axios.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

export default axios
