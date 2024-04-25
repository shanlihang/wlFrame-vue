<template>
  <div class="login" v-if="flag">
    <router-view></router-view>
  </div>
  <div class="layout" v-else>
    <div class="menu">
      <MenuList :list="state.list"/>
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
import {ref,onMounted, reactive} from 'vue'
import {MenuType} from '@/model/menu'
import {useSystemStore} from '@/store/system'

const flag = ref<boolean>(false)

interface State{
  list:MenuType[]
}

const state = reactive<State>({
  list:[]
})

const store = useSystemStore()

onMounted(() => {
    if(location.pathname == '/login'){
        flag.value = !flag.value
    }
    state.list = store.menu
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
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
}
.layout .area .header{
  margin-left: 1px;
  min-height: 50px;
  background-color: #fff;
}
.layout .area .main{
  width: 99%;
  flex :1 0 auto;
  margin: 10px auto;
  border-radius: 6px;
  background-color: #fff;
}
</style>
  