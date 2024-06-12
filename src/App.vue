<template>
  <div class="layout">
    <MainView></MainView>
  </div>
  
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import MainView from '@/views/main/MainView.vue';
import {provide} from 'vue'

provide("echarts", echarts);



</script>
<style scoped>
.layout{
  width: 100%;
  height: 100vh;
}

</style>
