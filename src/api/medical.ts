import request  from "@/utils/request";

// 查询社区列表
export function getMedicalList(){
    return request({
        url:'/api/v1/medical/community/list',
        method:'get'
    })
}


// 新增社区
export function addMedical(data:object){
    return request({
        url:'/api/v1/medical/community/add',
        method:'post',
        data:data
    })
}

// 删除社区
export function deleteMedical(id:number){
    return request({
        url:'/api/v1/medical/community/'+id,
        method:'delete',
    })
}