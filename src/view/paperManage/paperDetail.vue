<template>
  <div class="paper-detail">
    <div class="paper-detail-header">
      <!-- <div class="header-block">
        考试号：exam-101
      </div> -->
      <div class="header-block">
        <span style="font-size:20px;">JAVA期中考试</span>&emsp;&emsp;
        <span>考试时长：120分钟</span>&emsp;&emsp;
        <span>考试时间：2019-10-24 00:00:00</span>
      </div>
      <div class="header-block" style="text-align:right">
        <el-button type="primary" style="margin:10px 20px" @click="$toPage('/paperManage')">返回</el-button>
      </div>
    </div>
    <div class="paper-detail-content">
      <div class="topic-detail choice-topic">
        <p>一、选择题</p>
        <div class="choice-detail" v-for="(item, index) in choiceList" :key="index">
          <p>
            {{index+1}}、{{item.txtName}}
            <span v-show="item.type==='2'">（不定项）</span>
          </p>
          <p v-for="(item,index) in handleOptions(item.options)" :key="index">
            &ensp;{{$utils.turnEng(index)}}.&ensp;{{item}}
          </p>
          <p>
            答案：
            <span style="color:#409EFF;font-weight:bold">
              {{setAnswer(item.answer)}}
            </span>
          </p>
          <p style="overflow:hidden">
            <span class="fl">难度：</span>
            <el-rate :value="item.hardType*1" disabled class="fl">
            </el-rate>
          </p>
        </div>
      </div>
      <div class="topic-detail judge-topic">
        <p>二、判断题</p>
        <div class="choice-detail" v-for="(item, index) in judgeList" :key="index">
          <p>
            {{index+1}}、{{item.txtName}}
          </p>
          <p>
            答案：
            <span style="color:#409EFF;font-weight:bold">
              {{item.answer==='1'?'正确':item.answer==='2'?'错误':''}}
            </span>
          </p>
          <p style="overflow:hidden">
            <span class="fl">难度：</span>
            <el-rate :value="item.hardType*1" disabled class="fl">
            </el-rate>
          </p>
        </div>
      </div>
      <!-- <div class="topic-detail other-topic">
        {{otherId}}
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaperDetail',
  data () {
    return {
      examId: 0,
      choiceId: '',
      judgeId: '',
      otherId: '',
      choiceList: [],
      judgeList: [],
      otherList: []
    }
  },
  methods: {
    // 获取考试详情
    getExamDetail () {
      let data = {
        id: this.examId
      }
      this.$http.post('/api/manage/getPaperDetail', data).then(res => {
        if (res.body.msg === 'success') {
          let ob = res.body.data[0]
          this.choiceId = ob.choiceId
          this.judgeId = ob.judgeId
          this.otherId = ob.otherId
          this.getChoiceList()
          this.getJudgeList()
        } else {
          console.log('获取考试详情失败！')
        }
      })
    },
    // 获取选择题
    getChoiceList () {
      let data = {
        id: this.choiceId
      }
      this.$http.post('/api/manage/getChoiceArr', data).then(res => {
        this.choiceList = res.body.data
        // console.log(this.choiceList)
      })
    },
    // 获取判断题
    getJudgeList () {
      let data = {
        id: this.judgeId
      }
      this.$http.post('/api/manage/getJudgeArr', data).then(res => {
        this.judgeList = res.body.data
        console.log(this.judgeList)
      })
    },
    // 处理选择题答案显示
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
    this.examId = this.$route.query.id
    this.getExamDetail()
  }
}
</script>
<style lang="scss" scoped>
.paper-detail{
  width:100%;
}
.paper-detail-header{
  width:100%;
  height:60px;
  // background:orange;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
  text-align: left;
  display:flex;
}
.header-block{
  flex:1;
  display: inline-block;
  height:60px;
  overflow:hidden;
  margin-left:20px;
  line-height: 60px;
  font-size:14px;
  color:#303133;
}
.paper-detail-content{
  width:100%;
  overflow: hidden;
}
.topic-detail{
  width:1000px;
  // background:skyblue;
  margin-top:30px;
  text-align:left;
  padding:0 40px;
  font-size:16px;
  font-weight:bold;
}
.choice-detail{
  font-weight: normal;
  font-size:14px;
  p{
    margin:8px 0;
  }
  margin-bottom:14px;
}
</style>
