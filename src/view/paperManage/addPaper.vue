<template>
  <div class="paper-manage">
    <div class="choice-info-title">
      <span @click="$toPage('/paperManage')">
        &lt;&lt;&nbsp;返回上一页
      </span>
    </div>
    <!-- <div class="line-title paper-info-title">添加试卷</div> -->
    <div class="steps-block">
      <el-steps :active="activeIndex" align-center>
        <el-step title="基本信息" description="填写试卷的基本信息"></el-step>
        <el-step title="选择题" description="导入选择题"></el-step>
        <el-step title="判断题" description="导入判断题"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <!-- 内容表单 -->
    <div class="form-content-point">
      <BasicInfo @firstFinish="firstFinish" v-show="activeIndex===1"></BasicInfo>
      <ImportChoice @firstStep="prewStep(1)" @secondFinsh="secondFinsh" v-show="activeIndex===2"></ImportChoice>
      <ImportJudge v-show="activeIndex===3" @secondStep="prewStep(2)" @thirdFinsh="thirdFinsh"></ImportJudge>
      <AddFinished :tagList="tagList" :form="form" v-show="activeIndex===5" @fourthStep="prewStep(3)"></AddFinished>
    </div>
  </div>
</template>
<script>
import BasicInfo from './basicInfo'
import ImportChoice from './importChoice'
import ImportJudge from './importJudge'
import AddFinished from './addFinished'
export default {
  name: 'AddPaper',
  data () {
    return {
      // 步骤条
      activeIndex: 1,
      // 表单
      form: {},
      // 标签
      tagList: {
        stuTag: [],
        choTag: [],
        judTag: []
      }
    }
  },
  methods: {
    // 填写基本信息钩子函数
    firstFinish (data, list) {
      this.form = Object.assign(this.form, data)
      this.tagList.stuTag = list
      this.activeIndex = 2
      console.log(this.form)
    },
    // 导入选择题
    secondFinsh (data, list) {
      this.form = Object.assign(this.form, data)
      this.tagList.choTag = list
      this.activeIndex = 3
      console.log(this.form)
    },
    // 导入判断题
    thirdFinsh (data, list) {
      this.form = Object.assign(this.form, data)
      this.tagList.judTag = list
      this.activeIndex = 5
      console.log(this.form)
    },
    // 上一步
    prewStep (step) {
      this.activeIndex = step
    }
  },
  components: {
    BasicInfo,
    ImportChoice,
    ImportJudge,
    AddFinished
  }
}
</script>
<style lang="scss" scoped>
.paper-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.paper-info-title{
  text-align: left;
  width:100%;
}
.steps-block{
  // background:skyblue;
  margin:40px 0 0 0;
}
.choice-info-title{
  text-align: left;
  // width:100%;
  font-size:14px;
  color:#a5a4a4;
  line-height:24px;
  cursor:pointer;
  &:hover{
    color:#409EFF;
    // text-decoration: underline;
  }
}
.form-content-point{
  // background:skyblue;
  margin-top: 60px
}
</style>
