import request from '@/utils/request'

export const getMenuList = function(){
    return request({
        url:"/api/v1/system/permission/menu",
        method:'get'
    })
}

export const getList = function(){
    return request({
        url:"/api/v1/system/permission/common",
        method:'get'
    })
}

// 获取全部树状菜单
export const getMenuTree = function(){
    return request({
        url:"/api/v1/system/permission/tree",
        method:'get'
    })
}


// 新增
export const insertPermission = function(data:object){
    return request({
        url:"/api/v1/system/permission/add",
        method:'post',
        data:data
    })
}


// 修改
export const updatePermission = function(data:object){
    return request({
        url:"/api/v1/system/permission/change",
        method:'put',
        data:data
    })
}

// 删除
export const deletePermission = function(id:number){
    return request({
        url:"/api/v1/system/permission/"+id,
        method:'delete',
    })
}