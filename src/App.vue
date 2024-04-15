<template>
  <div class="layout page">
    <div class="menu box">
      <a-menu v-model:selectedKeys="menuState.selectedKeys" theme="dark" mode="inline" :style="{height: '100%',width:menuState.width,backgroundColor:system.theme.boxBgColor,color:system.theme.mainFontColor}">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <user-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="area">
      <div class="header box">123456</div>
      <div class="main box">123156456</div>
      <div class="footer subFont">
        wlFrame-vue ©2024 Created by slh67490009@gmail.com
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useSystemStore} from '@/store/system'
import { reactive } from 'vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';

const system = useSystemStore()

const menuState = reactive({
  width:'236px',
  selectedKeys:['4']
})

</script>
<style scoped>
.layout{
  display: flex;
}
.layout .menu{
  height: 100%;
}
.layout .area{
  height: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.layout .area .header{
  margin-left: 1px;
  height: 50px;
  
}
.layout .area .main{
  width: 99%;
  flex :1 0 auto;
  margin: 10px auto 0;
  border-radius: 6px;
  overflow: hidden;
}
.layout .area .footer{
  width: 100%;
  height: 25px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>
.page{
  width: 100%;
  height: 100vh;
  background-color: v-bind(system.theme.pageBgColor);
  color: v-bind(system.theme.mainFontColor);
}
.box{
  background-color: v-bind(system.theme.boxBgColor);
  color: v-bind(system.theme.mainFontColor);
}
.mainFont{
  color: v-bind(system.theme.mainFontColor);
}

.subFont{
  color: v-bind(system.theme.subFontColor);
}
</style>
