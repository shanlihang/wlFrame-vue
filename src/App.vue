<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {useSystemStore} from '@/store/system'

const store = useSystemStore()
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style>
.page{
  background-color: v-bind(store.$state.theme.pageBgColor);
}
</style>
