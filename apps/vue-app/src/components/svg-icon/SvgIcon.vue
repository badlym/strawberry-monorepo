<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

defineOptions({ name: 'SvgIcon' });

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  spin: {
    type: Boolean,
    default: false,
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

const getStyle = computed((): CSSProperties => {
  const { size } = props;
  let s = `${size}`;
  s = `${s.replace('px', '')}px`;
  return {
    width: s,
    height: s,
  };
});
</script>
<template>
  <svg
    :class="[$attrs.class, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true"
    class="svg-icon"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>
<style lang="less" scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
