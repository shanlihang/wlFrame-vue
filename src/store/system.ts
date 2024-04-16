import {defineStore} from 'pinia'
import { reactive, ref } from 'vue'
import {ThemeOption} from '@/model/app'

export const useSystemStore = defineStore('system',() => {
    const theme = reactive<ThemeOption>({
        pageBgColor:'#f0f0f0',
        boxBgColor:'#fff',
        primaryColor:'#34e1f6',
        infoColor:'#A0A0A0',
        warnColor:'#ff0000',
        mainFontColor:'#282829',
        subFontColor:'rgba(0,0,0,0.5)',
        hoverColor:'#fff',
        selectColor:'#000'
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