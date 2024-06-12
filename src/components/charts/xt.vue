<script setup lang="ts">
import { onMounted, ref, inject } from "vue";
const echarts = inject("echarts");

const info = ref(null);

onMounted(() => {
 var userEc = echarts.init(info.value, "light");

 var option = {
  title: {
    text: '居民血糖状态',
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
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
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
        { value: 15, name: '高血糖' },
        { value: 5, name: '低血糖' },
        { value: 7, name: '正常' },
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