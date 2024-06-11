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
    detailFlag:boolean,
    searchForm:{
        name:string|undefined,
        idnumber:string|undefined,
        examNo:string|undefined,
        deviceID:string|undefined
    },
    table:Result[],
    detail:Result
}

const data = reactive<SearchForm>({
    detailFlag:false,
    searchForm:{
        name:undefined,
        idnumber:undefined,
        examNo:undefined,
        deviceID:undefined
    },
    table:[],
    detail:{}
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

const type = ['空腹','餐后一小时','餐后两小时']

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

const handleSearch = () => {
    initData()
}

const resetSearch = () => {
    data.searchForm.name=undefined,
    data.searchForm.idnumber=undefined
    data.searchForm.examNo=undefined
    data.searchForm.deviceID=undefined
    initData()
}

const showDetail = (item:Result) => {
    data.detailFlag = true
    data.detail = item
}

const onClose = () => {
    data.detailFlag = false;
};

const initData = () => {
    getResultList(data.searchForm).then(res => {
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
                        label="体检编号"
                        name="examNo"
                        >
                            <a-input v-model:value="data.searchForm.examNo" placeholder="请输入体检编号" />
                    </a-form-item>
                </a-col>
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
                
                <a-col :span="6">
                    <a-form-item
                        label="设备编号"
                        name="deviceID"
                        >
                            <a-input v-model:value="data.searchForm.deviceID" placeholder="请输入设备编号" />
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
        
    </div>
    <div class="table">
        <a-table :columns="columns" :data-source="data.table" size="small" :scroll="{x:1000}">
            <template #bodyCell="{ record,column }">
                <template v-if="column.key === 'action'">
                    <a-button type="link" @click="showDetail(record)">详情</a-button>
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
    
    <a-drawer
        title="详情"
        placement="bottom"
        :open="data.detailFlag"
        height="90%"
        @close="onClose"
    >
    <a-descriptions title="基础信息" bordered size="small">
        <a-descriptions-item label="姓名">{{ data.detail.sfz?.name }}</a-descriptions-item>
        <a-descriptions-item label="年龄">{{ data.detail.sfz?.age }}</a-descriptions-item>
        <a-descriptions-item label="性别">{{ data.detail.sfz?.sex }}</a-descriptions-item>
        <a-descriptions-item label="民族">{{ data.detail.sfz?.nation }}</a-descriptions-item>
        <a-descriptions-item label="身份证号" :span="2">{{ data.detail.sfz?.idnumber }}</a-descriptions-item>
        <a-descriptions-item label="生日">{{ data.detail.sfz?.birthday }}</a-descriptions-item>
        <a-descriptions-item label="设备码">{{ data.detail.deviceID }}</a-descriptions-item>
        <a-descriptions-item label="体检编号">{{ data.detail.examNo }}</a-descriptions-item>

    </a-descriptions>
    <a-descriptions title="常规信息" bordered size="small" style="margin-top: 20px;">
        <a-descriptions-item label="身高">{{ data.detail.hw?.height }}</a-descriptions-item>
        <a-descriptions-item label="体重">{{ data.detail.hw?.weight }}</a-descriptions-item>
        <a-descriptions-item label="BMI">{{ data.detail.hw?.bmi }}</a-descriptions-item>
        <a-descriptions-item label="心率">{{ data.detail.blood?.rate }}</a-descriptions-item>
        <a-descriptions-item label="体温">{{ data.detail.tiwen }}</a-descriptions-item>
        <a-descriptions-item label="视力">{{ data.detail.shili?.left_eye }}/{{ data.detail.shili?.right_eye }}</a-descriptions-item>
        <a-descriptions-item label="色盲">{{ data.detail.semang }}</a-descriptions-item>
        <a-descriptions-item label="中医体质辨识">{{ data.detail.zybs }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="重点信息" bordered size="small" style="margin-top: 20px;">
        <a-descriptions-item label="左臂血压">{{ data.detail.blood?.high }}/{{ data.detail.blood?.low }}</a-descriptions-item>
        <a-descriptions-item label="左臂血压">{{ data.detail.blood?.rhigh }}/{{ data.detail.blood?.rlow }}</a-descriptions-item>
        <a-descriptions-item label="血氧">{{ data.detail.spo2?.sp }}</a-descriptions-item>
        <a-descriptions-item label="血糖">{{ data.detail.xt?.type }}-{{ data.detail.xt?.value }} </a-descriptions-item>
        <a-descriptions-item label="尿酸">{{ data.detail.ns }}</a-descriptions-item>
        <a-descriptions-item label="胆固醇">{{ data.detail.dgc }}</a-descriptions-item>
        <a-descriptions-item label="心电结果">{{ data.detail.ecg?.result }}</a-descriptions-item>
        <a-descriptions-item label="心电图">{{ data.detail.ecg?.data }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="脂肪信息" bordered size="small" style="margin-top: 20px;">
        <a-descriptions-item label="脂肪率">{{ data.detail.fat?.zflv }}</a-descriptions-item>
        <a-descriptions-item label="基础代谢">{{ data.detail.fat?.jcdx }}</a-descriptions-item>
        <a-descriptions-item label="体水分量">{{ data.detail.fat?.tsfl }}</a-descriptions-item>
        <a-descriptions-item label="体水分率">{{ data.detail.fat?.tsflv }}</a-descriptions-item>
        <a-descriptions-item label="脂肪量">{{ data.detail.fat?.zfl }}</a-descriptions-item>
        <a-descriptions-item label="肌肉量">{{ data.detail.fat?.jrl }}</a-descriptions-item>
        <a-descriptions-item label="肌肉率">{{ data.detail.fat?.jrlv }}</a-descriptions-item>
        <a-descriptions-item label="骨盐">{{ data.detail.fat?.gy }}</a-descriptions-item>
        <a-descriptions-item label="去脂体重">{{ data.detail.fat?.qztz }}</a-descriptions-item>
        <a-descriptions-item label="蛋白质率">{{ data.detail.fat?.dbzlv }}</a-descriptions-item>
        <a-descriptions-item label="细胞内液量">{{ data.detail.fat?.xbnyl }}</a-descriptions-item>
        <a-descriptions-item label="细胞外液量">{{ data.detail.fat?.xbwyl }}</a-descriptions-item>
        <a-descriptions-item label="细胞内液率">{{ data.detail.fat?.xbnylv }}</a-descriptions-item>
        <a-descriptions-item label="细胞外液率">{{ data.detail.fat?.xbwylv }}</a-descriptions-item>
        <a-descriptions-item label="蛋白质">{{ data.detail.fat?.dbz }}</a-descriptions-item>
        <a-descriptions-item label="内脏脂肪等级">{{ data.detail.fat?.nzzf }}</a-descriptions-item>
        <a-descriptions-item label="骨量">{{ data.detail.fat?.gl }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="心理测评信息" bordered size="small" style="margin-top: 20px;">
        <a-descriptions-item label="UCLA孤独量表得分">{{ data.detail.xlcp?.ucla }}</a-descriptions-item>
        <a-descriptions-item label="老年抑郁量表得分">{{ data.detail.xlcp?.lnyy }}</a-descriptions-item>
        <a-descriptions-item label="自评抑郁量表得分">{{ data.detail.xlcp?.zpyy }}</a-descriptions-item>
        <a-descriptions-item label="汉密顿焦虑量表得分">{{ data.detail.xlcp?.hmdjl }}</a-descriptions-item>
        <a-descriptions-item label="情绪健康度测试得分">{{ data.detail.xlcp?.qxjkd }}</a-descriptions-item>
        <a-descriptions-item label="自测健康评定量表得分">{{ data.detail.xlcp?.zcjkpd }}</a-descriptions-item>
        <a-descriptions-item label="生活满意度量表得分">{{ data.detail.xlcp?.shmyd }}</a-descriptions-item>
        <a-descriptions-item label="人格障碍性格测试得分">{{ data.detail.xlcp?.rgza }}</a-descriptions-item>
        <a-descriptions-item label="PSTR成人心理压力测试得分">{{ data.detail.xlcp?.pstr }}</a-descriptions-item>
        <a-descriptions-item label="哈佛性向测试得分">{{ data.detail.xlcp?.hfxx }}</a-descriptions-item>
        <a-descriptions-item label="情商(EQ)测试得分">{{ data.detail.xlcp?.eq }}</a-descriptions-item>
        <a-descriptions-item label="睡眠状况评估得分">{{ data.detail.xlcp?.smzkpg }}</a-descriptions-item>
    </a-descriptions>
    </a-drawer>
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
