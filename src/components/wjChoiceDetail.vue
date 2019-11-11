<template>
  <div class="look-detail-block">
    <div class="row-part">
      <span class="title-color">题号：</span>{{dataList.txtId}}
    </div>
    <div class="row-part">
      <span class="title-color">类型：</span>{{dataList.type==='1'?'单项选择题':dataList.type==='2'?'不定项选择题':''}}
    </div>
    <div class="row-part">
      <div class="fl">
        <span class="title-color">题目：</span>
      </div>
      <div class="fl" style="width:86%">{{dataList.txtName}}</div>
    </div>
    <div class="row-part">
      <div class="fl">
        <span class="title-color">难度：</span>
      </div>
      <div class="fl">
        <el-rate :value="dataList.hardType*1" disabled>
        </el-rate>
      </div>
    </div>
    <div class="row-part" style="margin-bottom:0">
      <div class="fl">
        <span class="title-color">选项：</span>
      </div>
      <div class="single-choice fl">
        <div style="width:100%">
          <div v-for="(item,index) in handleOptions(dataList.options)" :key="index" style="margin-bottom:20px;width:100%">
            {{$utils.turnEng(index)}}.&ensp;{{item}}
          </div>
        </div>
      </div>
    </div>
    <div class="row-part">
      <span class="title-color">答案：</span>{{setAnswer(dataList.answer)}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChoiceDetail',
  data () {
    return {
      answer: []
    }
  },
  props: {
    dataList: {
      type: Object
    }
  },
  methods: {
    // 处理答案显示
    setAnswer (exAnswer) {
      let answer = JSON.parse(exAnswer)
      let result = ''
      for (let i in answer) {
        result = result + this.$utils.turnEng(answer[i]) + ' '
      }
      return result
    },
    // 处理选项
    handleOptions (options) {
      let result = JSON.parse(options.replace(/'/g, '"'))
      return result
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.look-detail-block{
  width:400px;
  // height:300px;
  // background:orange;
  overflow: hidden;
}
.row-part{
  // background:skyblue;
  overflow:hidden;
  font-size:14px;
  color:#303133;
  margin-bottom:30px;
}
.single-choice{
  width:86%;
  margin-top:1px;
}
.title-color{
  color:#929597;
}
</style>
<style lang="scss">
.el-dialog__body{
  padding:20px!important;
}
</style>
