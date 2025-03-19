import request from '@/utils/request'

//注册接口
export const studentRegisterService = ({ username, password,gender,phone,email,address,school,status }) => {
  return request.post('/user/students', { username, password,gender,phone,email,address,school,status })
}

//登录接口
export const studentLoginService = ({ username, password }) => {
  return request.post('/user/auth/login', { username, password })
}

//获取学生基本信息
export const studentGetInfoService = () => request.get('/user/students/me')

//修改学生信息
export const studentUpdateInfoService=(id,data)=>request.put(`/user/students/${id}`,data)