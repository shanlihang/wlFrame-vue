import axios from 'axios'

const request = axios.create({
    baseURL:'http://localhost:9090',
    timeout:5000
})

request.interceptors.response.use(
    (response) => {
        const res = response.data
        return res
    }
)
export default request