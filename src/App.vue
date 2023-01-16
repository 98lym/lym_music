<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style  scoped>
html,
body {
  height: 100%;
}

#app {
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
  box-sizing: border-box;
  scrollbar-width: none;
}

/*滚动条样式*/
#app::-webkit-scrollbar {
  width: 6px;
}

#app::-webkit-scrollbar-thumb {
  z-index: 999;
  --tw-text-opacity: 1;
  background: rgb(225 29 72 / var(--tw-text-opacity));
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

#app::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity));
}
</style>
