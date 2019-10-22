import http from '@/utils/http'

// 设备列表
export const getBaseInfoById = function (params) {
  return http.get('/equipment/getBaseInfoById', params)
}

// 新增设备
export const addEquipment = function (params) {
  return http.postQs('/equipment/addEquipment', params)
}

// 获取项目列表
export const projectList = function (params) {
  return http.get('/project/projectList', params)
}

// 新增设备-选择负责人
export const getUserByProId = function (params) {
  return http.get('/user/getUserByProId', params)
}

// 修改设备信息
export const updateEquipment = function (params) {
  return http.postQs('/equipment/updateEquipment', params)
}

// 删除设备
export const deleteEquipmentById = function (params) {
  return http.get('/equipment/deleteEquipmentById', params)
}

// 查看用户负责设备
export const getUserWithEquipments = function (params) {
  return http.get('/equipment/getUserWithEquipments', params)
}

// 查看设备阈值 根据设备号
export const getThreshold = function (params) {
  return http.get('/threshold/getThreshold', params)
}
// 设置设备阈值
export const thresholdInfo = function (params) {
  return http.postQs('/threshold/thresholdInfo', params)
}
