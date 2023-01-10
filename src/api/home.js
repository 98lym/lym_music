import axios from '@/utils/request'
// 推荐歌单
export function recommendedSongList(params) {
  return axios({
    method: 'get',
    url:'/personalized',
    params: params,
  })
}
// 私人FM
export function personalFm(params) {
  return axios({
    method: 'get',
    url:'/personal_fm',
    params: params,
  })
}