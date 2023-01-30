import axios from '@/utils/request'
// 登录
export function login(params) {
    return axios({
        method: 'get',
        url: '/login/cellphone',
        // url:'/register/anonimous',
        params: params,
    })
}
// 发送验证码
export function sentCaptcha(params) {
    return axios({
      method:'get',
      url:'/captcha/sent',
      params:params
    })
}
// 二维码 key 生成接口
export function lgoinQrKey(params) {
    return axios({
      method:'get',
      url:'/login/qr/key',
      params:params
    })
}
// 二维码生成接口
export function qrCreate(params) {
  return axios({
    method:'get',
    url:'/login/qr/create',
    params:params
  })
}
// 二维码检测扫码状态接口
export function qrCheck(params) {
  return axios({
    method:'get',
    url:'/login/qr/check',
    params:params
  })
}
// 退出
export function logout(params) {
    return axios({
        method: 'get',
        url: '/logout',
        params: params,
    })
}
// 签到
export function signIn(params) {
  return axios({
    method: 'get',
    url: '/daily_signin',
    params: params,
  })
}
// 登录状态
export function loginStatus(params) {
  return axios({
    method: 'get',
    url: '/login/status',
    params: params,
  })
}