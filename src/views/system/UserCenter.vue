<script setup lang="ts">
import {pinyin} from 'pinyin-pro'
import { reactive } from 'vue';

interface Data{
    phoneFlag:boolean,
    updateForm:{
        captcha:number|undefined,
        newPhone:string
    }
}

const data = reactive<Data>({
    phoneFlag:false,
    updateForm:{
        captcha:undefined,
        newPhone:''
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
</script>

<template>
  <div class="user-center">
    <div class="handle">
        <a-button type="primary">修改基础信息</a-button>
        <a-button type="primary" style="margin-left: 20px;">修改密码</a-button>
    </div>
    <div class="info">
        <a-card title="用户信息" bordered size="small" type="inner" style="width: 100%">
            <div class="section">
                <div class="avatar">
                    {{getFirstLetter('shanlihang')}}
                </div>
                <div class="content">
                    <a-descriptions bordered>
                        <a-descriptions-item label="姓名">Cloud Database</a-descriptions-item>
                        <a-descriptions-item label="账号">Prepaid</a-descriptions-item>
                        <a-descriptions-item label="性别">YES</a-descriptions-item>
                        <a-descriptions-item label="生日">2018-04-24 18:00:00</a-descriptions-item>
                        <a-descriptions-item label="手机号">$80.00</a-descriptions-item>
                        <a-descriptions-item label="邮箱">$20.00</a-descriptions-item>
                        <a-descriptions-item label="注册时间">$60.00</a-descriptions-item>
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
                    <a-input v-model:value="data.updateForm.captcha" placeholder="请输入验证码" />
                </div>
                <div class="form">
                    <div class="label">新手机号：</div>
                    <a-input v-model:value="data.updateForm.newPhone" placeholder="请输入新手机号" />
                </div>
                <div class="form">
                    <a-button type="primary">确认修改</a-button>
                    <a-button type="primary" danger style="margin-left: 10px;" @click="cancelUpdate" >放弃修改</a-button>
                </div>
            </div>
            
        </a-card>
    </div>
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
