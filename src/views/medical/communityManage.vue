<script setup lang="ts">
import {reactive,onMounted} from 'vue'
import {getInputTips} from '@/api/gd'
import {insertCommunity,selectCommunity,deleteCommunityById} from '@/api/community'
import {message,Modal} from 'ant-design-vue'

//输入提示接口
interface InputTips{
  id?:string,
  adcode?:string,
  address?:string,
  city?:Array<string>,
  district?:string,
  location?:string,
  name?:string,
  typecode?:string
}

//合作社区列表管理
interface TableData{
  ID?:number
  id?:string
  name?:string,
  district?:string,
  adcode?:string,
  location?:string,
  address?:string,
  CreatedAt?:string,
  UpdatedAt?:string,
  DeletedAt?:string,
}

//搜索表单接口定义
interface SearchForm{
    name:string,
    district:string,
    detail_address:string,
}

interface Data{
    addFlag:boolean,
    updateFlag:boolean,
    detailFlag:boolean,
    searchForm:SearchForm,
    table:Array<TableData>,
    tips:Array<InputTips>,
    tempAddress:InputTips|undefined,
    tempRecord:TableData|undefined,
    addRecord:TableData|undefined,
    address:string
}

const data = reactive<Data>({
    addFlag:false,
    updateFlag:false,
    detailFlag:false,
    searchForm:{
        name:'',
        district:'',
        detail_address:'',
    },
    table:[],
    tips:[],
    tempAddress:undefined,
    tempRecord:undefined,
    addRecord:undefined,
    address:''
})

const columns = [
    {
        title: '序号',
        dataIndex: 'ID',
        key: 'ID',
        align:'center',
    },
    {
        title: 'POI编号',
        key: 'id',
        dataIndex: 'id',
        align:'center',
    },
    {
        title: '单位名称',
        dataIndex: 'name',
        key: 'name',
        align:'center',
    },
    {
        title: '所属区域',
        dataIndex: 'district',
        key: 'district',
        align:'center',
    },
    {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address',
        align:'center',
        width:'400px'
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
        width:'200px'
    },
];

//搜索提示
const searchTips = (keywords:string) => {
  data.tips = [];
  getInputTips({
    key:'0b195d069492038cc8d9086e25346fb7',
    keywords:keywords
  }).then(res => {
    res.data.tips.forEach(element => {
      data.tips.push(element)
    });
  }).catch(err => {
    console.log('错误信息' + err);
  })
}

//新增社区的弹窗输入事件
const change = () => {
  searchTips(data.address)
}

//新增社区弹窗确认事件
const addCommunityOk = () => {
    insertCommunity(data.tempAddress).then(res => {
        if(res.rowAffect == 1){
            message.success('新增成功')
            initData()
        }
    }).catch(() => {
        message.error('地址不可用 请重新选择')
    }).finally(() => {
        clearAddModal();
        data.addFlag = false;
    })
    
};

//新增社区弹窗取消事件
const addCommunityCancel = () => {
  data.addFlag = false;
  clearAddModal();
};

//选中地址后的操作
const chooseAddress = (item:InputTips) => {
  data.tempAddress = item;
}

const clearAddModal = () => {
    data.address = ''
    data.tempAddress = undefined
    data.tips = []
}

const resetSearch = () => {
    data.searchForm.name = ''
    data.searchForm.district = ''
    data.searchForm.detail_address = ''
}

const openDetailDrawer = (record:TableData) => {
    console.log(record);
    
    data.detailFlag = true;
    data.tempRecord = record
  
}

const closeDetailDrawer = () => {
  data.detailFlag = false;
}


const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deleteCommunityById(id).then(res => {
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

const initData = () => {
    selectCommunity().then(res => {
        data.table = res.data
        
    })
}

onMounted(() => {
    initData()
})
</script>

<template>
  <div class="community">
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
                        label="物品名称"
                        name="name"
                        >
                            <a-input v-model:value="data.searchForm.name" placeholder="请输入社区名称" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="所属区域"
                        name="district"
                        >
                        <a-input v-model:value="data.searchForm.district" placeholder="请输入所属区域" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="详细地址"
                        name="nation"
                        >
                            <a-input v-model:value="data.searchForm.detail_address" placeholder="请输入详细地址" />
                    </a-form-item>
                </a-col>
                <a-col :span="6"></a-col>
            </a-row>
        </a-form>

    </div>
    <div class="handle">
        <div class="left">
            <a-button class="btn" type="primary">搜索</a-button>
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
                    <a-button type="link" @click="openDetailDrawer(record)">详情</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                </template>
            </template>
        </a-table>
    </div>

    <a-modal
      v-model:open="data.addFlag"
      title="新增合作社区"
      @ok="addCommunityOk"
      @cancel="addCommunityCancel"
      okText="确认"
      cancelText="取消"
    >
      <a-input
        v-model:value="data.address"
        placeholder="请输入名称/地址"
        @change="change"
      />
        <div class="selected">
            已选择位置：{{ data.tempAddress?.name == undefined ? '暂未选择' : data.tempAddress?.name}}
        </div>
        <div class="options">
            <a-list item-layout="horizontal" :data-source="data.tips" :bordered="true">
                <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a-button type="link" size="small" @click="chooseAddress(item)">选中</a-button>
                    </template>
                    <a-list-item-meta
                    :description="item.district + ' ' + item.address"
                    >
                    <template #title>
                        <span>{{ item.name }}</span>
                    </template>
                    
                        </a-list-item-meta>
                    </a-list-item>
                </template>
            </a-list>
      </div>
    </a-modal>

    <a-drawer title="合作社区详情" placement="bottom" :open="data.detailFlag" @close="closeDetailDrawer">
      <a-descriptions bordered> 
        <a-descriptions-item label="地区编号">{{ data.tempRecord?.id }}</a-descriptions-item>
        <a-descriptions-item label="地区名称">{{ data.tempRecord?.name }}</a-descriptions-item>
        <a-descriptions-item label="所属区域">{{ data.tempRecord?.district }}</a-descriptions-item>
        <a-descriptions-item label="区域编码">{{ data.tempRecord?.adcode }}</a-descriptions-item>
        <a-descriptions-item label="地区坐标">[{{ data.tempRecord?.location }}]</a-descriptions-item>
        <a-descriptions-item label="详细地址">{{ data.tempRecord?.address }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ data.tempRecord?.CreatedAt }}</a-descriptions-item>
        <a-descriptions-item label="更新时间">{{ data.tempRecord?.UpdatedAt }}</a-descriptions-item>
        
    </a-descriptions>
    </a-drawer>
  </div>
</template>

<style scoped lang="less">
.community{
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
.options{
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
}
.selected{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-weight: bold;
}
</style>
