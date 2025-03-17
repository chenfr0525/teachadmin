import request from '@/utils/requestAdmin'

//admin后台首页信息
export const adminHomeGetService = () => request.get('/admin/home')