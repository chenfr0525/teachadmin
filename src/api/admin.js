import request from '@/utils/request'

//注册接口
export const adminRegisterService = ({ username, password, gender, phone }) => {
  return request.post('/admin', { username, password, gender, phone })
}

//登录接口
export const adminLoginService = ({ username, password }) => {
  return request.post('/admin/auth/login', { username, password })
}