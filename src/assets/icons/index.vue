<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>
 
<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let iconName = computed(() => `#icon-${props.name}`);
    let svgClass = computed(() => {
      if (props.name) {
        return `svg-icon icon-${props.name}`;
      } else {
        return "svg-icon";
      }
    });
    return { iconName, svgClass };
  },
};
</script>
 
<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>