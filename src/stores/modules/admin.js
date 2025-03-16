import {defineStore} from 'pinia'
import {ref} from 'vue'

//用户模块token setToken removeToken
export const useAdminStore = defineStore('big-admin',()=>{
  const token = ref('')
  const setToken = (newToken)=>{
    token.value = newToken
  }
  const removeToken = ()=>{
    token.value=''
  }
  const user = ref({})
  const getUser = async()=>{
    const res = await userGetInfoService()
    user.value = res.data.data
  }

  const setUser =(obj)=>{
    user.value=obj
  }
  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser
  }
},{
  persist:true
})