import request  from "@/utils/request";

//插入一个社区
export function insertCommunity(data:object){
    return request({
        url:'/api/v1/medical/community/add',
        method:'post',
        data
    })
}

//获取社区列表
export function selectCommunity(params:object){
    return request({
        url:'/api/v1/medical/community/list',
        method:'get',
        params:params
    })
}

//根据id删除社区
export function deleteCommunityById(id:number){
    return request({
        url:'/api/v1/medical/community/'+id,
        method:'delete',
    })
}