<script setup lang="ts">
import {reactive} from 'vue'
import {message,Modal} from 'ant-design-vue'

interface Record{
    title:string,
    content:string,
    created_at?:string,
    created_by?:string
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
        title:'',
        content:'',
        created_at:'',
        created_by:''
    },
    addForm:{
        title:'',
        content:'',
    },
    updateForm:{
        title:'',
        content:'',
    },
    detailForm:{
        title:'',
        content:'',
        created_at:'',
        created_by:''
    },
    table:[
        {title:'是佛啊是佛啊是佛i啊是佛啊寺活佛啊似乎萨法时',content:'啊是佛啊寺活佛啊似乎萨法佛啊是佛啊是佛i啊是佛啊寺活佛啊似乎萨法时族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
        {title:'Lily',content:'汉族',created_at:'2001-02-04',created_by:'65161616'},
    ]
})

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        align:'center',
        width:'400px'
    },
    {
        title: '内容',
        key: 'content',
        dataIndex: 'content',
        align:'center',
    },
    {
        title: '发布人',
        dataIndex: 'created_by',
        key: 'created_by',
        align:'center',
        width:'200px'
    },
    {
        title: '发布时间',
        dataIndex: 'created_at',
        key: 'created_at',
        align:'center',
        width:'150px'
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
        width:'200px'
    },
];

const handleAddOk = () => {}

const handleUpdateOk = () => {}

const handleUpdate = (record:Record) => {
    data.updateForm = record
    data.updateFlag = true
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
                        label="推送标题"
                        name="title"
                        >
                            <a-input v-model:value="data.searchForm.content" placeholder="请输入标题" />
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
                <a-textarea v-model:value="data.updateForm.content" show-count :maxlength="20" placeholder="请输入推送内容" />
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
        <a-form-item label="推送人" name="title">
            <span>{{ data.detailForm.created_by }}</span>
        </a-form-item>
        <a-form-item label="推送时间" name="title">
            <span>{{ data.detailForm.created_at }}</span>
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
