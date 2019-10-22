import http from '@/utils/http'

// 登陆
export const login = function (params) {
  return http.postQs('/login/userLogin', params)
}

// 退出登录
export const logOut = function (params) {
  return http.get('/login/logout')
}
// 修改密码
export const updateUserPassword = function (params) {
  return http.postQs('/user/updateUserPassword')
}
