<template>
  <div>测试</div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'HHHH',
  setup () {
    const data = reactive({})
    return {
      ...toRefs(data)
    }

  }
})
</script>
<style>

</style>