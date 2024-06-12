<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
const echarts = inject("echarts");

const info = ref(null);

onMounted(() => {
 var userEc = echarts.init(info.value, "light");

 var option = {
  title: {
    text: '不同时间段检测频率',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: ['9-10点', '10-11点', '1-3点', '3-5点', '5-7点']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [7,10,52,31,17],
      type: 'line'
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