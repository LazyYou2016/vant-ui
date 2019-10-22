import http from '@/utils/http'

export const getAllMenus = function () {
  return http.get('/menu/getAllMenus')
}
