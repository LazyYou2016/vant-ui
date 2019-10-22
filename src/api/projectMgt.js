import http from '@/utils/http'

// 获取单条详情【编辑】
export const getProInfo = function (params) {
  return http.get('/project/getProInfo', params)
}

// 删除项目
export const deleteProject = function (params) {
  return http.get('/project/deleteProject', params)
}

// 查询所有项目列表
export const searchPro = function (params) {
  return http.get('/project/projectList', params)
}

// 新增项目
export const addProject = function (params) {
  return http.postQs('/project/addProject', params)
}

// 修改项目信息
export const updateProject = function (params) {
  return http.postQs('/project/updateProject', params)
}
