<template>
  <div class="container md:max-w-full md:px-52 songlist">
    <div class="md:mt-10 flex md:flex-row">
      <div>
        <img class="md:rounded-lg md:w-60" :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="md:ml-10">
        <div class=" text-gray-50 md:text-2xl">歌单：{{ playlist.name }}</div>
        <div class=" text-gray-50 md:text-2xl">{{ createTime }} 创建</div>
        <div class=" text-gray-50 md:text-2xl">播放：{{ playlist.playCount }}次</div>
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
    // 音乐播放
    const playSong = (record) => {
      store.dispatch('playSong', record)
    }
    return {
      ...toRefs(data),
      playSong,
      route
    }
  }
})
</script>
<style lang="scss" scoped>
.songlist::v-deep {
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
    .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover {
      --tw-bg-opacity: 0;
      background-color: rgb(17 24 39 / var(--tw-bg-opacity));
    }
  }
}
</style>