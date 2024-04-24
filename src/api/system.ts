import request from '@/utils/request'

//登录
export const login = function(data:object){
    return request({
        url:"/api/v1/system/sys/login",
        method:'post',
        data:data
    })
}

//注册
export const register = function(data:object){
    return request({
        url:"/api/v1/system/sys/login",
        method:'post',
        data:data
    })
}

