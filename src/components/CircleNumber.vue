<template>
  <span class="circle-number">
    <span class="circle-number-num">{{ num }}</span>
  </span>
</template>

<script>
export default {
  name: 'CircleNumber',
  props: {
    num: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
  .circle-number {
    height: 20px;
    width: 20px;
    display: inline-block;
    vertical-align: top;
    border-radius: 50%;
    border: 1px solid #000;

    .circle-number-num {
      display: block;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
    }
  }
</style>
