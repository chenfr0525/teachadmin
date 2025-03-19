import request from '@/utils/requestAdmin'

//获取所有信息
export const InfoGetAllService=({currentPage,pageSize,title,username,status})=>request.get('/admin/informations',{params:{currentPage,pageSize,title,username,status}})

//获取单个信息
export const InfoGetOneService=(id)=>request.get(`/admin/informations/${id}`)

//创建通知
export const InfoPostService=({title, content, status})=> {
  return request.post('/admin/informations', { title, content, status })
}

//修改通知
export const InfoUpdateService=(id,data)=>request.put(`/admin/informations/${id}`,data)

//删除通知
export const InfoDeleteService=(id)=>request.delete(`/admin/informations/${id}`)

