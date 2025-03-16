import request from '@/utils/request'

//获取信息
export const getInfoService = () => request.get('/user/informationstatus')

//修改信息
export const updateInfoService = (id) => request.put(`/user/informationstatus/${id}`)

//删除信息 
export const deleteInfoService = (id) => request.delete(`/user/informationstatus/${id}`)