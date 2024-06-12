<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
const echarts = inject("echarts");

const info = ref(null);

onMounted(() => {
 var userEc = echarts.init(info.value, "light");

 var option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110,0,0,0,0,0,0],
      type: 'bar'
    }
  ]
};

 userEc.setOption(option);
});
</script>

<template>
    <div class="device-grow" style="width: 100%; height: 100%">
      <div ref="info" style="width: 100%; height: 100%"></div>
    </div>
</template>

<style scoped lang="less"></style>