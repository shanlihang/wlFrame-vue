import request  from "@/utils/request";

//新增推送
export function insertPush(data:object){
    return request({
        url:'/api/v1/medical/push/add',
        method:'post',
        data
    })
}

//获取推送列表
export function selectPush(){
    return request({
        url:'/api/v1/medical/push/list',
        method:'get'
    })
}

//根据id删除推送
export function deletePushById(id:number){
    return request({
        url:'/api/v1/medical/push/'+id,
        method:'delete',
    })
}