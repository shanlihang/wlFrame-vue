<script setup lang="ts">
import {reactive} from 'vue'
import {login,register} from '@/api/system'
import {Session} from '@/utils/storage'
import router from '@/router';
import {getMenuList} from '@/api/permission'
import {useSystemStore} from '@/store/system'
import {AddRoutes} from '@/router'

interface LoginForm {
  username:string,
  password:string,
  // key:string,
  // code:string
}

interface Data{
  loginForm:LoginForm
}

const store = useSystemStore()

const data = reactive<Data>({
  loginForm:{
    username:'',
    password:'',
    // key:'',
    // code:''
  }
})

const onFinish = () => {
  login(data.loginForm).then(res => {
    Session.setBase("token",res.token)
    getMenuList().then(res => {
      store.menu = res.data
    })
    router.push('/')
  })
  
}

</script>

<template>
  <div class="login">
    <div class="content">
      <div class="form">
        <div class="title">医疗管理系统</div>
        <div class="input">
          <a-form :model="data.loginForm"  autocomplete="off" @finish="onFinish">
            <a-form-item
              label="用户名"
              name="username"
              :rules="[{ required: true, message: '用户名不能为空' }]"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input v-model:value="data.loginForm.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item
              label="密码"
              name="password"
              :rules="[{ required: true, message: '密码不能为空' }]"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input v-model:value="data.loginForm.password"  placeholder="请输入密码" />
            </a-form-item>
            <a-form-item>
              <div style="display: flex;justify-content: center;">
                <a-button type="primary" html-type="submit" class="login-form-button">
                  登录
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
        <div class="btn">
          <span>没有账号，<span style="color: #2E77FC;cursor: pointer;">去注册</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login{
  width: 100%;
  height: 100vh;
  background: url('@/assets/login.png') no-repeat;
  background-size: cover;
  position: relative;
  .content{
    width: 30%;
    height: 50%;
    position: absolute;
    left: 63%;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(108, 255, 165, .3);
    display: flex;
    justify-content: center;
    align-items: center;
    .form{
      width: 96%;
      height: 96%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: #fff;
      .title{
        font-size: 2em;
        font-weight: bold;
        text-align: center;
        margin: 10px 0;
      }
      .btn{
        text-align: center;
        color: #A0A0A0;
        font-size: 12px;
      }
    }
  }
}

</style>
