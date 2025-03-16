import request from '@/utils/request'

//获取计划
export const getPLanService = () => request.get('/user/plans')

//创建计划表
export const setPlanService=(data)=>request.post('/user/plans',data)

//更新计划表
export const updatePlanService=(data)=>request.put(`/user/plans`,data)