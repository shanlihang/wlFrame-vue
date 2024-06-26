import request  from "@/utils/request";

// 查询用户列表
export function getUserList(params:object){
    return request({
        url:'/api/v1/system/user/list',
        method:'get',
        params:params
    })
}

// 新增用户
export function addUser(data:object){
    return request({
        url:'/api/v1/system/user/add',
        method:'post',
        data:data
    })
}

// 删除用户
export function deleteUser(id:number){
    return request({
        url:'/api/v1/system/user/'+id,
        method:'delete',
    })
}

//修改用户
export function udpateUser(data:object){
    return request({
        url:'/api/v1/system/user/change',
        method:'put',
        data:data
    })
}