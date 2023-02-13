<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container md:max-w-full md:px-32">
    <div class="flex md:flex-row md:justify-between md:text-4xl md:font-semibold md:mb-5 md:mt-10 text-gray-50">
      <div>推荐歌单</div>
      <div class="md:text-lg lineHeight cursor-pointer" @click="goAllSongSheet">{{ viewAll }}</div>
    </div>
    <div class="grid md:grid-cols-5 md:gap-x-4 md:gap-y-6">
      <div v-for="item in recommendedSongList" :key="item.id" class="group" @click="getPlaylistDetail(item)">
        <div class="relative">
          <div class="group-hover:bg-gray-300 
            md:rounded-full md:w-16 
            opacity-50 md:h-16 
            md:absolute 
            md:left-1/2 md:top-1/2 
            md:translate-x-[-50%] 
            md:translate-y-[-50%] 
            z-20"></div>
          <img class="md:rounded-lg transform motion-safe:hover:scale-105 delay-150 duration-300" :src="item.picUrl"
            alt="">
        </div>
        <div class=" md:text-base md:mt-2 text-gray-50 hover:cursor-pointer">{{ item.name }}</div>
      </div>
    </div>
    <div class="flex md:flex-row md:justify-between md:text-4xl md:font-semibold md:mb-5 md:mt-10 text-gray-50">
      <div>For You</div>
    </div>
    <div class="flex md:flex-row">
      <div class="flex-1 h-52 rounded-xl  md:mr-8 relative z-10 overflow-hidden">
        <img :src="recommendImg" alt="" class="recommendImg">
        <div class="flex w-2/4 h-full items-center z-10 bg-gradient-to-r from-red-300">
          <div class="text-6xl font-semibold text-gray-50 md:w-36 md:h-36 ml-8 grid gap-4 grid-cols-2 gap-x-0	column-gap: 0px;
gap-y-0 md:leading-16 justify-items-center">
            <div>每</div>
            <div>日</div>
            <div>推</div>
            <div>荐</div>
          </div>
        </div>
      </div>
      <div class="flex-1 h-52 rounded-xl bg-red-200">2</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { recommendedSongList, recommendSongs, recommendResource } from '@/api/home'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const state = reactive({
      viewAll: '查看全部',
      recommendedSongList: [], // 推荐歌单列表
      recommendResource: [], // 获取每日推荐歌单
      recommendImg: '', // 获取每日推荐歌单封面
    })
    const router = useRouter()
    onMounted(() => {
      getRecommendedSongList()
      recommendFn()
    })
    // //禁止鼠标拖动，如拖动图片、连接等
    document.ondragstart = function (event) {
      return false;
    };
    // 推荐歌单
    const getRecommendedSongList = () => {
      recommendedSongList({ limit: 10 }).then(res => {
        if (res.code == 200) {
          state.recommendedSongList = res.result || []
        }
      }).catch(() => {
        state.recommendedSongList = []
      })
    }
    // 获取每日推荐歌单
    const recommendFn = () => {
      recommendResource().then(res => {
        if (res.code === 200) {
          state.recommendResource = res.recommend
          state.recommendImg = res.recommend[3].picUrl
        }
      })
    }
    // 歌单详情
    const getPlaylistDetail = (item) => {
      router.push({ path: '/SongList', query: { id: item.id } })
    }
    // 查看全部———>默认全部歌单
    const goAllSongSheet = () => {
      router.push({ path: '/songSheet' })
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
.lineHeight {
  line-height: 40px;
  opacity: .68
}

@keyframes recommendImg {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-50%);
  }
}

.recommendImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: recommendImg 38s infinite;
  animation-direction: alternate;
  z-index: -1;
}
</style>