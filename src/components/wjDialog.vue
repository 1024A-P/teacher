<template>
  <div class="el-dislog">
    <div class="wj-dialog">
      <div class="dialog-header" :class="type" v-show="headShow" :style="'width:' + width + 'px;height:' + height + 'px;'">
        {{title}}
        <i class="el-icon-close icon-close" @click="close"></i>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
    <div class="dialog-layer"></div>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  data () {
    return {
    }
  },
  props: {
    // 控制上方head显隐
    headShow: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '提示'
    },
    type: {
      type: String,
      default: 'white'
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    close () {
      this.$emit('closeDislog')
    }
  }
}
</script>
<style lang="scss" scoped>
.wj-dialog{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 250;
  background: #fff;
  min-width: 300px;
  min-height: 200px;
  box-shadow: 0 0 8px #ccc;
  border-radius: 8px;
}
.dialog-header {
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  // font-weight: bold;
  color:#303133;
  padding: 0 20px;
  border-radius: 8px 8px 0 0;
  text-align:left;
  position: relative;
  &.default{
    background: #86BBEB;
    color: #fff;
  }
  &.white{
    color: #706f6f;
  }
  &.danger{
    background: #D42A00;
    color: #fff;
  }
}
.dialog-body{
  padding: 0 20px 20px 20px;
  height: calc(100% - 50px);
}
.icon-close{
  font-family: 'element-icons' !important;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 28px;
  right: 17px;
  color:rgb(185, 184, 184);
  &:hover{
    color: #409EFF;
  }
}
// 遮罩
.dialog-layer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 249;
}
</style>
