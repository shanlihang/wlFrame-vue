<script setup lang="ts">
import { onMounted, reactive,ref } from 'vue';
import { getMenuTree,getList,insertPermission,updatePermission,deletePermission } from '@/api/permission';
import {message,Modal} from 'ant-design-vue'
const columns = [   
    {
    title: '编号',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'API',
    dataIndex: 'uri',
    key: 'uri',
  },
  {
    title: '路由',
    dataIndex: 'router',
    key: 'router',
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: '操作',
    key: 'action',
    align:'center'
  },
];

interface Permission{
    ID?:number|undefined,
    name?:string|undefined,
    icon?:string|undefined,
    parentId?:number|undefined,
    type?:number|undefined,
    uri?:string|undefined,
    router?:string|undefined,
    component?:string|undefined,
    created_at?:string|undefined,
    updated_at?:string|undefined,
    deleted_at?:string|undefined
}

interface Data {
    addFlag:boolean,
    updateFlag:boolean,
    addForm:Permission,
    updateForm:Permission,
    table:Permission[],
    list:Permission[],
    label:string[],
    color:string[]
}

const data = reactive<Data>({
    addFlag:false,
    updateFlag:false,
    table:[],
    list:[],
    addForm:{},
    updateForm:{},
    label:['目录','菜单','功能按钮'],
    color:['purple','success','warning']
})

const openAddModal = () => {
    
    data.addFlag=true
}

const handleUpdateOk = () => {
    updatePermission(data.updateForm).then(res => {
        if(res.rowAffect == 1){
            message.success('修改成功')
            initData()
        }
    })
    data.updateFlag = false
    resetUpdate()
}

const handleEdit = (record:Permission) => {
    console.log(record);
    
    data.updateForm = record,
    data.updateFlag = true
}

const handleBaseOk = () => {
    insertPermission(data.addForm).then(res => {
        if(res.rowAffect == 1){
            message.success('新增成功')
            initData()
        }
    })
    data.addFlag = false
    resetAdd()
}

const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条权限吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deletePermission(id).then(res => {
                if(res.rowAffect == 1){
                    message.success('删除成功')
                    initData()
                }
            })
        },
        onCancel() {
            message.info('取消删除操作')
        },
    });
}

const resetAdd = () => {
    data.addForm.ID=undefined
    data.addForm.name=undefined
    data.addForm.icon=undefined
    data.addForm.parentId=undefined
    data.addForm.type=undefined
    data.addForm.uri=undefined
    data.addForm.router=undefined
    data.addForm.component=undefined
}

const resetUpdate = () => {
    data.updateForm.ID=undefined
    data.updateForm.name=undefined
    data.updateForm.icon=undefined
    data.updateForm.parentId=undefined
    data.updateForm.type=undefined
    data.updateForm.uri=undefined
    data.updateForm.router=undefined
    data.updateForm.component=undefined
}

const initData = () => {
    getMenuTree().then(res => {
        data.table = res.data
    })
}

const rowSelection = ref({
  checkStrictly: false,
});

onMounted(() => {
    initData()
    getList().then(res => {
        data.list = res.data
    })
})
</script>

<template>
  <div class="user-manage">
    <div class="handle">
        <a-button class="btn" type="primary" @click="openAddModal">新增</a-button>
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small" :indentSize="80" :row-selection="rowSelection" rowKey="ID">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link" @click="handleEdit(record)">编辑</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                </template>
                <template v-else-if="column.key === 'type'">
                    <span>
                        <a-tag :color="data.color[record.type]">{{ data.label[record.type] }}</a-tag>
                    </span>
                </template>
            </template>
        </a-table>
    </div>

    <a-modal v-model:open="data.addFlag" title="新增权限信息" okText="确认" cancelText="取消" @ok="handleBaseOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.addForm"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item
                label="名称"
                name="name"
                :rules="[{ required: true, message: '名称不能为空' }]"
                >
                <a-input v-model:value="data.addForm.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item
                label="路由"
                name="username"
                >
                <a-input v-model:value="data.addForm.router" placeholder="请输入路由" />
            </a-form-item>
            <a-form-item
                label="API地址"
                name="uri"
                >
                <a-input v-model:value="data.addForm.uri" placeholder="请输入API地址" />
            </a-form-item>
            <a-form-item
                label="权限类型"
                name="type"
                >
                <a-select
                    v-model:value="data.addForm.type"
                    placeholder="请选择权限类型"
                >
                    <a-select-option :value="0">目录</a-select-option>
                    <a-select-option :value="1">菜单</a-select-option>
                    <a-select-option :value="2">按钮</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="父权限"
                name="parentId"
                :rules="[{ required: true, message: '父权限不能为空' }]"
                >
                <a-select
                    v-model:value="data.addForm.parentId"
                    placeholder="请选择父权限"
                    >
                    <a-select-option v-for="item in data.list" :key="item.ID" :value="item.ID">{{ item.name }}</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>

    <a-modal v-model:open="data.updateFlag" title="修改权限信息" okText="确认" cancelText="取消" @ok="handleUpdateOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.addForm"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item
                label="名称"
                name="name"
                :rules="[{ required: true, message: '名称不能为空' }]"
                >
                <a-input v-model:value="data.updateForm.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item
                label="路由"
                name="username"
                >
                <a-input v-model:value="data.updateForm.router" placeholder="请输入路由" />
            </a-form-item>
            <a-form-item
                label="API地址"
                name="uri"
                >
                <a-input v-model:value="data.updateForm.uri" placeholder="请输入API地址" />
            </a-form-item>
            <a-form-item
                label="权限类型"
                name="type"
                >
                <a-select
                    v-model:value="data.updateForm.type"
                    placeholder="请选择权限类型"
                >
                    <a-select-option :value="0">目录</a-select-option>
                    <a-select-option :value="1">菜单</a-select-option>
                    <a-select-option :value="2">按钮</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="父权限"
                name="parentId"
                :rules="[{ required: true, message: '父权限不能为空' }]"
                >
                <a-select
                    v-model:value="data.updateForm.parentId"
                    placeholder="请选择父权限"
                    >
                    <a-select-option v-for="item in data.list" :key="item.ID" :value="item.ID">{{ item.name }}</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.user-manage{
    height: 100%;
    padding-top: 20px;
    .handle{
        height: 50px;
        display: flex;
        // justify-content: right;
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
