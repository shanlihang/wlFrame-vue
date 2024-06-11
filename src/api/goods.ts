import request  from "@/utils/request";

// 查询物品列表
export function getGoodsList(params:object){
    return request({
        url:'/api/v1/medical/goods/list',
        method:'get',
        params:params
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

//修改物品信息
export function updateGoods(data:object){
    return request({
        url:'/api/v1/medical/goods/update',
        method:'put',
        data:data
    })
}

//入库
export function putGood(params:object){
    return request({
        url:'/api/v1/medical/goods/put',
        method:'get',
        params:params
    })
}

// 出库
export function OutGood(params:object){
    return request({
        url:'/api/v1/medical/goods/out',
        method:'get',
        params:params
    })
}