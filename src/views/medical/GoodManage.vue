<script setup lang="ts">
import { reactive,onMounted } from 'vue';
import {getGoodsList,deleteGoods} from '@/api/goods'
import {message,Modal} from 'ant-design-vue'

interface Table{
    key:string,
    name:string,
    num:number|undefined,
    uint?:string
    remark:string,
    created_at:string,
    updated_at:string
}

interface Form{
    searchForm:{
        name:string,
        num:number|undefined,
        remark:string,
        created_at:string,
        updated_at:string
    },
    table:Table[]
}

const data = reactive<Form>({
    searchForm:{
        name:'',
        num:undefined,
        remark:'',
        created_at:'',
        updated_at:''
    },
    table:[]
})

const columns = [
    {
        title: '物品名称',
        dataIndex: 'name',
        key: 'name',
        align:'center'
    },
    {
        title: '库存',
        dataIndex: 'num',
        key: 'num',
        align:'center'
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        align:'center'
    },
    {
        title: '创建时间',
        key: 'created_at',
        dataIndex: 'created_at',
        align:'center'
    },
    {
        title: '更新时间',
        key: 'updated_at',
        dataIndex: 'updated_at',
        align:'center'
    },
    {
        title: '操作',
        key: 'action',
        align:'center'
    },
];

const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deleteGoods(id).then(res => {
                if(res.rowAffect == 1){
                    initData()
                    message.success('删除成功')
                }
            })
        },
        onCancel() {
            message.info('取消删除操作')
        },
    });
    
    
}

const initData = () => {
    getGoodsList().then(res => {
        data.table = res.data;  
    })
}

onMounted(() => {
    initData()
})
</script>

<template>
  <div class="user-manage">
    <div class="search">
        <a-form
            :model="data.searchForm"
            name="search"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-row align="middle" justify="center">
                <a-col :span="6">
                    <a-form-item
                        label="物品名称"
                        name="name"
                        >
                            <a-input v-model:value="data.searchForm.name" placeholder="请输入物品名称" />
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="物品备注"
                        name="remark"
                        >
                            <a-input v-model:value="data.searchForm.remark" placeholder="请输入物品备注" />
                        </a-form-item>
                </a-col>
                <a-col :span="6"></a-col>
                <a-col :span="6"></a-col>
            </a-row>
            
        </a-form>

    </div>
    <div class="handle">
        <div class="left">
            <a-button class="btn" type="primary">搜索</a-button>
            <a-button class="btn">重置搜索</a-button>
        </div>
        <div class="right">
            <a-button class="btn" type="primary">新增</a-button>
            <a-button class="btn" type="primary">入库</a-button>
            <a-button class="btn" type="primary">出库</a-button>
        </div>
        
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link">详情</a-button>
                    <a-button type="link">编辑</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                </template>
                <template v-else-if="column.key === 'num'">
                    {{record.num<=0||record.num==undefined?'暂无库存':record.num.toString()+record.uint}}
                </template>
            </template>
        </a-table>
    </div>
    
  </div>
</template>

<style scoped lang="less">
.user-manage{
    height: 100%;
    padding-top: 20px;
    .search{

    }
    .handle{
        height: 50px;
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        .btn{
            margin-right: 20px;
        }
    }
    .table{
        width: 98%;
        margin: 0 auto;
    }
}
</style>
