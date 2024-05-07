<script setup lang="ts">
import { reactive,onMounted } from 'vue';
import {getUserList,deleteUser,addUser} from '@/api/user'

interface Table{
    key:string,
    name:string,
    sex:number,
    phone:string,
    email:string,
    birthday:string,
    roles:string[],
}

interface SearchForm{
    searchForm:{
        name:string,
        sex:number|undefined,
        phone:string,
        email:string
    },
    table:Table[]
}

const data = reactive<SearchForm>({
    searchForm:{
        name:'',
        sex:undefined,
        phone:'',
        email:''
    },
    table:[]
})

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align:'center'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        align:'center'
    },
    {
        title: '角色',
        key: 'roles',
        dataIndex: 'roles',
        align:'center'
    },
    {
        title: '电话',
        key: 'phone',
        dataIndex: 'phone',
        align:'center'
    },
    {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email',
        align:'center'
    },
    {
        title: '出生日期',
        key: 'birthday',
        dataIndex: 'birthday',
        align:'center'
    },
    {
        title: '操作',
        key: 'action',
        align:'center'
    },
];

const initData = () => {
    getUserList().then(res => {
        data.table = res.data
        
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
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-row align="middle" justify="center">
                <a-col :span="6">
                    <a-form-item
                        label="姓名"
                        name="name"
                        >
                            <a-input v-model:value="data.searchForm.name" placeholder="请输入姓名" />
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="性别"
                        name="sex"
                        >
                        <a-select
                            v-model:value="data.searchForm.sex"
                            placeholder="请选择性别"
                            >
                            <a-select-option :value="1">男</a-select-option>
                            <a-select-option :value="0">女</a-select-option>
                        </a-select>
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="电话"
                        name="phone"
                        >
                            <a-input v-model:value="data.searchForm.phone" placeholder="请输入电话" />
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="邮箱"
                        name="email"
                        >
                            <a-input v-model:value="data.searchForm.email" placeholder="请输入邮箱" />
                    </a-form-item>
                </a-col>
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
                    <a-button type="link">编辑</a-button>
                    <a-button type="link" danger>删除</a-button>
                </template>
                <template v-else-if="column.key === 'sex'">
                    <span>
                        <a-tag>{{ record.sex==0?'女':'男' }}</a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'roles'">
                    <span>
                        <a-tag
                            v-for="role in record.roles"
                            :key="role"
                            :color="role === 'loser' ? 'volcano' : role.length > 5 ? 'geekblue' : 'green'"
                        >
                            {{ role.toUpperCase() }}
                        </a-tag>
                    </span>
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
