<template>
  <div class="layout page">
    <div class="menu box">
      <MenuList />
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
import MenuList from '@/components/menu/MenuList.vue';

const system = useSystemStore()


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
