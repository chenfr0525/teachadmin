import request from '@/utils/request'

//获取推荐和经典课程(所有课程)
export const getRecommendorClassic = (params) => request.get('/user/courses', { params })

//获取课程详情
export const getCourseDetail = (id) => request.get(`/user/courses/${id}`)
