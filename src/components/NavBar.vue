<template>
  <div class="bg-white dark:bg-gray-900  relative navBar">
    <div
      class="bgBackdrop flex md:flex-row md:justify-between content-center  md:mb-8  bg-white md:h-16  dark:bg-gray-900 md:bg-opacity-70 fixed md:w-screen z-40 md:px-32">
      <div class="text-gray-50 navbarLineHeight">
        <span @click="back">
          <svg-icon name="arrow-left" class=" md:text-3xl"></svg-icon>
        </span>
        <span @click="go">
          <svg-icon name="arrow-right" class=" md:text-3xl"></svg-icon>
        </span>
      </div>
      <div class="flex md:flex-row ">
        <div class="md:antialiased text-gray-50 md:text-3xl md:mr-8 navbarLineHeight">
          <button :class="{ active: route.name === 'Home' }" @click="goHome">发现</button>
        </div>
        <div class="md:antialiased text-gray-50 md:text-3xl md:mr-8 navbarLineHeight">
          <button :class="{ active: route.name === 'My' }" @click="goMy">我的</button>
        </div>
        <div class="md:antialiased text-gray-50 md:text-3xl navbarLineHeight">
          <button :class="{ active: route.name === 'SongSheet' }" @click="goShongSheet">音乐库</button>
        </div>
      </div>
      <div class="md:mr-10 md:rounded-full md:h-16 md:w-12 relative">
        <a-input-search class="absolute md:-left-40 md:top-4" v-model:value="search" placeholder="" @search="onSearch"
          allowClear style="width: 150px" />
        <a-dropdown>
          <img :src="myAvatarUrl" @click.prevent class=" md:rounded-full md:absolute 
          md:left-1/2 md:top-1/2 
          md:translate-x-[-50%] 
          md:translate-y-[-50%] " alt="">
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="signInFn">签到</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="logOut">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="md:mb-8 md:h-16"></div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
    </router-view>
    <div class=" md:h-16"></div>
    <div
      class="bgBackdrop bg-white md:h-16 inset-x-0 bottom-0  dark:bg-gray-900 md:bg-opacity-70 fixed md:w-screen z-40 md:px-32">
      <div class=" navbarLineHeight md:w-full">
        <Aplayer></Aplayer>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import Aplayer from "@/components/aPlayer.vue"
import { notification } from 'ant-design-vue';
import { signIn } from '@/api/login.js'
export default defineComponent({
  components: {
    Aplayer
  },
  setup () {
    let myAvatarUrl = ref(localStorage.getItem("avatarUrl"))
    const search = ref('')
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // 路由
    const goHome = () => {
      router.push("/home")
    }
    const goMy = () => {
      router.push("/my")
    }
    const goShongSheet = () => {
      router.push('/songSheet')
    }
    // 签到
    const signInFn = () => {
      signIn({ type: 1 }).then(res => {
        if (res.code === 200) {
          notification.open({
            message: '签到成功',
            duration: 3,
            style: {
              width: '200px',
            },
          });
          return
        }
        notification.open({
          message: res.msg,
          duration: 3,
          style: {
            width: '200px',
          },
        });
      }).catch(() => {
        notification.open({
          message: '重复签到',
          // description: '重复签到',
          duration: 3,
          style: {
            width: '200px',
          },
        });
      })
    }
    // 退出登录
    const logOut = () => {
      store.dispatch("logOut").then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 16);
      })
    }
    // 搜索
    const onSearch = (searchValue, event) => {
      if (searchValue === '') return
      router.push({ path: '/CloudSearch', query: { searchValue: searchValue } })
    }
    // 后退
    const back = () => {
      router.back()
    }
    // 前进
    const go = () => {
      router.go(1)
    }
    return {
      search,
      logOut,
      myAvatarUrl,
      route,
      goHome,
      goMy,
      goShongSheet,
      back,
      go,
      signInFn,
      onSearch
    };
  },
});
</script>
<style lang="scss" scoped>
.navBar::v-deep {
  .bgBackdrop {
    backdrop-filter: saturate(180%) blur(20px);
  }

  .navbarLineHeight {
    line-height: 64px;
  }

  .active {
    color: #e11d48;
  }

  svg {
    display: inline;
  }

  .ant-input-affix-wrapper {
    --tw-bg-opacity: 0.2;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    border: none;
    border-radius: 0.75rem;

    .ant-input {
      --tw-bg-opacity: 0;
      background-color: rgb(60 60 60 / var(--tw-bg-opacity));
      color: white;
    }
  }

  .ant-input-affix-wrapper:not(:last-child) {
    border-radius: 0.75rem !important;
  }

  .ant-input-group-addon {
    --tw-bg-opacity: 0;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    border: none;

    .ant-input-search-button {
      --tw-bg-opacity: 0;
      background-color: rgb(60 60 60 / var(--tw-bg-opacity));
      border: none;
    }

    .ant-input-search-button:not(.ant-btn-primary) {
      color: #e11d48 !important;
    }
  }
}
</style>