<!-- 
    1.src无默认值，必须传入图片的绝对路径
    2.width和height默认为80
 -->
<script setup lang="ts">
interface SvgSource{
    width?:string|number,
    height?:string|number,
    src:string
}

const props = withDefaults(defineProps<SvgSource>(),{
    width:20,
    height:20
})
</script>

<template>
    <div class="svgSource">
        <img :src="props.src" :style="{'width':props.width+'px',height:props.height+'px'}">
    </div>
</template>

<style scoped>
</style>