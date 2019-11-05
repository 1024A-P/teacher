<template>
  <div class="el-form-item__content">
    <div class="el-input" :class="disabled ? 'is-disabled':''">
      <label class="el-input__inner">
        <span class="wj-input-label" v-show="label">{{label}}</span>
        <input
          type="text"
          :class="size"
          @input="_input"
          :disabled="disabled"
          @blur="check"
          :value="value"
          :placeholder="placeholder"
          :maxlength="maxlength"
          class="wj-input__inner"
        >
      </label>
    </div>
  </div>
</template>

<script type='text/babel'>
/**
 * 格式化输入框
 * regex 正则表达式 (过滤掉该正则表达式匹配的内容)
 * 如: regex中填入[^0123456789.]匹配 . 和 数字
 *     regex中填入 \D 匹配数字
 */
export default {
  name: 'Input',
  props: {
    value: '',
    placeholder: {},
    maxlength: {},
    regex: {
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    blurValue: {
      type: String,
      default: ''
    },
    inputCheck: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      input: '',
      pdl: 15
    }
  },
  mounted () {
    this.input = this.value
  },
  methods: {
    _input (e) {
      if (this.inputCheck) {
        return this.onInput(e)
      }
      var str = e.target.value.replace(new RegExp(this.regex, 'ig'), '')
      this.$emit('input', str)
      this.$emit('verify')
    },
    onInput (e) {
      if (!this.regex) {
        return
      }
      var str = e.target.value.replace(new RegExp(this.regex, 'ig'), '')
      e.target.value = str
      this.input = str
      this.$emit('input', str)
      this.$emit('verify')
    },
    check (e) {
      this.onInput(e)
      if (this.blurValue) {
        if (!e.target.value || e.target.value === 0) {
          e.target.value = this.blurValue
          this.input = this.blurValue
          this.$emit('blur', this.blurValue)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item__content {
  display: inline-block;
  width: 200px;
  line-height: 36px;
}
.el-input__inner {
  height: 36px;
  display: inline-flex;
  padding-left: 0;
  vertical-align: middle;
}
.medium {
  width: 224px;
}
.wj-input-label{
  // flex: 1;
  display: inline-block;
  padding: 0 10px;
  height: 14px;
  line-height: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #86BBD8;
  border-right: 1px solid #e6e6e6;
}
.wj-input__inner{
  flex: 1;
  background-color: #fff;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  outline: 0;
  padding-left: 10px;
  transition: border-color .2s;
  min-width: 0;
}
.mini {
  width: 60px;
}
.small {
  width: 180px;
}
// placeholder样式
input::-webkit-input-placeholder {
  color: #aab2bd;
}
</style>
