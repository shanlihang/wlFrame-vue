import request from '@/utils/request'

export const getMenuList = function(){
    return request({
        url:"/api/v1/system/menu/list",
        method:'get'
    })
}