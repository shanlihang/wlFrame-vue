<script setup lang="ts">
import { reactive } from 'vue';
import WlSvgSource from '@/components/WlSvgResource.vue'

interface MenuOptions{
  openKeys?:Array<string>,
  selectedKeys?:Array<string>,
  collapsed?:boolean,
  isLight?:boolean,
  width?:string,
  height?:string
}

interface MenuList{
  id:number,
  icon?:string,
  title:string,
  children?:Array<MenuList>
}

const menuOptions = reactive<MenuOptions>({
  openKeys:['sub1'],
  selectedKeys:[],
  collapsed:false,
  isLight:true,
  width:'225px',
  height:'100%'
})

const menuList = reactive<Array<MenuList>>([
  {id:1,icon:'@/assets/svg/vue.svg',title:'菜单1',children:[
    {id:5,icon:'@/assets/svg/vue.svg',title:'子菜单1'},
    {id:6,icon:'@/assets/svg/vue.svg',title:'子菜单2'},
    {id:7,icon:'@/assets/svg/vue.svg',title:'子菜单3'},
  ]},
  {id:2,icon:'@/assets/svg/vue.svg',title:'菜单2'},
  {id:3,icon:'@/assets/svg/vue.svg',title:'菜单3'},
])

const isCollapsed = () => {
  menuOptions.collapsed = !menuOptions.collapsed
  menuOptions.isLight = !menuOptions.isLight
  if(menuOptions.collapsed){
    menuOptions.width = '70px'
  }else{
    menuOptions.width = '225px'
  }
}
</script>

<template>
  <div class="layout">
    <div class="menu">
      <a-menu
      v-model:openKeys="menuOptions.openKeys"
      v-model:selectedKeys="menuOptions.selectedKeys"
      mode="inline"
      :theme="menuOptions.isLight ? 'light' : 'dark'"
      :inline-collapsed="menuOptions.collapsed"
      :style="{width:menuOptions.width,height:menuOptions.height}"
    >
    <div class="logo">
      12312131
    </div>
    <a-sub-menu :key="item.id" v-for="item in menuList">
        <template #icon>
         <WlSvgSource :src="item.icon!"/>
        </template>
        <template #title>{{item.title}}</template>
        <a-menu-item v-for="i in item.children" :key="i.id">
          {{i.title}}
        </a-menu-item>
      </a-sub-menu>
  </a-menu>
    </div>
    <div class="screen">
      <div class="pageHead">
        <div class="path">
          <WlSvgSource src="../assets/svg/menuFlod.svg"></WlSvgSource>
          
        </div>
        <div class="sys"></div>
      </div>
      <div class="pageMain"></div>
      <!-- <button @click="isCollapsed">132</button> -->
    </div>
    
    
  </div>
</template>

<style scoped lang="less">
.layout{
    width: 100%;
    height: 100vh;
    display: flex;
    .menu{
      .logo{
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .screen{
      flex: 1 0 auto;
      background-color: #F5F5F5;
      .pageHead{
        width: 98%;
        height: 5%;
        margin: 0 auto; 
        display: flex;
        justify-content: center;
        background-color: #fff;
        .path{
          width: 49%;
          height: 100%;
          background-color: aqua;
        }
        .sys{
          width: 49%;
          height: 100%;
          background-color: rgb(243, 220, 9);
        }
      }

      .pageMain{
        width: 98%;
        height: 93%;
        margin: 1% auto 0;
        background-color: #fff;
      }
    }
}
</style>
