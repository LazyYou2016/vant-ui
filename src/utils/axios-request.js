import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { Notify } from 'vant'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import router from '@/router'
import Cookies from 'js-cookie'
Vue.use(Notify)
/**
 * 一、功能
 * 1. 统一拦截http错误请求码；
 * 2. 统一拦截业务错误代码；
 * 3. 统一设置请求前缀,每个 http 加前缀 baseURL
 * # 4. 配置异步请求过渡状态：显示蓝色加载条表示正在请求中，避免给用户页面假死的不好体验。使用 NProgress 工具库。
 *
 * 二、引包：
 * |-- axios：http 请求工具库
 * |-- vant： Notify 消息提示
 */

// 创建自定义axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 10000, // request timeout 请求超时时间
  withCredentials: true // 是否允许带cookie这些
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  // }
})

// request拦截器 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    /* if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    } */
    // config.headers['X-Token111sss'] = '1dfioasjij2323131nbabbbbbbb'

    // console.log(config)
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    Notify({ type: 'danger', message: error.message, duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

// respone拦截器 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log(response)
    const res = response.data
    // 由后端抛出的错误, 就是业务请求状态（和后端约定）
    /** JAVA组
     * code: '200'
     * data: {}
     * msg: ''
     * */
    /** 王建强
     * data: {}
     * msg: "success"
     * status: 100
     * */
    if (res.code !== '200' && res.code !== 200 && res.code !== '' && res.code !== undefined && res.code !== null) {
      // console.log(response)
      // 处理全局报错
      Notify({ type: 'danger', message: res.msg || `你是谁${res}`, duration: 5 * 1000 })
      return Promise.reject(res.msg)
    } else if (res.status !== 100 && res.status !== 200 && res.status !== '' && res.status !== undefined && res.status !== null) { // 针对王建强的请求返回状态
      // console.log(response)

      if (res.status === 101) {
        if (sessionStorage.getItem('101') === '0') {
          Notify({ type: 'danger', message: res.msg || `你是谁${res}`, duration: 5 * 1000 })
        }
        sessionStorage.setItem('101', sessionStorage.getItem('101') + 1)
        router.push('/login')
        // 清除用户信息
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('101')
        return Promise.reject(res.msg)
      }
      Notify({ type: 'danger', message: res.msg || `你是谁${res}`, duration: 5 * 1000 })
      return Promise.reject(res.msg)
    }
    return res
  },
  error => {
    // 对响应错误做点什么
    console.log(error) // for debug
    console.log(error.response) // for debug
    // 由网络或者服务器抛出的错误
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登陆'
          break
        case 600:
          error.message = '过期了，请重新登陆!'

          // 清除用户信息
          store.commit('user/SET_NAME', '')
          store.commit('user/SET_ROLES', '')
          Cookies.remove('token')
          sessionStorage.removeItem('userInfo')
          router.push('/login')
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = process.env.NODE_ENV !== 'production' ? `请求地址出错：${error.response.config.url}` : '请求失败'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      console.log('Error', error.message)
      error.message = '连接服务器失败!'
    }
    // 调用vant Notify
    Notify({ type: 'danger', message: error.message, duration: 3 * 1000 })
    return Promise.reject(error)
  }
)

export default service

/*
   服务器状态码错误信息解释
   200: '服务器成功返回请求的数据。',
   201: '新建或修改数据成功。',
   202: '一个请求已经进入后台排队（异步任务）。',
   204: '删除数据成功。',
   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
   401: '用户没有权限（令牌、用户名、密码错误）。',
   403: '用户得到授权，但是访问是被禁止的。',
   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
   406: '请求的格式不可得。',
   410: '请求的资源被永久删除，且不会再得到的。',
   422: '当创建一个对象时，发生一个验证错误。',
   500: '服务器发生错误，请检查服务器。',
   502: '网关错误。',
   503: '服务不可用，服务器暂时过载或维护。',
   504: '网关超时。'
*/
