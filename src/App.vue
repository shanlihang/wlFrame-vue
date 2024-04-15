<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {useSystemStore} from '@/store/system'

const store = useSystemStore()
</script>

<template>
  <div style="width: 500px;height: 500px;background-color: aqua;">
    <router-view></router-view>
  </div>
  <router-link to="/test1">test1</router-link>
  <router-link to="/test2">test2</router-link>
  

</template>

<style>
.page{
  background-color: v-bind(store.$state.theme.pageBgColor);
}
</style>
