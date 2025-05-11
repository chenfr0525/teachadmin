import { adminGetInfoService } from '@/api/admin'
import { defineStore } from 'pinia'
import { ref ,watch} from 'vue'

//用户模块token setToken removeToken
export const useAdminStore = defineStore('big-admin', () => {
  const role = ref(1)
  const token = ref('')
  const isLoaded = ref(false)
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }
  const user = ref({})
  const getUser = async () => {
    const res = await adminGetInfoService()
    let { username, avatar } = res.data.data.admin
    user.value = { username, avatar }
    isLoaded.value = true
  }

  const setUser = (obj) => {
    user.value = obj
  }
  return {
    role,
    token,
    isLoaded,
    setToken,
    removeToken,
    user,
    getUser,
    setUser
  }
}, {
  persist: true
})