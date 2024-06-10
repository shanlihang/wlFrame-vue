import request  from "@/utils/request";

//新增居民
export function insertPeople(data:object){
    return request({
        url:'/api/v1/medical/push/add',
        method:'post',
        data
    })
}

//获取居民列表
export function selectPeople(){
    return request({
        url:'/api/v1/medical/push/list',
        method:'get'
    })
}

//根据id删除居民
export function deletePeopleById(id:number){
    return request({
        url:'/api/v1/medical/push/'+id,
        method:'delete',
    })
}


//新增反馈
export function insertFeedback(data:object){
    return request({
        url:'/api/v1/medical/push/add',
        method:'post',
        data
    })
}

//获取反馈列表
export function selectFeedback(){
    return request({
        url:'/api/v1/medical/push/list',
        method:'get'
    })
}

//根据id删除反馈
export function deleteFeedbackById(id:number){
    return request({
        url:'/api/v1/medical/push/'+id,
        method:'delete',
    })
}