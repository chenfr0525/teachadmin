import {adminGetInfoService} from '@/api/admin'
import {defineStore} from 'pinia'
import {ref} from 'vue'

//用户模块token setToken removeToken
export const useAdminStore = defineStore('big-admin',()=>{
  const role=ref(1)
  const token = ref('')
  const setToken = (newToken)=>{
    token.value = newToken
  }
  const removeToken = ()=>{
    token.value=''
  }
  const user = ref({})
  const getUser = async()=>{
    const res = await adminGetInfoService()
    user.value=res.data.data.admin.username
  }

  const setUser =(obj)=>{
    user.value=obj
  }
  return {
    role,
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