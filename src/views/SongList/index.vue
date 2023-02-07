<template>
  <div class="container md:max-w-full md:px-52 songlist">
    <div class="md:mt-10 flex md:flex-row">
      <div class="imgbox">
        <img class="md:rounded-lg md:w-60 img" :src="playlist.coverImgUrl" alt="">
        <div class="img_shadow" :style="{ backgroundImage: 'url(' + playlist.coverImgUrl + ')', backgroundSize: 'cover' }"></div>
      </div>
      <div class="md:ml-10">
        <div class=" text-gray-50 md:text-5xl subpixel-antialiased font-medium">{{ playlist.name }}</div>
        <div class=" text-gray-50 md:text-2xl">{{ createTime }} 创建</div>
        <div class=" text-gray-50 md:text-2xl">{{ playlist.playCount }}次播放</div>
        <!-- <div class="text-gray-50">{{ playlist.description }}</div> -->
        <div class="md:mt-5">
          <svg-icon @click="playAll" name="play" class="md:text-5xl text-red-600 active:text-red-900"></svg-icon>
        </div>
      </div>
    </div>
    <div>
      <div class="text-gray-50 md:text-2xl md:mt-4">歌曲列表
        <span>{{ songs.length }}首歌</span>
      </div>
      <a-table :columns="columns" :data-source="songs" :pagination="false">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'play'">
            <div class="relative">
              {{ index+ 1}}
              <svg-icon class=" 
                text-red-600
                active:text-red-900
                  md:absolute 
                  md:left-1/2 md:top-1/2 
                  md:translate-x-[-50%] 
                  md:translate-y-[-50%]" name="play" @click="playSong(record)"></svg-icon>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>

</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { playlistDetail, playlistAll } from '@/api/songSheet'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import moment from 'moment'
export default defineComponent({
  name: 'SongList',
  setup () {
    const store = useStore()
    const route = useRoute()
    const data = reactive({
      playlistDetailID: route.query.id,
      createTime: '',
      playlist: {},
      songs: [],
      columns: [
        { dataIndex: 'play', key: 'play', width: '20px' },
        { title: '歌曲标题', dataIndex: 'name', width: '200px' },
        {
          title: '歌手', dataIndex: 'ar',
          width: '200px',
          customRender: ({ text }) => {
            return <span>{text[0].name}</span>
          },
        },
        {
          title: '专辑', dataIndex: 'al', width: '200px',
          customRender: ({ text }) => {
            return <span>{text.name}</span>
          },
        },
      ]
    })
    onMounted(() => {
      playlistDetail({ id: data.playlistDetailID }).then(res => {
        if (res.code === 200) {
          data.playlist = res.playlist
          data.createTime = moment(res.playlist.createTime).format('YYYY-MM-DD')
        }
      })
      playlistAll({ id: data.playlistDetailID }).then(res => {
        if (res.code === 200) {
          data.songs = res.songs
        }
      })
    })
    // 音乐播放(单首)
    const playSong = (record) => {
      store.dispatch('playSong', record)
    }
    // 播放全部
    const playAll = () => {
      const songData = data.songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          ar: item.ar,
          al: item.al
        }
      })
      store.dispatch('playAllSong', songData)
    }
    return {
      ...toRefs(data),
      playSong,
      playAll,
      route
    }
  }
})
</script>
<style lang="scss" scoped>
.songlist::v-deep {
  .imgbox {
    position: relative;

    .img {
      position: relative;
      z-index: 2;
    }

    .img_shadow {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 12px;
      z-index: 0;
      filter: blur(16px) opacity(.6);
      transform: scale(.92, .96);
      border-radius: .75em;
      aspect-ratio: 1/1;
    }
  }

  svg {
    display: inline;
  }

  .ant-table {
    color: white;
    --tw-bg-opacity: 0;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));

    .ant-table-thead>tr>th {
      color: white;
      --tw-bg-opacity: 0;
      background-color: rgb(17 24 39 / var(--tw-bg-opacity));
      border-bottom: none;
    }

    .ant-table-tbody>tr>td {
      border-bottom: none;
    }

    .ant-table-tbody>tr.ant-table-row:hover>td,
    ant-table-tbody>tr>td.ant-table-cell-row-hover {
      --tw-bg-opacity: 0;
      background-color: rgb(17 24 39 / var(--tw-bg-opacity));
    }

    .ant-table-tbody>tr.ant-table-row:hover>td,
    .ant-table-tbody>tr>td.ant-table-cell-row-hover {
      --tw-bg-opacity: 0;
      background-color: rgb(17 24 39 / var(--tw-bg-opacity));
    }
  }
}
</style>