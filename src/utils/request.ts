import axios from 'axios'
import { Session } from '@/utils/storage'


const request = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么 token
        if (Session.get('token')) {
            config.headers!['Authorization'] = `Bearer ${Session.get('token')}`;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);


request.interceptors.response.use(
    (response) => {
        const res = response.data
        return res
    }
)
export default request