<template>
  <div class="login" v-if="flag">
    <router-view></router-view>
  </div>
  <div class="layout" v-else>
    <div class="menu">
      <MenuList />
    </div>
    <div class="area">
      <div class="header">
        <HeaderLine />
      </div>
      <div class="main">
        <a-watermark content="slh 2020082403">
          <router-view></router-view>
        </a-watermark>
      </div>
    </div>
  </div>
  
</template>
<script lang="ts" setup>
import MenuList from '@/components/layout/MenuList.vue';
import HeaderLine from '@/components/layout/HeaderLine.vue';
import {ref,onMounted} from 'vue'

const flag = ref<boolean>(false)

onMounted(() => {
    if(location.pathname == '/login'){
        flag.value = !flag.value
    }
})

</script>
<style scoped>
.login{
  width: 100%;
  height: 100vh;
  background-color: black;
}
.layout{
  height: 100vh;
  display: flex;
  background-color: #f8f8f8;
}
.layout .menu{
  height: 100%;
  background-color: #fff;
}
.layout .area{
  height: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
}
.layout .area .header{
  margin-left: 1px;
  height: 50px;
  background-color: #fff;
}
.layout .area .main{
  width: 99%;
  flex :1 0 auto;
  margin: 10px auto;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
}
</style>
  