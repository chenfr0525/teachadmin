import request from '@/utils/requestAdmin'

//注册接口
export const adminRegisterService = ({ username, password, gender, phone,bio,address }) => {
  return request.post('/admin', { username, password, gender, phone,bio,address })
}

//登录接口
export const adminLoginService = ({ username, password }) => {
  return request.post('/admin/auth/login', { username, password })
}

//获取管理员基本信息
export const adminGetInfoService = () => request.get('/admin/me')

//获取管理员所有信息
export const adminGetAllService=({ currentPage, pageSize, username, bio })=>request.get('/admin',{params:{currentPage, pageSize, bio, username}})

//查询单个管理员信息
export const adminGetOneService = (id) => request.get(`/admin/${id}`)

//修改管理员信息
export const adminUpdateInfoService=(id,data)=>request.put(`/admin/${id}`,data)

//删除管理员
export const adminDeleteService=(id)=>request.delete(`/admin/${id}`)
