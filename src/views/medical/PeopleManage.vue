<script setup lang="ts">
import {reactive} from 'vue'

import {message,Modal} from 'ant-design-vue'

interface Record{
    name:string;
    sex:number|undefined;
    nation:string;
    birthday:string;
    idnumber:string;
    phone:string;
}

interface Data{
    addFlag:boolean,
    updateFlag:boolean,
    searchForm:Record,
    addForm:Record,
    updateForm:Record,
    table:Array<any>
}

const data = reactive<Data>({
    addFlag:false,
    updateFlag:false,
    searchForm:{
        name:'',
        sex:undefined,
        nation:'',
        birthday:'',
        idnumber:'',
        phone:''
    },
    addForm:{
        name:'',
        sex:undefined,
        nation:'',
        birthday:'',
        idnumber:'',
        phone:''
    },
    updateForm:{
        name:'',
        sex:undefined,
        nation:'',
        birthday:'',
        idnumber:'',
        phone:''
    }
    ,
    table:[
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
        {name:'Lily',sex:0,nation:'汉族',birthday:'2001-02-04',idnumber:'13266',phone:'65161616'},
    ]
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
        title: '操作',
        key: 'action',
        align:'center',
        width:'200px'
    },
];

const handleAddOk = () => {}

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
            // deleteGoods(id).then(res => {
            //     if(res.rowAffect == 1){
            //         initData()
            //         message.success('删除成功')
            //     }
            // })
            message.success('删除成功')
        },
        onCancel() {
            message.info('取消删除操作')
        },
    });
}
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
                        label="居民性别"
                        name="sex"
                        >
                            <a-select
                                ref="select"
                                v-model:value="data.searchForm.sex"
                                placeholder="请选择居民性别"
                                >
                                <a-select-option :value="1">男</a-select-option>
                                <a-select-option :value="0">女</a-select-option>
                            </a-select>
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="居民民族"
                        name="nation"
                        >
                            <a-input v-model:value="data.searchForm.nation" placeholder="请输入居民民族" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="出生日期"
                        name="birthday"
                        >
                            <a-range-picker v-model:value="data.searchForm.birthday" :placeholder="['开始时间', '结束时间']" />
                        </a-form-item>
                </a-col>
            </a-row>
            <a-row align="middle" justify="center">
                <a-col :span="6">
                    <a-form-item
                        label="身份证号"
                        name="idnumber"
                        >
                            <a-input v-model:value="data.searchForm.idnumber" placeholder="请输入居民身份证号" />
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
                    <a-tag>{{ record.sex == 0 ? '女' : '男' }}</a-tag>
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
                <a-select ref="select" v-model:value="data.addForm.sex" placeholder="请选择居民性别">
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="0">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="居民民族" name="nation">
                    <a-input v-model:value="data.addForm.nation" placeholder="请输入居民民族" />
            </a-form-item>
            <a-form-item label="出生日期" name="birthday">
                <a-date-picker v-model:value="data.addForm.birthday" placeholder="请选择出生日期" />
            </a-form-item>
            <a-form-item label="身份证号" name="idnumber">
                <a-input v-model:value="data.addForm.idnumber" placeholder="请输入居民身份证号" />
            </a-form-item>
            <a-form-item label="手机号" name="phone">
                <a-input v-model:value="data.addForm.phone" placeholder="请输入居民手机号" />
            </a-form-item>
        </a-form>
    </a-modal>

    <a-modal v-model:open="data.updateFlag" title="修改居民" okText="确认" cancelText="取消" @ok="handleAddOk">
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
                <a-select ref="select" v-model:value="data.updateForm.sex" placeholder="请选择居民性别">
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="0">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="居民民族" name="nation">
                    <a-input v-model:value="data.updateForm.nation" placeholder="请输入居民民族" />
            </a-form-item>
            <a-form-item label="出生日期" name="birthday">
                <a-date-picker v-model:value="data.updateForm.birthday" placeholder="请选择出生日期" />
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
