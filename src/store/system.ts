import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system',() => {
        const isLoginPage = ref<boolean>(false)

        const changeToLogin = () => {
            isLoginPage.value = true
        }

        const changeBackLogin = () => {
            isLoginPage.value = true
        }

        return {isLoginPage,changeToLogin,changeBackLogin}
    },
    // {
    //     persist: {
    //         key: 'theme',
    //         storage: sessionStorage,
    //     }

    // }
)