import request from '@/utils/request'

//获取学生端首页信息
export const studenthomeGetService = () => request.get('/user')