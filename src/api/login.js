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