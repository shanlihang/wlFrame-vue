<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
const echarts = inject("echarts");

const info = ref(null);

onMounted(() => {
 var userEc = echarts.init(info.value, "light");

 var option = {
  title: {
    text: '居民血压状况',
    subtext: '检测结果统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 10, name: '高血压' },
        { value: 6, name: '低血压' },
        { value: 11, name: '正常' },
      ]
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