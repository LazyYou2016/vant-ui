import http from '@/utils/http'

export const getUserByProId = function (params) {
  return http.get('/user/getUserByProId', params)
}
export const updateEquipmentForCharge = function (params) {
  return http.get('/equipment/updateEquipmentForCharge', params)
}
