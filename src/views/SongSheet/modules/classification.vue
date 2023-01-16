<template>
  <a-modal :closable="false" width="1200px" v-model:visible="visible" :mask="false" :footer="null" title="分类"
    @ok="handleOk">
    <div class=" flex md:h-72 md:flex-col md:justify-between">
      <div class=" flex">
        <div class="md:mr-4 md:w-10 text-base subpixel-antialiased font-semibold">语种</div>
        <div><span @click="selectType(item)" class="md:mr-4 cursor-pointer"
            v-for="(item, index) in sub.filter(item => item.category === 0)" :key="index">{{ item.name }}</span></div>
      </div>
      <div class=" flex">
        <div class="md:mr-4 md:w-10 text-base subpixel-antialiased font-semibold">风格</div>
        <div><span @click="selectType(item)" class="md:mr-4 cursor-pointer"
            v-for="(item, index) in sub.filter(item => item.category === 1)" :key="index">{{ item.name }}</span></div>
      </div>
      <div class=" flex">
        <div class="md:mr-4 md:w-10 text-base subpixel-antialiased font-semibold">场景</div>
        <div><span @click="selectType(item)" class="md:mr-4 cursor-pointer"
            v-for="(item, index) in sub.filter(item => item.category === 2)" :key="index">{{ item.name }}</span></div>
      </div>
      <div class=" flex">
        <div class="md:mr-4 md:w-10 text-base subpixel-antialiased font-semibold">情感</div>
        <div><span @click="selectType(item)" class="md:mr-4 cursor-pointer"
            v-for="(item, index) in sub.filter(item => item.category === 3)" :key="index">{{ item.name }}</span></div>
      </div>
      <div class=" flex">
        <div class="md:mr-4 md:w-10 text-base subpixel-antialiased font-semibold">主题</div>
        <div><span @click="selectType(item)" class="md:mr-4 cursor-pointer"
            v-for="(item, index) in sub.filter(item => item.category === 4)" :key="index">{{ item.name }}</span></div>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Classification_',
  setup (props, { emit }) {
    const data = reactive({
      visible: false,
      categories: [],
      sub: []
    })
    const open = (categories, sub) => {
      data.categories = Object.values(categories)
      data.sub = sub
      data.visible = true
    }
    // 选择类型
    const selectType = (item) => {
      emit('myType', item)
      data.visible = false
    }
    const handleOk = () => {

    }
    return {
      ...toRefs(data),
      open,
      handleOk,
      selectType
    }

  }
})
</script>
<style lang="scss" scoped>

</style>