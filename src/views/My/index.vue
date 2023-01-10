<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { userPlaylist, userSubcount } from '@/api/my'
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const state = reactive({
      viewAll: '查看全部',
      viewAllStatus1:false,
      viewAllStatus2:false,
      artistCount: null, // 我的歌手数量
      createdPlaylistCount: null, // 创建的歌单数量
      subPlaylistCount: null, // 收藏的歌单数量
      getPlaylists: [], // 创建的歌单列表
      collectSongList: [] // 收藏的歌单列表
    })
    const router = useRouter()
    onMounted(() => {
      // 获取用户信息 , 歌单，收藏，mv, dj 数量
      userSubcount({}).then(res => {
        if (res.code === 200) {
          state.createdPlaylistCount = res.createdPlaylistCount || 0
          state.subPlaylistCount = res.subPlaylistCount || 0
          getUserSongSheet(res.createdPlaylistCount, res.subPlaylistCount)
        }
      })
    })
    // 获取用户歌单
    const getUserSongSheet = (createdPlaylistCount, subPlaylistCount) => {
      userPlaylist(
        {
          uid: localStorage.getItem('uid'),
          limit: createdPlaylistCount + subPlaylistCount || 0
        })
        .then(res => {
          if (res.code === 200) {
            state.getPlaylists = res.playlist.slice(0, createdPlaylistCount) || [] // 创建的歌单列表
            state.collectSongList = res.playlist.slice(createdPlaylistCount, res.playlist.length) || [] // 收藏的歌单列表
          }
        })
        .catch(() => {
          state.getPlaylists = []
          state.collectSongList = []
        })
    }

    // 歌单详情
    const getPlaylistDetail = (item) => {
      router.push({ path: '/SongList', query: { id: item.id } })
    }
    return {
      ...toRefs(state),
      router,
      getPlaylistDetail
    }
  }
})
</script>
<template>
  <div class="container md:max-w-full md:px-52">
    <div class="flex md:flex-row md:justify-between md:text-4xl md:font-semibold md:mb-5 md:mt-10 text-gray-50">
      <div>创建的歌单</div>
      <div class="md:text-lg lineHeight" @click="viewAllStatus1=true">{{ viewAll }}</div>
    </div>
    <div class="grid md:grid-cols-5 md:gap-x-4 md:gap-y-6">
      <div v-for="item in (viewAllStatus1?getPlaylists :getPlaylists.slice(0, 10))" :key="item.id" class="group" @click="getPlaylistDetail(item)">
        <div class="relative">
          <div class="group-hover:bg-gray-300 
          md:rounded-full md:w-16 
          opacity-50 md:h-16 
          md:absolute
          md:left-1/2 md:top-1/2 
          md:translate-x-[-50%] 
          md:translate-y-[-50%] 
          z-10"></div>
          <img class="md:rounded-lg transform motion-safe:hover:scale-105 delay-150 duration-300"
            :src="item.coverImgUrl" alt="">
        </div>
        <div class=" md:text-base md:mt-2 text-gray-50 hover:cursor-pointer">{{ item.name }}</div>
      </div>
    </div>
    <div class="flex md:flex-row md:justify-between md:text-4xl md:font-semibold md:mb-5 md:mt-10 text-gray-50">
      <div>收藏的歌单</div>
      <div class="md:text-lg lineHeight" @click="viewAllStatus2=true">{{ viewAll }}</div>
    </div>
    <div class="grid md:grid-cols-5 md:gap-x-4 md:gap-y-6">
      <div v-for="item in (viewAllStatus2?collectSongList:collectSongList.slice(0, 10))" :key="item.id" class="group" @click="getPlaylistDetail(item)">
        <div class="relative">
          <div class="group-hover:bg-gray-300 
          md:rounded-full md:w-16 
          opacity-50 md:h-16 
          md:absolute 
          md:left-1/2 md:top-1/2 
          md:translate-x-[-50%] 
          md:translate-y-[-50%] 
          z-40"></div>
          <img class="md:rounded-lg transform motion-safe:hover:scale-105 delay-150 duration-300"
            :src="item.coverImgUrl" alt="">
        </div>
        <div class=" md:text-base md:mt-2 text-gray-50 hover:cursor-pointer">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<style>

</style>