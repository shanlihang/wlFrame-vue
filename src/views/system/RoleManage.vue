<script setup lang="ts">
import { reactive,onMounted } from 'vue';
import {getRoleList,deleteRole,addRole} from '@/api/role'
import {getMenuTree} from '@/api/permission'
import { message,Modal } from 'ant-design-vue';
import { TreeSelect } from 'ant-design-vue';
import dayjs from 'dayjs'

interface Table{
    key?:string,
    name:string,
    desc:string,
    permissions:any[]
    created_at?:string
}

interface Data{
    addModal:boolean,
    searchForm:{
        name:string,
        desc:string,
    },
    table:Table[],
    addForm:Table,
    permission:any[]
}

const data = reactive<Data>({
    addModal:false,
    searchForm:{
        name:'',
        desc:''
    },
    table:[],
    addForm:{
        name:'',
        desc:'',
        permissions:[]
    },
    permission:[]
    
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
        key: 'CreatedAt',
        dataIndex: 'CreatedAt',
        align:'center'
    },
    {
        title: '操作',
        key: 'action',
        align:'center'
    },
];

const formatDate = (time:string) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deleteRole(id).then(res => {
                if(res.rowAffect == 1){
                    initData()
                    message.info('删除成功')
                }
            })
        },
        onCancel() {
            message.info('取消删除操作')
        },
    });
    
    
}

const initData = () => {
    getRoleList().then(res => {
        data.table = res.data
    })
}

const handleBaseOk = () => {
    addRole(data.addForm).then(res => {
        if(res.rowAffect == 1){
            initData()
            message.info('添加成功')
        }
    data.addModal = false
        
    })
    
}

onMounted(() => {
    initData()
    getMenuTree().then(res => {
        data.permission = res.data
    })
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
        
        <a-button class="btn" type="primary" @click="data.addModal=true">新增</a-button>
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link">编辑</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button> 
                </template>
                <template v-else-if="column.key === 'CreatedAt'">
                    {{formatDate(record.CreatedAt)}}
                </template>
            </template>
        </a-table>
    </div>
    <a-modal v-model:open="data.addModal" title="新增角色信息" okText="确认" cancelText="取消" @ok="handleBaseOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.addForm"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item
                label="角色名称"
                name="name"
                :rules="[{ required: true, message: '角色名称不能为空' }]"
                >
                <a-input v-model:value="data.addForm.name" placeholder="请输入角色名称" />
            </a-form-item>
            <a-form-item
                label="角色描述"
                name="desc"
                :rules="[{ required: true, message: '角色描述不能为空' }]"
                >
                <a-textarea :auto-size="{ minRows: 2, maxRows: 5 }" v-model:value="data.addForm.desc" placeholder="请输入角色描述" />
            </a-form-item>
            <a-form-item
                label="角色权限"
                name="permissions"
                :rules="[{ required: true, message: '角色权限不能为空' }]"
            >
            <a-tree-select
                :fieldNames="{children:'children', label:'name', value: 'ID' }"
                v-model:value="data.addForm.permissions"
                style="width: 100%"
                :tree-data="data.permission"
                tree-checkable
                allow-clear
                treeCheckStrictly
                :show-checked-strategy="SHOW_PARENT"
                placeholder="请为用户分配权限"
                tree-node-filter-prop="label"
            />
            </a-form-item>
        </a-form>
    </a-modal>
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
