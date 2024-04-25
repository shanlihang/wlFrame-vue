<script setup lang="ts">
import { reactive,onMounted } from 'vue';
import {getResultList,deleteResult} from '@/api/result'
import {message,Modal} from 'ant-design-vue'

 export interface Result {
    blood?: Blood;
    deviceID?: string;
    dgc?: string;
    ecg?: Ecg;
    examNo?: string;
    fat?: Fat;
    hw?: Hw;
    ns?: string;
    semang?: string;
    sfz?: Sfz;
    shili?: Shili;
    spo2?: Spo2;
    tiwen?: string;
    xlcp?: Xlcp;
    xt?: Xt;
    zybs?: string;
}

export interface Blood {
    high: string;
    low: string;
    rate: string;
    rhigh: string;
    rlow: string;
}

export interface Ecg {
    data: string;
    len?: number;
    result: string;
}

export interface Fat {
    dbz: string;
    dbzlv: string;
    gl: string;
    gy: string;
    jcdx: string;
    jrl: string;
    jrlv: string;
    nzzf: string;
    qztz: string;
    tsfl: string;
    tsflv: string;
    xbnyl: string;
    xbnylv: string;
    xbwyl: string;
    xbwylv: string;
    zfl: string;
    zflv: string;
}

export interface Hw {
    bmi: string;
    height: string;
    weight: string;
}

export interface Sfz {
    age: string;
    birthday: string;
    idnumber: string;
    name: string;
    nation: string;
    sex: string;
}

export interface Shili {
    left_eye: string;
    right_eye: string;
}

export interface Spo2 {
    sp: string;
}

export interface Xlcp {
    eq: string;
    hfxx: string;
    hmdjl: string;
    lnyy: string;
    pstr: string;
    qxjkd: string;
    rgza: string;
    shmyd: string;
    smzkpg: string;
    ucla: string;
    zcjkpd: string;
    zpyy: string;
}

export interface Xt {
    type: string;
    value: string;
}

interface SearchForm{
    searchForm:{
        name:string,
        idnumber:string,
    },
    table:Result[]
}

const data = reactive<SearchForm>({
    searchForm:{
        name:'',
        idnumber:''
    },
    table:[]
})

const columns = [
    {
        title: '姓名',
        key: 'name',
        align:'center',
    },
    {
        title: '身份证号',
        key: 'idnumber',
        align:'center',
        width:180
    },
    {
        title: '性别',
        key: 'sex',
        align:'center',
    },
    {
        title: '年龄',
        key: 'age',
        align:'center',
    },
    {
        title: 'BMI',
        key: 'bmi',
        align:'center',
    },
    {
        title: '高压(左)',
        key: 'height',
        align:'center',
    },
    {
        title: '低压(左)',
        key: 'low',
        align:'center',
    },
    {
        title: '心率',
        key: 'rate',
        align:'center',
    },
    {
        title: '高压(右)',
        key: 'rhigh',
        align:'center',
    },
    {
        title: '低压(右)',
        key: 'rlow',
        align:'center',
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
        fixed: 'right',
        width:220
    },
];

const handleDelete = (id:number) => {
    Modal.confirm({
        title: '删除确认',
        content: '您确定要删除这条记录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
            deleteResult(id).then(res => {
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
    getResultList().then(res => {
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
            :label-col="{ span: 6 }"
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
                        label="身份证号"
                        name="idnumber"
                        >
                            <a-input v-model:value="data.searchForm.idnumber" placeholder="请输入身份证号" />
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
        
        <a-button class="btn" type="primary">新增</a-button>
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small" :scroll="{x:1000}">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link">详情</a-button>
                    <a-button type="link">编辑</a-button>
                    <a-button type="link" danger @click="handleDelete(record.ID)">删除</a-button>
                </template>
                <template v-else-if="column.key === 'name'">
                    {{ record.sfz.name }}
                </template>
                <template v-else-if="column.key === 'idnumber'">
                    {{ record.sfz.idnumber }}
                </template>
                <template v-else-if="column.key === 'sex'">
                    {{ record.sfz.sex }}
                </template>
                <template v-else-if="column.key === 'age'">
                    {{ record.sfz.age }}
                </template>
                <template v-else-if="column.key === 'bmi'">
                    {{ record.hw.bmi }}
                </template>
                <template v-else-if="column.key === 'high'">
                    {{ record.blood.high }}
                </template>
                <template v-else-if="column.key === 'low'">
                    {{ record.blood.low }}
                </template>
                <template v-else-if="column.key === 'rate'">
                    {{ record.blood.rate }}
                </template>
                <template v-else-if="column.key === 'rhigh'">
                    {{ record.blood.rhigh }}
                </template>
                <template v-else-if="column.key === 'rlow'">
                    {{ record.blood.rlow }}
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
        overflow: hidden;
        margin: 0 auto;
    }
}
</style>
