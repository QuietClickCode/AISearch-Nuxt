import axios from 'axios'

// 设置baseURL
axios.defaults.baseURL = 'http://114.55.94.186'

// 创建axios对象，暴露
export default axios.create()
