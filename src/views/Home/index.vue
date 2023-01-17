<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container md:max-w-full md:px-52">
      <div class="flex md:flex-row md:justify-between md:text-4xl md:font-semibold md:mb-5 md:mt-10 text-gray-50">
        <div>推荐歌单</div>
        <div class="md:text-lg lineHeight cursor-pointer" @click="goAllSongSheet">{{ viewAll }}</div>
      </div>
      <div class="grid md:grid-cols-5 md:gap-x-4 md:gap-y-6">
        <div v-for="item in recommendedSongList" :key="item.id" class="group" @click="getPlaylistDetail(item)">
          <div class="relative">
            <div 
            class="group-hover:bg-gray-300 
            md:rounded-full md:w-16 
            opacity-50 md:h-16 
            md:absolute 
            md:left-1/2 md:top-1/2 
            md:translate-x-[-50%] 
            md:translate-y-[-50%] 
            z-40"></div>
            <img class="md:rounded-lg transform motion-safe:hover:scale-105 delay-150 duration-300" :src="item.picUrl" alt="">
          </div>
          <div class=" md:text-base md:mt-2 text-gray-50 hover:cursor-pointer">{{ item.name }}</div>
        </div>
      </div>
  </div>
</template>
<script>
import { defineComponent,onMounted,reactive ,toRefs} from 'vue';
import {recommendedSongList,recommendSongs} from '@/api/home'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const state=reactive({
      viewAll:'查看全部',
      recommendedSongList:[], // 推荐歌单列表
      
    })
    const router = useRouter()
    onMounted(()=>{
      getRecommendedSongList()
    })
    // 推荐歌单
    const getRecommendedSongList=()=>{
      recommendedSongList({limit:10}).then(res=>{
       if(res.code==200) {
        state.recommendedSongList=res.result || []
       }
      }).catch(()=>{
        state.recommendedSongList=[]
      })
    }
    // 歌单详情
    const getPlaylistDetail =(item)=>{
      router.push({ path: '/SongList', query: { id: item.id } })
    }
    // 查看全部———>默认全部歌单
    const goAllSongSheet =()=>{
      router.push({ path: '/songSheet'})
    }
    return {
      ...toRefs(state),
      getPlaylistDetail,
      goAllSongSheet
    };
  },
});
</script>
<style scoped>
.lineHeight{
  line-height: 40px;
  opacity:.68
}
</style>