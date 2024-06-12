<script setup lang="ts">
import { reactive } from "vue";
import peopleGrow from '@/components/charts/peopleGrow.vue'
import blood from '@/components/charts/blood.vue'
import xt from '@/components/charts/xt.vue'
import other from '@/components/charts/other.vue'


const count = reactive({
  people:27,
  community:7,
  result:251,
  high:147
})



</script>

<template>
  <div class="index">
    <div class="count">
      <div class="item">
        <div class="label">合作社区数</div>
        <div class="value">{{ count.community }}</div>
      </div>
      <div class="item">
        <div class="label">居民数</div>
        <div class="value">{{count.people}}</div>
      </div>
      <div class="item">
        <div class="label">检测次数</div>
        <div class="value">{{ count.result }}</div>
      </div>
      <div class="item">
        <div class="label">三高一慢人数</div>
        <div class="value">{{ count.high }}</div>
      </div>
    </div>
    <div class="title">居民人数增长</div>
    <div class="people">
      <peopleGrow />
    </div>
    <div class="title">检测结果看板</div>
    <div class="result">
      <div class="blood">
        <blood />
      </div>
      <div class="xt"><xt /></div>
      <div class="other"><other /></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.index{
    width: 100%;
    padding-bottom: 20px;
    .title{
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      font-weight: bold;
      text-indent:2rem;
    }
    .count{
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item{
        height: 120px;
        width: 20%;
        border-radius: 6px;
        background-color: rgb(240, 240, 240);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        .label{
          font-size: 16px;
        }
        .value{
          font-size: 28px;
          font-weight: bold;
          color: forestgreen;
        }
      }
    }

    .people{
      width: 100%;
      height: 400px;
    }
    .result{
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: space-around;
      .blood,.xt,.other{
        width: 30%;
        height: 400px;
        border-radius: 6px;
        background-color: rgb(240, 240, 240);
      }
    }
}

</style>
