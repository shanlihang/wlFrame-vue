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
export function selectFeedback(){
    return request({
        url:'/api/v1/medical/feedback/list',
        method:'get'
    })
}

//根据id删除反馈
export function deleteFeedbackById(id:number){
    return request({
        url:'/api/v1/medical/feedback/'+id,
        method:'delete',
    })
}