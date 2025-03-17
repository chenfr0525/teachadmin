import { studentGetInfoService } from '@/api/student'
import { getPLanService } from '@/api/plan'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//用户模块token setToken removeToken
export const useStudentStore = defineStore('big-student', () => {
  const role=ref(0)
  //token
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }
  //user用户信息
  const user = ref({})
  const getUser = async () => {
    const res = await studentGetInfoService()
    const {username}=res.data.data.student
    user.value = {username}
  }

  const setUser = (obj) => {
    user.value = obj
  }
  //学习计划plan
  const plan = ref({
    goal: '',
    interests: '',
    level: '',
  })
  const getPlan = async () => {
    const res = await getPLanService()
    const { goal, interests, level } = res.data.data.plan
    plan.value = { goal, interests, level }
  }
  const setPlan = (obj) => {
    plan.value = obj
  }
  return {
    role,
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser,
    plan,
    getPlan,
    setPlan
  }
}, {
  persist: true
})