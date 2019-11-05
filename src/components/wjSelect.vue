<template>
  <div class="wj-select el-input__inner">
    <span class="wj-select-label" :class="disabled?'wj-select-label-disabled':''" v-show="label">{{label}}</span>
    <el-select class="wj-select__inner" v-model="valueSelect" :size="size" :placeholder="placeholder" @change="changeVal" :disabled="disabled" :clearable="clearable">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data () {
    return {
      valueSelect: ''
    }
  },
  props: {
    options: {},
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  methods: {
    // 选择第一个选项
    selectFrist () {
      if (this.options && this.options.length !== 0) {
        this.valueSelect = this.options[0].value
      }
    },
    changeVal () {
      this.$emit('input', this.valueSelect)
      this.$emit('change', this.valueSelect)
    }
  },
  created () {},
  watch: {
    value (newVal) {
      this.valueSelect = newVal
    }
  },
  mounted () {
    // this.selectFrist()
    this.valueSelect = this.value
  }
}
</script>

<style lang="scss">
.wj-select {
  display: inline-flex;
  vertical-align: top;
  width: 200px;
  margin-top:1px;
  .wj-select-label{
    display: inline-block;
    padding: 0 10px;
    height: 14px;
    line-height: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #86BBD8;
    border-right: 1px solid #e6e6e6;
    font-size:14px;
  }
  .wj-select__inner{
    flex: 1;
    height: 36px;
    line-height: 32px;
  }
  .el-input__inner{
    border: none;
    min-width: 0;
    height: 34px;
    line-height: 34px;
  }
  &.el-input__inner{
    height: 36px;
    line-height: 32px;
  }
  // 禁用
  .el-input.is-disabled {
    .el-input__inner {
      background-color: #fff;
      color: #999999;
    }
  }
  .wj-select-label-disabled{
    color: #999999;
  }
  // icon
  .el-input__icon{
    line-height:34px;
  }
}
.el-select-dropdown,.el-popper{
  z-index:2082;
}
</style>

<style lang="scss" scoped>
.el-input__inner{
  padding: 0;
}
</style>
