<template>
  <div class="container md:max-w-full md:px-32 songSheet">
    <div class=" text-gray-50 md:text-3xl md:mb-5 md:mt-10 flex md:leading-none">
      <div class="md:mr-2">{{ type }}</div>
      <a-button @click="selectClassification">选择分类</a-button>
      <Classification ref="classification" @myType="myType" />
    </div>
    <div class="grid md:grid-cols-5 md:gap-x-4 md:gap-y-6">
      <div v-for="item in playlists" :key="item.id" class="group" @click="getPlaylistDetail(item)">
        <div class="relative">
          <div class="group-hover:bg-gray-300 
            md:rounded-full md:w-16 
            opacity-50 md:h-16 
            md:absolute 
            md:left-1/2 md:top-1/2 
            md:translate-x-[-50%] 
            md:translate-y-[-50%] 
            z-20"></div>
          <img class="md:rounded-lg transform motion-safe:hover:scale-105 delay-150 duration-300"
            :src="item.coverImgUrl" alt="">
        </div>
        <div class=" md:text-base md:mt-2 text-gray-50 hover:cursor-pointer">{{ item.name }}</div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="mx-auto md:w-128 md:mt-6">
      <a-config-provider :locale="locale">
        <a-pagination v-model:pageSize="pageSize" v-model:current="current" show-quick-jumper :total="total"
          @change="onChange" />
      </a-config-provider>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue'
import { playlistCatlist, topPlaylist } from '@/api/songSheet'
import Classification from './modules/classification.vue'
import { useRouter } from 'vue-router'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default defineComponent({
  name: 'SongSheet',
  components: {
    Classification
  },
  setup () {
    const router = useRouter()
    const classification = ref()
    const data = reactive({
      type: '全部',
      categories: {},
      sub: [],
      playlists: [],
      current: 1, // 当前页码
      pageSize: 50, // 当前页显示条目数。
      total: 0, // 总数
      locale: zhCN // 汉化包
    })
    onMounted(() => {
      playlistCatlist().then(res => {
        if (res.code === 200) {
          data.categories = res.categories
          data.sub = res.sub
        }
      })
      getTopPlaylist()
    })
    // 分页
    const onChange = (page, pageSize) => {
      console.log(page, pageSize, '123123')
      getTopPlaylist(page, pageSize)
    }
    // 选择分类
    const selectClassification = () => {
      classification.value.open(data.categories, data.sub)
    }
    // 获取分类
    const myType = (item) => {
      data.type = item.name
      getTopPlaylist()
    }
    // 获取全部或种类歌单
    const getTopPlaylist = (page, pageSize) => {
      topPlaylist({
        cat: data.type,
        offset: page ? page : 1,
        limit: pageSize ? pageSize : 50
      }).then(res => {
        if (res.code === 200) {
          data.playlists = res.playlists || []
          data.total = res.total || 0
        }
      }).catch(() => {
        data.playlists = []
      })
    }
    // 歌单详情
    const getPlaylistDetail = (item) => {
      router.push({ path: '/SongList', query: { id: item.id } })
    }
    return {
      ...toRefs(data),
      classification,
      selectClassification,
      getPlaylistDetail,
      myType,
      onChange,
      getTopPlaylist
    }

  }
})
</script>
<style lang="scss" scoped>
.songSheet::v-deep {
  .ant-pagination {
    color:white
  }
}
</style>