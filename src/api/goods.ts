import request  from "@/utils/request";

// 查询物品列表
export function getGoodsList(){
    return request({
        url:'/api/v1/medical/goods/list',
        method:'get'
    })
}


// 新增物品
export function addGoods(data:object){
    return request({
        url:'/api/v1/medical/goods/add',
        method:'post',
        data:data
    })
}

// 删除物品
export function deleteGoods(id:number){
    return request({
        url:'/api/v1/medical/goods/'+id,
        method:'delete',
    })
}