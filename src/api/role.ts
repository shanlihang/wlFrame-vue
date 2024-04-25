import request  from "@/utils/request";

// 查询角色列表
export function getRoleList(){
    return request({
        url:'/api/v1/system/role/list',
        method:'get'
    })
}

// 根据id查询角色
export function getRoleById(id:number){
    return request({
        url:'/api/v1/system/role/'+id,
        method:'get'
    })
}

// 新增角色
export function addRole(data:object){
    return request({
        url:'/api/v1/system/role/add',
        method:'post',
        data:data
    })
}

// 删除角色
export function deleteRole(id:number){
    return request({
        url:'/api/v1/system/role/'+id,
        method:'delete',
    })
}