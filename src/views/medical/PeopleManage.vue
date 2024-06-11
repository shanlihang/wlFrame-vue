<script setup lang="ts">
import {onMounted, reactive} from 'vue'
import {deletePeopleById,selectPeople,insertPeople,updatePeople} from '@/api/people'
import {message,Modal} from 'ant-design-vue'

interface Record{
    name:string|undefined;
    sex:string|undefined;
    nation?:string|undefined;
    birthday?:string|undefined;
    idnumber:string|undefined;
    phone?:string|undefined;
    email?:string|undefined
}

interface Search{
    name:string|undefined,
    email:string|undefined,
    idnumber:string|undefined,
    phone:string|undefined
}

interface Data{
    addFlag:boolean,
    updateFlag:boolean,
    searchForm:Search,
    addForm:Record,
    updateForm:Record,
    table:Array<any>
}

const data = reactive<Data>({
    addFlag:false,
    updateFlag:false,
    searchForm:{
        name:undefined,
        email:undefined,
        idnumber:undefined,
        phone:undefined
    },
    addForm:{
        name:undefined,
        sex:undefined,
        nation:undefined,
        birthday:undefined,
        idnumber:undefined,
        phone:undefined,
        email:undefined
    },
    updateForm:{
        name:undefined,
        sex:undefined,
        nation:undefined,
        birthday:undefined,
        idnumber:undefined,
        phone:undefined
    },
    table:[]
})

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align:'center',
    },
    {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        align:'center',
    },
    {
        title: '民族',
        dataIndex: 'nation',
        key: 'nation',
        align:'center',
    },
    {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'birthday',
        align:'center',
    },
    {
        title: '身份证号',
        dataIndex: 'idnumber',
        key: 'idnumber',
        align:'center',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        align:'center',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align:'center',
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
        width:'200px'
    },
];

const resetSearch = () => {
    data.searchForm.name=undefined,
    data.searchForm.email=undefined,
    data.searchForm.idnumber=undefined,
    data.searchForm.phone=undefined,
    initData()
}

const resetAdd = () => {
    data.addForm.name=undefined,
    data.addForm.sex=undefined,
    data.addForm.nation=undefined,
    data.addForm.birthday=undefined,
    data.addForm.idnumber=undefined,
    data.addForm.phone=undefined,
    data.addForm.email=undefined
}

const handleAddOk = () => {
    insertPeople(data.addForm).then(res => {
        if(res.rowAffect == 1){
            message.success('新增成功')
            initData()
        }
    })
    data.addFlag = false
    resetAdd()
}

const handleUpdateOk = () => {
    updatePeople(data.updateForm).then(res => {
        if(res.rowAffect == 1){
            message.success('修改成功')
            initData()
        }
    })
    data.updateFlag = false
}

const handleUpdate = (record:Record) => {
    data.updateForm = record
    data.updateFlag = true
}

const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deletePeopleById(id).then(res => {
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

const handleSearch = () => {
    initData()
}

const initData = () => {
    selectPeople(data.searchForm).then(res => {
        data.table = res.data
    })
}

onMounted(() => {
    initData()
})
</script>

<template>
  <div class="feedBack">
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
                        label="居民姓名"
                        name="name"
                        >
                            <a-input v-model:value="data.searchForm.name" placeholder="请输入居民姓名" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="居民邮箱"
                        name="email"
                        >
                            <a-input v-model:value="data.searchForm.email" placeholder="请输入居民邮箱" />
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="手机号"
                        name="phone"
                        >
                            <a-input v-model:value="data.searchForm.phone" placeholder="请输入居民手机号" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="身份证号"
                        name="idnumber"
                        >
                            <a-input v-model:value="data.searchForm.idnumber" placeholder="请输入居民身份证号" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>
    <div class="handle">
        <div class="left">
            <a-button class="btn" type="primary" @click="handleSearch">搜索</a-button>
            <a-button class="btn" @click="resetSearch">重置搜索</a-button>
        </div>        
        <div class="right">
            <a-button class="btn" type="primary" @click="data.addFlag=true">新增</a-button>
        </div>
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link" @click="handleUpdate(record)">编辑</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                </template>
                <template v-else-if="column.key === 'sex'">
                    <a-tag>{{ record.sex }}</a-tag>
                </template>
            </template>
        </a-table>
    </div>

    <a-modal v-model:open="data.addFlag" title="新增居民" okText="确认" cancelText="取消" @ok="handleAddOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.addForm"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item label="居民姓名" name="name">
                    <a-input v-model:value="data.addForm.name" placeholder="请输入居民姓名" />
            </a-form-item>
            <a-form-item label="居民性别" name="sex">
                <a-select v-model:value="data.addForm.sex" placeholder="请选择居民性别">
                    <a-select-option value="男">男</a-select-option>
                    <a-select-option value="女">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="居民民族" name="nation">
                    <a-input v-model:value="data.addForm.nation" placeholder="请输入居民民族" />
            </a-form-item>
            <a-form-item label="出生日期" name="birthday">
                <a-date-picker valueFormat="YYYY-MM-DD" v-model:value="data.addForm.birthday" placeholder="请选择出生日期" />
            </a-form-item>
            <a-form-item label="身份证号" name="idnumber">
                <a-input v-model:value="data.addForm.idnumber" placeholder="请输入居民身份证号" />
            </a-form-item>
            <a-form-item label="手机号" name="phone">
                <a-input v-model:value="data.addForm.phone" placeholder="请输入居民手机号" />
            </a-form-item>
            <a-form-item label="邮箱" name="email">
                <a-input v-model:value="data.addForm.email" placeholder="请输入居民邮箱" />
            </a-form-item>
        </a-form>
    </a-modal>

    <a-modal v-model:open="data.updateFlag" title="修改居民" okText="确认" cancelText="取消" @ok="handleUpdateOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.updateForm"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item label="居民姓名" name="name">
                <a-input v-model:value="data.updateForm.name" placeholder="请输入居民姓名" />
            </a-form-item>
            <a-form-item label="居民性别" name="sex">
                <a-select v-model:value="data.updateForm.sex" placeholder="请选择居民性别">
                    <a-select-option value="男">男</a-select-option>
                    <a-select-option value="女">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="居民民族" name="nation">
                    <a-input v-model:value="data.updateForm.nation" placeholder="请输入居民民族" />
            </a-form-item>
            <a-form-item label="出生日期" name="birthday">
                <a-date-picker valueFormat="YYYY-MM-DD" v-model:value="data.updateForm.birthday" placeholder="请选择出生日期" />
            </a-form-item>
            <a-form-item label="身份证号" name="idnumber">
                <a-input v-model:value="data.updateForm.idnumber" placeholder="请输入居民身份证号" />
            </a-form-item>
            <a-form-item label="手机号" name="phone">
                <a-input v-model:value="data.updateForm.phone" placeholder="请输入居民手机号" />
            </a-form-item>
        </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.feedBack{
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
