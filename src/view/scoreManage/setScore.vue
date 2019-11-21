<template>
  <div class="score-manage">
    <div class="line-title score-info-title">
      {{examDetail.paperName}}
      <el-button type="primary" size="medium" class="fr" style="width:120px" @click="$toPage('/scoreManage')">返回</el-button>
    </div>
    <div class="exam-basic-info">考生：{{examDetail.stuName}}</div>
    <div class="exam-basic-info">耗时：{{examDetail.wastedTime}}分钟</div>
    <div class="exam-basic-info">交卷时间：{{examDetail.finishDate}}</div>
    <div class="exam-basic-info">
      选择题得分：<span style="color:#409EFF;font-weight:bold">{{choiceSum}}</span> 分
      （满分 {{paperDetail.choiceCount}} 分，共 {{paperDetail.choiceCount / paperDetail.choicePoint}} 道，每道 {{paperDetail.choicePoint}} 分，答对 {{choiceNum}} 道）
    </div>
    <div class="exam-basic-info">
      判断题得分：<span style="color:#409EFF;font-weight:bold">{{judgeSum}}</span> 分
      （满分 {{paperDetail.judgeCount}} 分，共 {{paperDetail.judgeCount / paperDetail.judgePoint}} 道，每道 {{paperDetail.judgePoint}} 分，答对 {{judgeNum}} 道）
    </div>
    <div class="exam-basic-info" v-show="false">
      其它题得分
    </div>
    <div class="exam-basic-info">
      考试总得分：<span style="color:#409EFF;font-weight:bold">{{sumPoint}}</span> 分
      <div style="display:inline-block;margin-left:10px">
        <el-button type="warning" size="mini">编辑</el-button>
        <el-button type="primary" size="mini" @click="savePoint">保存</el-button>
      </div>
    </div>
    <!-- 试卷题目 -->
    <div class="paper-detail-content">
      <div class="topic-detail choice-topic">
        <p style="font-weight:bold">
          选择题（本大题共{{paperDetail.choiceCount/paperDetail.choicePoint}}小题，每小题{{paperDetail.choicePoint}}分，满分{{paperDetail.choiceCount}}分）
        </p>
        <div class="choice-detail" v-for="(item, index) in choiceList" :key="index">
          <p>
            {{index+1}}、{{item.txtName}}
            <span v-show="item.type==='2'">（不定项）</span>
          </p>
          <p v-for="(item,index) in handleOptions(item.options)" :key="index">
            &ensp;{{$utils.turnEng(index)}}.&ensp;{{item}}
          </p>
          <p style="overflow:hidden;line-height:20px">
            <span class="fl">考生答案：</span>
            <span class="fl" style="color:#409EFF;font-weight:bold">
              {{setChoiceAnswer(choiceAnswer[index])}}
            </span>
            <span v-show="choiceRight(item.type,item.answer,choiceAnswer[index])" class="fl" style="width:20px;height:20px;margin-left:10px">
              <img src="~@A/images/right.png" width="20">
            </span>
            <span v-show="choiceWrong(item.type,item.answer,choiceAnswer[index])" class="fl" style="width:20px;height:20px;margin-left:10px">
              <img src="~@A/images/wrong.png" width="20">
            </span>
          </p>
          <p style="overflow:hidden;line-height:20px">
            <span class="fl">正确答案：</span>
            <span style="color:#409EFF;font-weight:bold" class="fl">
              {{setAnswer(item.answer)}}
            </span>
          </p>
          <!-- <p style="overflow:hidden">
            <span class="fl">难度：</span>
            <el-rate :value="item.hardType*1" disabled class="fl">
            </el-rate>
          </p> -->
        </div>
      </div>
      <div class="topic-detail judge-topic">
        <p style="font-weight:bold">
          判断题（本大题共{{paperDetail.judgeCount/paperDetail.judgePoint}}小题，每小题{{paperDetail.judgePoint}}分，满分{{paperDetail.judgeCount}}分）
        </p>
        <div class="choice-detail" v-for="(item, index) in judgeList" :key="index">
          <p>
            {{index+1}}、{{item.txtName}}
          </p>
          <p style="overflow:hidden;line-height:20px">
            <span class="fl">考生答案：</span>
            <span style="color:#409EFF;font-weight:bold" class="fl">
              {{setJudgeAnswer(judgeAnswer[index])}}
            </span>
            <span v-show="judgeRight(item.answer,judgeAnswer[index])" class="fl" style="width:20px;height:20px;margin-left:10px">
              <img src="~@A/images/right.png" width="20">
            </span>
            <span v-show="judgeWrong(item.answer,judgeAnswer[index])" class="fl" style="width:20px;height:20px;margin-left:10px">
              <img src="~@A/images/wrong.png" width="20">
            </span>
          </p>
          <p style="overflow:hidden;line-height:20px">
            <span class="fl">正确答案：</span>
            <span style="color:#409EFF;font-weight:bold" class="fl">
              {{item.answer==='1'?'正确':item.answer==='2'?'错误':''}}
            </span>
          </p>
          <!-- <p style="overflow:hidden">
            <span class="fl">难度：</span>
            <el-rate :value="item.hardType*1" disabled class="fl">
            </el-rate>
          </p> -->
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
  name: 'SetScore',
  data () {
    return {
      // 答案详情
      examDetail: {},
      // 考试题目详情
      paperDetail: {},
      // 考生答案
      choiceAnswer: [],
      judgeAnswer: [],
      otherAnswer: [],
      // 题目详情
      choiceId: '',
      judgeId: '',
      otherId: '',
      choiceList: [],
      judgeList: [],
      otherList: [],
      // 答案正确的题目数量
      choiceNum: 0,
      judgeNum: 0,
      otherNum: 0,
      // 选择题所得分数
      choiceSum: 0,
      // 判断题所得分数
      judgeSum: 0,
      // 其它题所得分数
      otherSum: 0,
      // 总分数
      sumPoint: 0
    }
  },
  methods: {
    // 获取考生答案详情
    getStuAnswer (id) {
      let data = {
        id: id
      }
      this.$http.post('/api/manage/getStuAnswer', data).then(res => {
        if (res.body.msg === 'success') {
          this.examDetail = res.body.data[0]
          this.choiceAnswer = JSON.parse(this.examDetail.choiceAnswer)
          this.judgeAnswer = JSON.parse(this.examDetail.judgeAnswer)
          this.otherAnswer = this.examDetail.otherAnswer
          this.getExamDetail()
        } else {
          console.log('获取考生答案失败！')
        }
      })
    },
    // 获取考试详情
    getExamDetail () {
      let data = {
        id: this.examDetail.examId
      }
      this.$http.post('/api/manage/getPaperDetail', data).then(res => {
        if (res.body.msg === 'success') {
          let ob = res.body.data[0]
          this.paperDetail = ob
          this.choiceId = ob.choiceId
          this.judgeId = ob.judgeId
          this.otherId = ob.otherId
          // 获取选择题
          this.getChoiceList()
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
        // 获取判断题
        this.getJudgeList()
      })
    },
    // 获取判断题
    getJudgeList () {
      let data = {
        id: this.judgeId
      }
      this.$http.post('/api/manage/getJudgeArr', data).then(res => {
        this.judgeList = res.body.data
        this.computePoint()
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
    },
    // 处理考生答案
    setChoiceAnswer (vo) {
      let result = ''
      if (typeof (vo) === 'object') {
        for (let i in vo) {
          result = result + this.$utils.turnEng(vo[i]) + ' '
        }
      } else {
        result = this.$utils.turnEng(vo)
      }
      return result
    },
    // 处理判断题答案
    setJudgeAnswer (vo) {
      let result = ''
      if (vo === 1) {
        result = '正确'
      } else if (vo === 2) {
        result = '错误'
      }
      return result
    },
    // 选择题显示对错
    choiceRight (type, answer, stuAnswer) {
      answer = JSON.parse(answer)
      if (type === '1') {
        // 单选题
        if (answer[0] === stuAnswer) {
          return true
        } else {
          return false
        }
      } else if (type === '2') {
        // 多选题
        let result = false
        if (answer.length !== stuAnswer.length) {
          result = false
        } else {
          for (let i in stuAnswer) {
            if (answer.indexOf(stuAnswer[i]) === -1) {
              result = false
            } else {
              result = true
            }
          }
        }
        return result
      }
    },
    choiceWrong (type, answer, stuAnswer) {
      answer = JSON.parse(answer)
      if (type === '1') {
        // 单选题
        if (answer[0] !== stuAnswer) {
          return true
        } else {
          return false
        }
      } else if (type === '2') {
        // 多选题
        let result = false
        if (answer.length !== stuAnswer.length) {
          result = true
        } else {
          for (let i in stuAnswer) {
            if (answer.indexOf(stuAnswer[i]) === -1) {
              result = true
            } else {
              result = false
            }
          }
        }
        return result
      }
    },
    // 判断题显示对错
    judgeRight (answer, stuAnswer) {
      answer = answer * 1
      if (answer === stuAnswer) {
        return true
      } else {
        return false
      }
    },
    judgeWrong (answer, stuAnswer) {
      answer = answer * 1
      if (answer === stuAnswer) {
        return false
      } else {
        return true
      }
    },
    // 统计分数
    computePoint () {
      // 选择题答案
      let choiceEx = []
      // 判断题答案
      let judgeEx = []
      // 计算选择题答案正确的数目
      this.choiceNum = this.paperDetail.choiceCount / this.paperDetail.choicePoint
      for (let i in this.choiceList) {
        let ob = JSON.parse(this.choiceList[i].answer)
        if (ob.length === 1) {
          choiceEx.push(ob[0])
        } else {
          choiceEx.push(ob)
        }
      }
      for (let i in choiceEx) {
        // 多选题
        if (typeof (choiceEx[i]) === 'object') {
          if (choiceEx[i].length === this.choiceAnswer[i].length) {
            for (let j in this.choiceAnswer[i]) {
              if (choiceEx[i].indexOf(this.choiceAnswer[i][j]) === -1) {
                this.choiceNum = this.choiceNum - 1
              }
            }
          } else {
            this.choiceNum = this.choiceNum - 1
          }
        } else {
          // 单选
          if (choiceEx[i] !== this.choiceAnswer[i]) {
            this.choiceNum = this.choiceNum - 1
          }
        }
      }
      // 计算判断题答案正确的数目
      this.judgeNum = this.paperDetail.judgeCount / this.paperDetail.judgePoint
      for (let i in this.judgeList) {
        judgeEx.push(this.judgeList[i].answer * 1)
      }
      for (let i in judgeEx) {
        if (judgeEx[i] !== this.judgeAnswer[i]) {
          this.judgeNum = this.judgeNum - 1
        }
      }
      // 选择题所得分数
      this.choiceSum = this.choiceNum * this.paperDetail.choicePoint
      // 判断题所得分数
      this.judgeSum = this.judgeNum * this.paperDetail.judgePoint
      // 考试总分数
      this.sumPoint = this.choiceSum + this.judgeSum
    },
    // 保存分数
    savePoint () {
      let data = {
        id: this.examDetail.id,
        status: 2,
        countPoint: this.sumPoint
      }
      this.$confirm('确定保存该考生成绩?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/manage/saveExamPoint', data).then(res => {
          if (res.body.msg === 'success') {
            this.$message.success('保存该考生成绩成功！')
            this.$toPage('/scoreManage')
          } else {
            console.log('未知错误！保存考生成绩失败！')
          }
        })
      }).catch(() => {
        console.log('取消保存成绩！')
      })
    }
  },
  mounted () {
    let id = this.$route.query.id
    this.getStuAnswer(id)
  }
}
</script>
<style lang="scss" scoped>
.score-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.score-info-title{
  text-align: left;
  width:100%;
  margin-bottom:10px;
}
.exam-basic-info{
  // background:skyblue;
  text-align: left;
  font-size:14px;
  color:#636262;
  margin:12px 0;
  padding-left:20px;
}
.exam-topic-all{
  min-height:500px;
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
  padding:0 20px;
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
