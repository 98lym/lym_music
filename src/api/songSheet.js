import axios from '@/utils/request'
// 歌单详情
export function playlistDetail(params) {
  return axios({
    method: 'get',
    url:'/playlist/detail',
    params: params,
  })
}
// 获取歌单所有歌曲
export function playlistAll(params) {
  return axios({
    method: 'get',
    url:'/playlist/track/all',
    params: params,
  })
}
// 获取音乐 url
export function songUrl(params) {
  return axios({
      method: 'get',
      url:'/song/url/v1',
      params: params,
    })
}
// 获取歌词
export function getLyric(params) {
  return axios({
    method: 'get',
    url:'/lyric',
    params: params,
  })
}
// 歌单分类 说明 : 调用此接口,可获取歌单分类
export function playlistCatlist(params) {
  return axios({
    method: 'get',
    url:'/playlist/catlist',
    params: params,
  })
}
// 歌单 ( 网友精选碟 ) 说明 : 调用此接口 , 可获取网友精选碟歌单
export function topPlaylist(params) {
  return axios({
    method: 'get',
    url:'/top/playlist',
    params: params,
  })
}