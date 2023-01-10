import axios from '@/utils/request'
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function userSubcount(params) {
  return axios({
    method: 'get',
    url:'/user/subcount',
    params: params,
  })
}
// 获取用户歌单
export function userPlaylist(params) {
  return axios({
    method: 'get',
    url:'/user/playlist',
    params: params,
  })
}