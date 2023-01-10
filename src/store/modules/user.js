import { getToken, setToken, removeToken } from '@/utils/auth'
// import { message } from 'ant-design-vue'
import { login,logout } from '@/api/login'
import { songUrl,getLyric } from '@/api/songSheet'
const user = {
    state: {
        token: getToken(),
        lyric:'',
        songData:{}
    },
    mutations: {
        // getToken
        setToken(state, token) {
            state.token = token
            setToken(token) // vuex和 缓存数据的同步
        },
        // removeToken
        removeToken(state) {
            state.token = null
            removeToken() // 删除vuex和缓存数据的token
        },
        // getSong
        getSong(state,data) {
          state.songData ={
            title:data.name,
            author:data.ar[0].name,
            url:data.url,
            pic:data.al.picUrl,
          }
        },
        // getLyric
        getLyric(state,data) {
          state.lyric=data
        }
    },
    actions: {
        // 登录
        async login(context, data) {
            const res = await login(data)
            try {
                context.commit('setToken', res.token)
                localStorage.setItem('uid',res.account.id)
                localStorage.setItem('avatarUrl', res.profile.avatarUrl)
                // context.commit('setToken', res.cookie)
            } catch (error) {
                // message.error(error.message)
            }
        },
        // 退出
        logOut ({commit,state}) {
          return new Promise(resolve=>{
            logout(state.token).then(()=>{
              resolve()
            }).catch(() => {
              resolve()
            }).finally(()=>{
                commit('removeToken')
            })
          })
        },
        // 播放音乐
        playSong (context,data) {
          songUrl({id:data.id,level:'higher'}).then(res=>{
           if(res.code===200) {
            const songData={
              ...data,
              ...res.data[0]
            }
            context.commit('getSong',songData)
           }
          })
          // 音乐歌词
          getLyric({id:data.id}).then(res=>{
           if(res.code=200) {
            context.commit('getLyric',res.lrc.lyric)
           }
          })
        }
    }
}
export default user