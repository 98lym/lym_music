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
// 获取每日推荐歌曲
export function recommendSongs(params) {
  return axios({
    method: 'get',
    url:'/recommend/songs',
    params: params,
  })
}

// 搜索
export function cloudsearch(params) {
  return axios({
    method: 'get',
    url:'/cloudsearch',
    params: params,
  })
}