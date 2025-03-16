import request from '@/utils/request'

//获取基础算法集锦
export const getAlgorithmService = () => request.get('/user/algorithms')

//获取常见错误集锦
export const getCommonErrorService = () => request.get('/user/commonerror')