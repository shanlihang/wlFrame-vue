<script setup lang="ts">

const data = defineProps(['list'])
</script>

<template>
  <div class="menuList box">
    <div class="menu">
      <div class="logo">
        <slot name="logo">LOGO</slot>
      </div>
      <div class="list" v-for="item in data.list" :key="item.ID">
        <div class="title">{{ item.name }}</div>
        <div class="child">
          <div class="sub" v-for="i in item.children" :key="i.ID">
            <div class="i">{{ i.name }}</div>
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
      height: 80px;
      background-color: aliceblue;
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
