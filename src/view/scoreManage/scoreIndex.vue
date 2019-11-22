<template>
  <div class="score-manage">
    <div class="line-title score-info-title">考试评分</div>
    <div class="score-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.stuName" label="姓名" maxlength="30" placeholder="请输入考生姓名" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.studentId" label="学号" maxlength="30" placeholder="请输入考生学号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.paperId" label="试卷号" maxlength="30" placeholder="请输入试卷号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.paperName" label="试卷名" maxlength="30" placeholder="请输入试卷名字" clearable></wj-input>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium" style="width:120px" @click="getAnswerList">查询</el-button>
        <!-- <el-button type="primary" size="medium">添加</el-button> -->
      </div>
    </div>
    <!-- 考生提交试卷 -->
    <wj-table :tableData="answerList" @change="pageAction">
      <el-table-column prop="studentId" label="学号" align="center"></el-table-column>
      <el-table-column prop="stuName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="paperId" label="试卷号" align="center"></el-table-column>
      <el-table-column prop="paperName" label="试卷名" align="center"></el-table-column>
      <el-table-column prop="maker" label="制定人" align="center"></el-table-column>
      <el-table-column label="耗时" align="center">
        <template slot-scope="scoped">
          {{scoped.row.wastedTime+'分钟'}}
        </template>
      </el-table-column>
      <el-table-column prop="finishDate" label="交卷时间" align="center" width="200"></el-table-column>
      <el-table-column label="考试分数" align="center">
        <template slot-scope="scoped">
          {{scoped.row.countPoint===null?'尚未评分':scoped.row.countPoint+' 分'}}
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center">
        <template slot-scope="scoped">
          <el-button
            type="primary"
            size="mini"
            v-if="scoped.row.status==='1'"
            @click="jumpSetScore(scoped.row.id)">
            评分
          </el-button>
          <div
            v-else
            v-html="handlePoints(scoped.row.countPoint)">
          </div>
        </template>
      </el-table-column>
    </wj-table>
  </div>
</template>
<script>
export default {
  name: 'ScoreIndex',
  data () {
    return {
      managerInfo: {},
      form: {
        makerId: 0,
        paperId: '',
        studentId: '',
        stuName: '',
        paperName: ''
      },
      // 答案列表数据
      answerList: {
        isloading: false,
        total: 0,
        size: 10,
        page: 1,
        list: []
      },
      // 所有答案数据
      answerAllList: []
    }
  },
  methods: {
    // 获取答案列表数据
    getAnswerList () {
      this.answerList.isloading = true
      this.form.makerId = this.managerInfo.id
      let data = this.form
      this.$http.post('/api/manage/getAnswerList', data).then(res => {
        if (res.body.msg === 'success') {
          this.answerList.isloading = false
          this.answerAllList = res.body.data
          this.answerList.total = res.body.data.length
          // 处理数据集
          this.answerList.list = this.$utils.getTableData(this.answerAllList, this.answerList.page, this.answerList.size)
        } else {
          this.answerList.isloading = false
          this.answerList.total = 0
          this.answerList.list = []
          this.answerAllList = []
        }
      })
    },
    // 列表分页
    pageAction (page) {
      this.answerList.page = page
      this.answerList.list = this.$utils.getTableData(this.answerAllList, this.answerList.page, this.answerList.size)
    },
    // 点击评分跳转
    jumpSetScore (id) {
      this.$toPage('/setScore', {
        id: id
      })
    },
    // 成绩统计
    handlePoints (points) {
      let result = ''
      if (points < 60) {
        result = '<span style="color:#F56C6C;font-weight:bold">不及格</span>'
      } else if (points >= 60 && points < 70) {
        result = '<span style="color:#E6A23C;font-weight:bold">及格</span>'
      } else if (points >= 70 && points < 90) {
        result = '<span style="color:#409EFF;font-weight:bold">良好</span>'
      } else if (points >= 90) {
        result = '<span style="color:#67C23A;font-weight:bold">优秀</span>'
      }
      return result
    }
  },
  mounted () {
    if (sessionStorage.managerInfo) {
      this.managerInfo = JSON.parse(sessionStorage.managerInfo)
    }
    this.getAnswerList()
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
}
// 查询
.score-info-search {
  width:100%;
  padding:30px 0;
  margin-top:30px;
  overflow:hidden;
  border-top:1px solid #e6e6e6;
  border-bottom:1px solid #e6e6e6;
  .info-input{
    overflow:hidden;
    float:left;
  }
}
</style>
