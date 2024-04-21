<script setup lang="ts">
import {pinyin} from 'pinyin-pro'
import { reactive } from 'vue';

interface Data{
    phoneFlag:boolean,
    baseModal:boolean,
    pwdModal:boolean,
    updatePhone:{
        captcha:number|undefined,
        newPhone:string
    },
    userInfo:UserInfo,
    updateBase:{
        name:string,
        username:string,
        sex:number|undefined,
    },
    updatePwd:{
        oldPwd:string,
        newPwd:string,
        confirmPwd:string
    }
}


interface UserInfo{
    name:string,
    username:string,
    sex:number|undefined,
    phone:string,
    email:string,
    birthday:string,
    created_at:string
}

const data = reactive<Data>({
    phoneFlag:false,
    baseModal:false,
    pwdModal:false,
    updatePhone:{
        captcha:undefined,
        newPhone:''
    },
    userInfo:{
        name:'张三',
        username:'zs',
        sex:1,
        phone:'18348563173',
        email:'67490009@qq.com',
        birthday:'2001-10-25',
        created_at:'2024/4/12'
    },
    updateBase:{
        name:'',
        username:'',
        sex:undefined
    },
    updatePwd:{
        oldPwd:'',
        newPwd:'',
        confirmPwd:''
    }
})

const getFirstLetter = (name:string) => {
  return pinyin(name,{toneType:'none'}).charAt(0)
}

const getPhoneCaptcha = () => {
    data.phoneFlag = true
}

const cancelUpdate = () => {
    data.phoneFlag = false
}

const updateBase = () => {
    data.updateBase.name = data.userInfo.name
    data.updateBase.username = data.userInfo.username
    data.updateBase.sex = data.userInfo.sex
    data.baseModal = true
}

const handleBaseOk = () => {
    data.baseModal = false
    console.log(data.updateBase);
    
    data.updateBase.name = ''
    data.updateBase.username = ''
    data.updateBase.sex = undefined
}

const updatePwd = () => {
    data.updatePwd.oldPwd = ''
    data.updatePwd.newPwd = ''
    data.updatePwd.confirmPwd = ''
    data.pwdModal = true
}

const handlePwdOk = () => {
    data.pwdModal = false
    console.log(data.updatePwd);
}
</script>

<template>
  <div class="user-center">
    <div class="handle">
        <a-button type="primary" @click="updateBase">修改基础信息</a-button>
        <a-button type="primary" style="margin-left: 20px;" @click="updatePwd">修改密码</a-button>
    </div>
    <div class="info">
        <a-card title="用户信息" bordered size="small" type="inner" style="width: 100%">
            <div class="section">
                <div class="avatar">
                    {{getFirstLetter('shanlihang')}}
                </div>
                <div class="content">
                    <a-descriptions bordered>
                        <a-descriptions-item label="姓名">{{ data.userInfo.name }}</a-descriptions-item>
                        <a-descriptions-item label="账号">{{ data.userInfo.username }}</a-descriptions-item>
                        <a-descriptions-item label="性别"><a-tag color="purple">{{ data.userInfo.sex==0?'女':'男' }}</a-tag></a-descriptions-item>
                        <a-descriptions-item label="生日">{{ data.userInfo.birthday }}</a-descriptions-item>
                        <a-descriptions-item label="手机号">{{ data.userInfo.phone }}</a-descriptions-item>
                        <a-descriptions-item label="邮箱">{{ data.userInfo.email }}</a-descriptions-item>
                        <a-descriptions-item label="注册时间">{{ data.userInfo.created_at }}</a-descriptions-item>
                    </a-descriptions>
                </div>
            </div>
        </a-card>
    </div>
    <div class="update">
        <a-card title="修改手机号" bordered size="small" type="inner" style="width: 100%">
            <div class="section">
                <div>当前手机号：<span style="font-weight: bold;">18348563173</span></div>
                <a-button type="link" @click="getPhoneCaptcha" :disabled="data.phoneFlag">获取验证码</a-button>
            </div>
            <div v-if="data.phoneFlag">
                <div class="form">
                    <div class="label">验证码：</div>
                    <a-input v-model:value="data.updatePhone.captcha" placeholder="请输入验证码" />
                </div>
                <div class="form">
                    <div class="label">新手机号：</div>
                    <a-input v-model:value="data.updatePhone.newPhone" placeholder="请输入新手机号" />
                </div>
                <div class="form">
                    <a-button type="primary">确认修改</a-button>
                    <a-button type="primary" danger style="margin-left: 10px;" @click="cancelUpdate" >放弃修改</a-button>
                </div>
            </div>
            
        </a-card>
    </div>
    <a-modal v-model:open="data.baseModal" title="修改基础信息" okText="确认" cancelText="取消" @ok="handleBaseOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.updateBase"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item
                label="姓名"
                name="name"
                :rules="[{ required: true, message: '姓名不能为空' }]"
                >
                <a-input v-model:value="data.updateBase.name" placeholder="请输入姓名" />
            </a-form-item>
            <a-form-item
                label="账号"
                name="username"
                :rules="[{ required: true, message: '账号不能为空' }]"
                >
                <a-input v-model:value="data.updateBase.username" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item
                label="性别"
                name="sex"
                :rules="[{ required: true, message: '性别不能为空' }]"
                >
                <a-select
                    v-model:value="data.updateBase.sex"
                    style="width: 120px"
                    placeholder="请选择性别"
                    >
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="0">女</a-select-option>
                </a-select>
            </a-form-item>
            <!-- <a-form-item
                label="生日"
                name="birthday"
                format="YYYY/MM/DD"
                :rules="[{ required: true, message: '请选择你的出生日期' }]"
                >
                <a-date-picker v-model:value="data.userInfo.birthday" />
            </a-form-item> -->
        </a-form>
    </a-modal>
    <a-modal v-model:open="data.pwdModal" okText="确认" cancelText="取消" title="修改密码" @ok="handlePwdOk">
        <a-form
            style="margin-top: 20px;"
            :model="data.updatePwd"
            name="pwd"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item
                label="当前密码"
                name="oldPwd"
                :rules="[{ required: true, message: '当前密码不能为空' }]"
                >
                <a-input v-model:value="data.updatePwd.oldPwd" placeholder="请输入当前密码" />
            </a-form-item>
            <a-form-item
                label="新密码"
                name="newPwd"
                :rules="[{ required: true, message: '新密码不能为空' }]"
                >
                <a-input-password v-model:value="data.updatePwd.newPwd" autocomplete="off" placeholder="请输入新密码" />
            </a-form-item>
            <a-form-item
                label="当前密码"
                name="confirmPwd"
                :rules="[{ required: true, message: '确认密码不能为空' }]"
                >
                <a-input-password v-model:value="data.updatePwd.confirmPwd" autocomplete="off" placeholder="请再次输入新密码" />
            </a-form-item>
            
        </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.user-center{
    height: 100%;
    padding-top: 20px;
    .handle{
        width: 98%;
        overflow: hidden;
        margin: 0 auto;
    }
    .info{
        width: 98%;
        overflow: hidden;
        margin: 20px auto;
        .section{
            width: 100%;
            display: flex;
            .avatar{
                width: 200px;
                font-size: 80px;
                border-radius: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                background-color: #fde3cf;
                color: #f56a00;
            }
            .content{
                margin-left: 10px;
                flex:1 0 auto;
            }
        }
        
    }
    .update{
        width: 98%;
        overflow: hidden;
        margin: 20px auto;
        .section{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .form{
            display: flex;
            align-items: center;
            width: 500px;
            margin-top: 15px;
            .label{
                width: 90px;
            }
        }
    }
}
</style>
