<script setup lang="ts">
import router from '@/router';
import {MenuType} from '@/model/menu'


const data = defineProps(['list'])

const goMenu = (i:MenuType) => {
  router.push(i.router)
}
</script>

<template>
  <div class="menuList box">
    <div class="menu">
      <div class="logo" @click="router.push('/')">
        <img src="../../assets/logo.jpg" style="width: 80px;height: 80px;" alt="">
        <div class="name">
          <div class="chinese">海 科 医 疗</div>
          <div class="pinyin">HAI KE YI LIAO</div>
        </div>
      </div>
      <div class="list" v-for="item in data.list" :key="item.ID">
        <div class="title">{{ item.name }}</div>
        <div class="child">
          <div class="sub" v-for="i in item.children" :key="i.ID">
            <div class="i" @click="goMenu(i)">{{ i.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.menuList {
  height: 100%;
  width: 256px;
  padding-top: 10px;

  .menu {
    margin: 0 20px;
    height: 100%;

    .logo {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      overflow: hidden;
      border: 1px solid #8c8cbc;
      border-radius: 6px;
      cursor: pointer;
      .name{
        flex:1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 17px;
        font-weight: bold;
      }
    }

    .list {
      .title {
        font-weight: bold;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid #f0f0f0;
        color: #8c8cbc;
        margin-bottom: 20px;
        text-indent: 2em;
      }
      .child{
        text-indent: 4em;
        font-size: 15px;
        .sub{
          margin: 5px 10px;
          border-radius: 6px;
          .i{
            height: 30px;
            line-height: 30px;
            cursor: pointer;
          }
        }
        .sub:hover{
          background-color: rgba(0, 0, 0, .1);
        }
      }
    }
  }
}
</style>
