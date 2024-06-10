<script setup lang="ts">
import {reactive} from 'vue'
import { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];

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
        content:string,
        status:number|undefined
    },
    table:Array<Table>
}

const data = reactive<Data>({
    searchForm:{
        content:'',
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
        dataIndex: 'personId',
        key: 'personId',
        align:'center',
        width:'200px'
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
        width:'100px'
    },
];

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
                        label="反馈时间"
                        name="time"
                        >
                            <a-range-picker v-model:value="data.searchForm.time" show-time style="width: 400px;" :placeholder="['开始时间', '结束时间']" />
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
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link">完成</a-button>
                </template>
                <template v-else-if="column.key === 'isFinish'">
                    {{record.isFinish==0?'未处理':'已处理'}}
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
