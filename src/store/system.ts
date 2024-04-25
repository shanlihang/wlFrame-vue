import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system',() => {
        const menu = ref([])
        const isLoginPage = ref<boolean>(false)

        const changeToLogin = () => {
            isLoginPage.value = true
        }

        const changeBackLogin = () => {
            isLoginPage.value = true
        }

        return {isLoginPage,changeToLogin,changeBackLogin,menu}
    },
    {
        persist: {
            key: 'menu',
            storage: sessionStorage,
        }

    }
)