<template>
  <div class="layout">
    <div class="menu">
      <MenuList />
    </div>
    <div class="area">
      <div class="header">123456</div>
      <div class="main">123156456</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import MenuList from '@/components/menu/MenuList.vue';


</script>
<style scoped>
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
  margin: 10px auto 10px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
}
</style>
