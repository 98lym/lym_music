<template>
  <div class="CloudSearch container md:max-w-full md:px-52">
    <div class="flex justify-between">
      <div class="flex-1 md:mr-32">
        <div class="text-gray-50 font-semibold md:text-2xl md:mb-3">歌手</div>
        <div class="flex justify-between">
          <div v-for="item in artists" :key="item.id">
            <img class="rounded-full md:w-44" :src="item.img1v1Url" alt="">
            <div class="text-gray-50 text-base text-center md:mt-1">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="text-gray-50 font-semibold md:text-2xl md:mb-3">专辑</div>
        <div class="flex justify-between">
          <div v-for="item in albums" :key="item.id">
            <img class="rounded-lg md:w-44" :src="item.blurPicUrl" alt="">
            <div class="text-gray-50 text-base text-center md:mt-1 ellipsis">{{ item.name }} <span class="text-sm">{{
              item.artist.name
            }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:mt-10">
      <div class="text-gray-50 font-semibold md:text-2xl md:mb-4">歌曲</div>
      <div class="grid grid-rows-4 grid-flow-col gap-6">
        <div v-for="item in songs" :key="item.id" class="flex" @click="playSong(item)">
          <img class="rounded-lg md:w-14 md:h-14" :src="item.al.picUrl" alt="">
          <div class="text-gray-50 md:ml-2">
            <div class="text-lg">{{ item.name }}</div>
            <div>{{ item.ar[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:mt-10">
      <div class="text-gray-50 font-semibold md:text-2xl md:mb-4">歌单</div>
      <div class="grid md:grid-cols-5 md:gap-x-4 md:gap-y-6">
        <div v-for="item in playlists" :key="item.id" @click="getPlaylistDetail(item)">
          <div class="relative group">
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
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useStore } from 'vuex'
import { cloudsearch } from '@/api/home.js'
export default defineComponent({
  name: 'CloudSearch_',
  setup () {
    const store = useStore()
    const data = reactive({
      artists: [], // 歌手
      albums: [], // 专辑
      songs: [], // 歌曲  
      playlists: [], // 歌单
    })
    const route = useRoute()
    const router = useRouter()
    onMounted(() => {
      // 单曲
      cloudsearch({ keywords: route.query.searchValue, limit: 16 }).then(res => {
        if (res.code === 200) {
          data.songs = res.result.songs || []
        }
      })
      // 歌单
      cloudsearch({ keywords: route.query.searchValue, type: 1000, limit: 10 }).then(res => {
        if (res.code === 200) {
          data.playlists = res.result.playlists || []

        }
      })
      // 歌手
      cloudsearch({ keywords: route.query.searchValue, type: 100, limit: 3 }).then(res => {
        if (res.code === 200) {
          data.artists = res.result.artists || []
        }
      })
      // 专辑
      cloudsearch({ keywords: route.query.searchValue, type: 10, limit: 3 }).then(res => {
        if (res.code === 200) {
          data.albums = res.result.albums || []
        }
      })
    })
    const playSong = (item) => {
      store.dispatch('playSong', item)
    }
    const getPlaylistDetail = (item) => {
      router.push({ path: '/SongList', query: { id: item.id } })
    }
    watch(
      () => route.query.searchValue,
      (newValue, oldValue) => {
        // 单曲
        if (newValue === null || newValue === undefined || newValue === '') return
        cloudsearch({ keywords: newValue, limit: 16 }).then(res => {
          if (res.code === 200) {
            data.songs = res.result.songs || []
          }
        })
        // 歌单
        cloudsearch({ keywords: newValue, type: 1000 }).then(res => {
          if (res.code === 200) {
            data.playlists = res.result.playlists || []
          }
        })
        // 歌手
        cloudsearch({ keywords: newValue, type: 100, limit: 3 }).then(res => {
          if (res.code === 200) {
            data.artists = res.result.artists || []
          }
        })
        // 专辑
        cloudsearch({ keywords: newValue, type: 10, limit: 3 }).then(res => {
          if (res.code === 200) {
            data.albums = res.result.albums || []
          }
        })
      }
    )
    return {
      ...toRefs(data),
      playSong,
      getPlaylistDetail
    }

  }
})
</script>
<style lang="scss" scoped>
@media (min-width: 768px) {
  .CloudSearch {
    .ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 11rem;
    }
  }
}
</style>