<script setup lang="ts">
import { reactive } from 'vue';

interface Table{
    key:string,
    name:string,
    desc:string,
    created_at:string
}

interface SearchForm{
    searchForm:{
        name:string,
        desc:string,
    },
    table:Table[]
}

const data = reactive<SearchForm>({
    searchForm:{
        name:'',
        desc:''
    },
    table:[
        {
            key: '1',
            name: 'John Brown',
            desc:'string',
            created_at:'2024-04-30'
        },
        {
            key: '2',
            name: 'John Brown',
            desc:'string',
            created_at:'2024-04-30'
        },
        {
            key: '3',
            name: 'John Brown',
            desc:'string',
            created_at:'2024-04-30'
        },
]
})

const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        align:'center'
    },
    {
        title: '角色描述',
        dataIndex: 'desc',
        key: 'desc',
        align:'center'
    },
    {
        title: '创建时间',
        key: 'created_at',
        dataIndex: 'created_at',
        align:'center'
    },
    {
        title: '操作',
        key: 'action',
        align:'center'
    },
];
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
                        label="角色姓名"
                        name="name"
                        >
                            <a-input v-model:value="data.searchForm.name" placeholder="请输入角色姓名" />
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="角色描述"
                        name="desc"
                        >
                            <a-input v-model:value="data.searchForm.desc" placeholder="请输入角色描述" />
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
        
        <a-button class="btn" type="primary">新增</a-button>
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link">详情</a-button>
                    <a-button type="link">编辑</a-button>
                    <a-button type="link" danger>删除</a-button>
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
