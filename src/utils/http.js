import request from '@/utils/request'
import qs from 'qs'

const http = {
  /**
   *  Author BaoQi
   *  封装get请求方法
   *  @param {string} url     - 接口地址
   *  @param {object} params  - 参数名
   *  @returns {Promise}
   */
  get: function (url, params) {
    return request({
      url: url,
      method: 'get',
      params: params
    })
  },
  /**
   *  Author BaoQi
   *  封装post请求方法
   *  @param {string} url     - 接口地址
   *  @param {object} data    - 参数名
   *  @returns {Promise}
   */
  post: function (url, data) {
    return request({
      url: url,
      method: 'post',
      data
    })
  },
  /**
   *  Author BaoQi
   *  封装post请求方法
   *  @param {string} url     - 接口地址
   *  @param {object} data    - 参数名
   *  @returns {Promise}
   */
  postQs: function (url, data) {
    return request({
      url: url,
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * Author BaoQi
   * 封装patch请求
   *  @param {string} url     - 接口地址
   *  @param {object} data    - 参数名
   * @returns {Promise}
   */
  patch: function (url, data) {
    return request({
      url: url,
      method: 'patch',
      data: data
    })
  },
  /**
   * Author BaoQi
   * 封装put请求
   * @param {string} url     - 接口地址
   * @param {object} data    - 参数名
   * @returns {Promise}
   */
  put (url, data) {
    request({
      url: url,
      method: 'put',
      data: data
    })
  }
}

export default http
