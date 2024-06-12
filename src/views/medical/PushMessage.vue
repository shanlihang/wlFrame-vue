<script setup lang="ts">
import {reactive,onMounted} from 'vue'
import {message,Modal} from 'ant-design-vue'
import {insertPush,selectPush,deletePushById,updatePush} from '@/api/push'

interface Record{
    ID?:number|undefined,
    title:string|undefined,
    content:string|undefined,
    CreatedAt?:string|undefined,
    UpdatedAt?:string|undefined,
    DeletedAt?:string|undefined
}

interface Data{
    addFlag:boolean,
    updateFlag:boolean,
    detailFlag:boolean,
    searchForm:Record,
    addForm:Record,
    updateForm:Record,
    detailForm:Record,
    table:Array<any>
}

const data = reactive<Data>({
    addFlag:false,
    updateFlag:false,
    detailFlag:false,
    searchForm:{
        title:undefined,
        content:undefined,
    },
    addForm:{
        title:undefined,
        content:undefined,
    },
    updateForm:{
        title:'',
        content:'',
    },
    detailForm:{
        title:'',
        content:'',
    },
    table:[]
})

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        align:'center',
    },
    {
        title: '内容',
        key: 'content',
        dataIndex: 'content',
        align:'center',
        width:'800px',
    },
    {
        title: '发布时间',
        dataIndex: 'CreatedAt',
        key: 'CreatedAt',
        align:'center',
    },
    {
        title: '更新时间',
        dataIndex: 'UpdatedAt',
        key: 'UpdatedAt',
        align:'center',
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
    },
];

const handleAddOk = () => {
    insertPush(data.addForm).then(res => {
        if(res.rowAffect == 1){
            initData()
            message.success('发布成功')
        }
    })
    data.addFlag = false
    
}

const handleUpdateOk = () => {
    updatePush(data.updateForm).then(res => {
        if(res.rowAffect == 1){
            initData()
            message.success('修改成功')
        }
    })
    data.updateFlag = false
}

const handleUpdate = (record:Record) => {
    data.updateForm = record
    data.updateFlag = true
}

const resetSearch = () => {
    data.searchForm.title = undefined,
    data.searchForm.content = undefined,
    initData()
}

const handleSearch = () => {
    initData()
}

const handleDetail = (record:Record) => {
    data.detailForm = record
    data.detailFlag = true
}

const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deletePushById(id).then(res => {
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
    selectPush(data.searchForm).then(res => {
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
                        label="推送标题"
                        name="title"
                        >
                            <a-input v-model:value="data.searchForm.title" placeholder="请输入标题" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="文章内容"
                        name="content"
                        >
                        <a-input v-model:value="data.searchForm.content" placeholder="请输入内容" />
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
        <div class="right">
            <a-button class="btn" type="primary" @click="data.addFlag=true">新增</a-button>
        </div>
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link" @click="handleDetail(record)">详情</a-button>
                    <a-button type="link" @click="handleUpdate(record)">编辑</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                </template>
            </template>
        </a-table>
    </div>

    <a-modal v-model:open="data.addFlag" title="发布推送" okText="发布" cancelText="取消" @ok="handleAddOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.addForm"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item label="推送标题" name="title" :rules="[{ required: true, message: '推送标题不能为空' }]">
                <a-input v-model:value="data.addForm.title" show-count :maxlength="20" placeholder="请输入推送标题" />
            </a-form-item>
            
            <a-form-item label="推送内容" name="content" :rules="[{ required: true, message: '文章内容不能为空' }]">
                <a-textarea v-model:value="data.addForm.content" show-count :maxlength="240" placeholder="请输入推送内容" />
            </a-form-item>
        </a-form>
    </a-modal>

    <a-modal v-model:open="data.updateFlag" title="修改推送" okText="确认" cancelText="取消" @ok="handleUpdateOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.updateForm"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item label="推送标题" name="title" :rules="[{ required: true, message: '推送标题不能为空' }]">
                <a-input v-model:value="data.updateForm.title" show-count :maxlength="20" placeholder="请输入推送标题" />
            </a-form-item>
            
            <a-form-item label="推送内容" name="content" :rules="[{ required: true, message: '文章内容不能为空' }]">
                <a-textarea v-model:value="data.updateForm.content" show-count :maxlength="240" placeholder="请输入推送内容" />
            </a-form-item>
        </a-form>
    </a-modal>

    <a-drawer
        v-model:open="data.detailFlag"
        title="推送详情"
        placement="right"
    >
        <a-form-item label="推送标题" name="title">
            <span>{{ data.detailForm.title }}</span>
        </a-form-item>
        <a-form-item label="推送内容" name="title">
            <span>{{ data.detailForm.content }}</span>
        </a-form-item>
        <a-form-item label="推送时间" name="title">
            <span>{{ data.detailForm.CreatedAt }}</span>
        </a-form-item>
        <a-form-item label="更新时间" name="title">
            <span>{{ data.detailForm.UpdatedAt }}</span>
        </a-form-item>
    </a-drawer>
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
