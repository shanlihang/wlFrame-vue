<script setup lang="ts">
import {reactive,onMounted} from 'vue'
import {selectFeedback,deleteFeedbackById,finishFeedback} from '@/api/feedback'
import {message,Modal} from 'ant-design-vue'
import dayjs from 'dayjs'

interface Table{
    ID?:number,
    content:string,
    status:number,
    CreatedAt?:string,
    UpdatedAt?:string,
    DeletedAt?:string,
}

interface Data{
    searchForm:{
        content:string|undefined,
        status:number|undefined
    },
    table:Array<Table>
}

const data = reactive<Data>({
    searchForm:{
        content:undefined,
        status:undefined
    },
    table:[]
})

const columns = [
    {
        title: '反馈内容',
        dataIndex: 'content',
        key: 'content',
        align:'center',
    },
    {
        title: '处理状态',
        key: 'status',
        dataIndex: 'status',
        align:'center',
        width:'100px'
    },
    {
        title: '反馈时间',
        dataIndex: 'CreatedAt',
        key: 'CreatedAt',
        align:'center',
        width:'200px'
    },
    {
        title: '反馈人',
        dataIndex: 'peopleId',
        key: 'peopleId',
        align:'center',
        width:'200px'
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
        width:'150px'
    },
];

const formatDate = (time:string) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

const resetSearch = () => {
    data.searchForm.content = undefined,
    data.searchForm.status = undefined,
    initData()
}

const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deleteFeedbackById(id).then(res => {
                if(res.rowAffect != 0){
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

const finish = (id:number) => {
    Modal.confirm({
        title: '操作确认',
        content: '您确定已处理这条反馈内容吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            finishFeedback(id).then(res => {
                if(res.rowAffect != 0){
                    message.success('处理完成')
                    initData()
                }
            })
        },
        onCancel() {
            message.info('取消操作')
        },
    });
}

const handleSearch = () => {
    initData()
}

const initData = () => {
    selectFeedback(data.searchForm).then(res => {
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
                        label="反馈内容"
                        name="content"
                        >
                            <a-input v-model:value="data.searchForm.content" placeholder="请输入反馈内容" />
                        </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="反馈状态"
                        name="status"
                        >
                        <a-select
                            ref="select"
                            v-model:value="data.searchForm.status"
                            placeholder="请选择反馈状态"
                        >
                            <a-select-option :value="0">未处理</a-select-option>
                            <a-select-option :value="1">已处理</a-select-option>
                        </a-select>
                        </a-form-item>
                </a-col>
                <a-col :span="6"></a-col>
                <a-col :span="6"></a-col>
            </a-row>
            
        </a-form>

    </div>
    <div class="handle">
        <div class="left">
            <a-button class="btn" type="primary" @click="handleSearch">搜索</a-button>
            <a-button class="btn" @click="resetSearch">重置搜索</a-button>
        </div>        
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button v-if="record.status==0" type="link" @click="finish(record.ID)">完成</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                </template>
                <template v-else-if="column.key === 'status'">
                    <a-tag :color="record.status==0?'warning':'success'">{{record.status==0?'未处理':'已处理'}}</a-tag>
                </template>
                <template v-else-if="column.key === 'CreatedAt'">
                    {{formatDate(record.CreatedAt)}}
                </template>
                <template v-else-if="column.key === 'peopleId'">
                    <a-popover title="居民信息" trigger="hover">
                        <template #content>
                            <p>电话：{{ record.people.phone }}</p>
                            <p>邮箱：{{ record.people.email }}</p>
                        </template>
                        <span style="color: rgb(0, 153, 255);cursor: pointer;">{{ record.people.name }}</span>
                    </a-popover>
                </template>
            </template>
        </a-table>
    </div>
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
