import http from '@/utils/http'

// 首页设备数量接口接口
export const equipmentNum = function (params) {
  return http.get('/equipment/getBaseCount', params)
  // return http.postQs('http://192.168.1.56:40085/equipment/getBaseCount', params)
}

// 首页表格数据
export const equipmentInfo = function (params) {
  return http.get('/equipment/getBaseInfoById', params)
}

// 单个设备信息
export const baseInfo = function (params) {
  return http.get('/equipment/baseInfoByEqId', params)
}

// 单个温湿度图表
export const EquipmentOfCharts = function (params) {
  return http.get('/equipment/getEquipmentOfChartsByEqId', params)
}

// 首页事件信息-获取今日所有电梯报警信息列表(最新10条)
export const allAlarmLogs = function (params) {
  return http.postQs('/elevator/allAlarmLogs', params)
}
