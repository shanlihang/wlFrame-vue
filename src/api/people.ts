import request  from "@/utils/request";

//新增居民
export function insertPeople(data:object){
    return request({
        url:'/api/v1/medical/people/add',
        method:'post',
        data
    })
}

//修改居民
export function updatePeople(data:object){
    return request({
        url:'/api/v1/medical/people/update',
        method:'put',
        data
    })
}

//获取居民列表
export function selectPeople(params:object){
    return request({
        url:'/api/v1/medical/people/list',
        method:'get',
        params:params
    })
}

//根据id删除居民
export function deletePeopleById(id:number){
    return request({
        url:'/api/v1/medical/people/'+id,
        method:'delete',
    })
}