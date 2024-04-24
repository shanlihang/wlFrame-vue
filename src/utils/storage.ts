export const Local = {
    // 设置值：基本数据类型
    setBase(key:string,value:string){
        localStorage.setItem(key,value)
    },

    // 设置值：引用数据类型
    setObj(key:string,value:string){
        localStorage.setItem(key,JSON.stringify(value))
    },

    // 获取值
    get(key:string){
        return localStorage.getItem(key)
    },

    // 根据key删除
    remove(key:string){
        localStorage.removeItem(key)
    },

    // 清空
    clear(){
        localStorage.clear()
    }
}

export const Session = {
    // 设置值：基本数据类型
    setBase(key:string,value:string){
        sessionStorage.setItem(key,value)
    },

    // 设置值：引用数据类型
    setObj(key:string,value:string){
        sessionStorage.setItem(key,JSON.stringify(value))
    },

    // 获取值
    get(key:string){
        return sessionStorage.getItem(key)
    },

    // 根据key删除
    remove(key:string){
        sessionStorage.removeItem(key)
    },

    // 清空
    clear(){
        sessionStorage.clear()
    }
}