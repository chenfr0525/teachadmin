import request from '@/utils/requestAdmin'

//admin后台首页信息
export const adminHomeGetService = () => request.get('/admin/home')

//获取学生所有信息
export const studentGetAllService = ({ currentPage, pageSize, createdAt, username, phone, status })=> request.get('/user/students',{params:{currentPage, pageSize, createdAt, username, phone, status}})

//查询单个学生信息
export const studentGetOneService = (id) => request.get(`/user/students/${id}`)

//删除学生
export const studentDeleteService = (id) => request.delete(`/user/students/${id}`)
