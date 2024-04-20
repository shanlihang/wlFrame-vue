<script setup lang="ts">
import router from '@/router';
import {DownOutlined} from '@ant-design/icons-vue'
import {pinyin} from 'pinyin-pro'
import {onMounted} from 'vue'

const getFirstLetter = (name:string) => {
  return pinyin(name,{toneType:'none'}).charAt(0)
}

const goHome = () => {
  router.push('/home')
}

onMounted(() => {
})

</script>

<template>
  <div class="header-line">
    <div class="user-card">
      <a-popover>
        <template #content>
          <p class="option" @click="goHome">个人中心</p>
          <p class="option">退出登录</p>
        </template>
        <div class="user">
          <div class="info">
            <a-avatar style="color: #f56a00; background-color: #fde3cf;">{{ getFirstLetter("shan") }}</a-avatar>
            <span style="margin-left: 5px;">是否是哦啥佛山是南方商城name</span>
          </div>
          <div class="icon">
            <DownOutlined style="font-size: 16px;color: #A0A0A0;" />
          </div>
        </div>
      </a-popover>
    </div>
    
    
  </div>
</template>

<style scoped lang="less">
.header-line {
  height: 100%;
  position: relative;
  .user-card{
    height: 100%;
    .user{
      max-width: 150px;
      height: 100%;
      display: flex;
      align-items: center;
      color: #646464;
      position: absolute;
      right: 15px;
      .info{
        min-width: 85px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .icon{
        width: 20px;
      }
    }
  }
}
.option{
  width: 100px;
  height: 30px;
  text-align:center;
  line-height: 30px;
  cursor: pointer;
}
.option:hover{
  background-color: rgb(236, 245, 255);
  color: #4BB984;
}
</style>
