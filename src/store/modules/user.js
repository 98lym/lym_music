import { getToken, setToken, removeToken } from '@/utils/auth'
import { notification } from 'ant-design-vue';
import { login, logout } from '@/api/login'
import { songUrl, getLyric } from '@/api/songSheet'
import { Item } from 'ant-design-vue/lib/menu';
const user = {
  state: {
    token: getToken(),
    // lyric:'',
    songData: {},
    songAllUrl:[]
  },
  mutations: {
    // getToken
    setToken (state, token) {
      state.token = token
      setToken(token) // vuex和 缓存数据的同步
    },
    // removeToken
    removeToken (state) {
      state.token = null
      removeToken() // 删除vuex和缓存数据的token
    },
    // getSong
    getSong (state, data) {
      state.songData = {
        title: data.name,
        author: data.ar[0].name,
        url: data.url,
        pic: data.al.picUrl,
      }
    },
    getAllSong (state,songAllUrl) {
      state.songAllUrl = songAllUrl.map(item=>{
        return {
          title: item.name,
          author: item.ar[0].name,
          url: item.url,
          pic: item.al.picUrl,
        }
      })
    }
    // getLyric
    // getLyric(state,data) {
    //   state.lyric=data
    // }
  },
  actions: {
    // 登录
    login (context, data) {
      login(data).then(res => {
        if (res.code === 200) {
          context.commit('setToken', res.token)
          localStorage.setItem('uid', res.account.id)
          localStorage.setItem('avatarUrl', res.profile.avatarUrl)
          notification.open({
            message: '登录成功',
            duration: 3,
          });
          return
        }
        notification.open({
          message: res.message,
          duration: 3,
        });
      }).catch(() => {
        notification.open({
          message: '登录失败',
          duration: 3,
        });
      })
    },
    // 退出
    logOut ({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('removeToken')
        })
      })
    },
    // 播放音乐(单首)
    playSong (context, data) {
      songUrl({ id: data.id, level: 'higher' }).then(res => {
        if (res.code === 200) {
          const songData = {
            ...data,
            ...res.data[0]
          }
          context.commit('getSong', songData)
        }
      })
      // // 音乐歌词
      // getLyric({id:data.id}).then(res=>{
      //  if(res.code=200) {
      //   context.commit('getLyric',res.lrc.lyric)
      //  }
      // })
    },
    // 播放全部
    playAllSong (context, data) {
      const ids = data.map(item => {
        return item.id
      })
      songUrl({ id: ids, level: 'higher' }).then(res => {
        if (res.code === 200) {
          const songAllUrl = data.map(item => {
            return {
              ...item,
              ...res.data.filter(itemurl => {
                if(itemurl.id===item.id){
                  return {
                    itemurl
                  }
                }
              })[0]
            }
          })
          context.commit('getAllSong', songAllUrl)
        }
      })
    }
  }
}
export default user