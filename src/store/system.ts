import {defineStore} from 'pinia'
import { reactive, ref } from 'vue'
import {ThemeOption} from '@/model/app'

export const useSystemStore = defineStore('system',() => {
    const theme = reactive<ThemeOption>({
        pageBgColor:'#282828',
        boxBgColor:'#494949',
        primaryColor:'#34e1f6',
        infoColor:'#A0A0A0',
        warnColor:'#ff0000',
        mainFontColor:'#E0E0E0',
        subFontColor:'#fff',
        mainFontSize:'24rpx',
        subFontSize:'18rpx'
    })

    const waterRemark = ref<string>('123456')

    return {theme,waterRemark}
    },
    {
        persist: {
            key: 'theme',
            storage: sessionStorage,
        }

    }
)