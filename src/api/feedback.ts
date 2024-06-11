import request  from "@/utils/request";

//插入一个反馈
export function insertFeedback(data:object){
    return request({
        url:'/api/v1/medical/feedback/add',
        method:'post',
        data
    })
}

//获取反馈列表
export function selectFeedback(params:object){
    return request({
        url:'/api/v1/medical/feedback/list',
        method:'get',
        params:params
    })
}

//根据id删除反馈
export function deleteFeedbackById(id:number){
    return request({
        url:'/api/v1/medical/feedback/'+id,
        method:'delete',
    })
}

//根据id完成反馈
export function finishFeedback(id:number){
    return request({
        url:'/api/v1/medical/feedback/'+id,
        method:'put',
    })
}