import http from '@/utils/http'

export const getUserByProId = function (params) {
  return http.get('/user/getUserByProId', params)
}
export const findUserById = function (params) {
  return http.get('/user/findUserById', params)
}
export const addUser = function (params) {
  return http.postQs('/user/addUser', params)
}
export const projectList = function (params) {
  return http.get('/project/projectList', params)
}
export const deleteUser = function (params) {
  return http.get('/user/deleteUser', params)
}
