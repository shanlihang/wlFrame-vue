<script setup lang="ts">
import { reactive } from 'vue';

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
    table:[
        {
            sfz:{
                name:'Mike',
                sex:'男',
                nation:'汉族',
                birthday:'2000-01-20',
                idnumber:'230184222211111025',
                age:'25'
            },
            hw:{
                height:'170',
                weight:'120',
                bmi:'14.27'
            },
            blood:{
                high:'140',
                low:'80',
                rate:'120',
                rhigh:'138',
                rlow:'85'
            }
        },
        {
            sfz:{
                name:'Aliu',
                sex:'男',
                nation:'汉族',
                birthday:'2000-01-20',
                idnumber:'230184222211111025',
                age:'25'
            },
            hw:{
                height:'170',
                weight:'120',
                bmi:'14.27'
            },
            blood:{
                high:'140',
                low:'80',
                rate:'120',
                rhigh:'138',
                rlow:'85'
            }
        },
        {
            sfz:{
                name:'Jay',
                sex:'男',
                nation:'汉族',
                birthday:'2000-01-20',
                idnumber:'230184222211111025',
                age:'25'
            },
            hw:{
                height:'170',
                weight:'120',
                bmi:'14.27'
            },
            blood:{
                high:'140',
                low:'80',
                rate:'120',
                rhigh:'138',
                rlow:'85'
            }
        },
]
})

const columns = [
    {
        title: '姓名',
        key: 'name',
        align:'center',
        width:130
    },
    {
        title: '身份证号',
        key: 'idnumber',
        align:'center',
        width:200
    },
    {
        title: '性别',
        key: 'sex',
        align:'center',
        width:60
    },
    {
        title: '年龄',
        key: 'age',
        align:'center',
        width:80
    },
    {
        title: '民族',
        key: 'nation',
        align:'center',
        width:100
    },
    {
        title: '出生日期',
        key: 'birthday',
        align:'center',
        width:140
    },
    {
        title: '身高',
        key: 'height',
        align:'center',
        width:100
    },
    {
        title: '体重',
        key: 'weight',
        align:'center',
        width:100
    },
    {
        title: 'BMI',
        key: 'bmi',
        align:'center',
        width:100
    },
    {
        title: '高压(左)',
        key: 'height',
        align:'center',
        width:100
    },
    {
        title: '低压(左)',
        key: 'low',
        align:'center',
        width:100
    },
    {
        title: '心率',
        key: 'rate',
        align:'center',
        width:100
    },
    {
        title: '高压(右)',
        key: 'rhigh',
        align:'center',
        width:100
    },
    {
        title: '低压(右)',
        key: 'rlow',
        align:'center',
        width:100
    },
    {
        title: '操作',
        key: 'action',
        align:'center',
        fixed: 'right',
        width:220
    },
];
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
                    <a-button type="link" danger>删除</a-button>
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
                
                <template v-else-if="column.key === 'nation'">
                    {{ record.sfz.nation }}
                </template>
                <template v-else-if="column.key === 'birthday'">
                    {{ record.sfz.birthday }}
                </template>
                <template v-else-if="column.key === 'height'">
                    {{ record.hw.height }}
                </template>
                <template v-else-if="column.key === 'weight'">
                    {{ record.hw.weight }}
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
