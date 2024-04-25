import request  from "@/utils/request";

// 查询结果列表
export function getGoodsList(){
    return request({
        url:'/api/v1/medical/result/list',
        method:'get'
    })
}


// 新增结果
export function addGoods(data:object){
    return request({
        url:'/api/v1/medical/result/add',
        method:'post',
        data:data
    })
}

// 删除结果
export function deleteGoods(id:number){
    return request({
        url:'/api/v1/medical/result/'+id,
        method:'delete',
    })
}