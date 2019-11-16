<template>
  <div class="add-finished-body">
    <el-form label-width="100px">
      <el-form-item label="试卷编号：">
        {{form.paperId}}
      </el-form-item>
      <el-form-item label="试卷名称：">
        {{form.paperName}}
      </el-form-item>
      <el-form-item label="试卷总分：">
        {{form.totalPoints}}分
      </el-form-item>
      <el-form-item label="考试时间：">
        {{form.examTime}}
      </el-form-item>
      <el-form-item label="考试时长：">
        {{form.wastedTime}}分钟
      </el-form-item>
      <el-form-item label="考试学生：">
        <div class="exam-student-list">
          <div class="student-tag-list scrollStyle">
            <el-tag
              style="margin:10px 0 0 10px"
              v-for="tag in tagList.stuTag"
              :key="tag.id">
              {{tag.name}}
            </el-tag>
          </div>
          <div class="btn-bottom">
            <span class="fr total-color">共有 {{handleData(form.stuId)}} 个学生</span>
          </div>
        </div>
      </el-form-item>
    <div class="topic-title">一、选择题</div>
      <el-form-item label="题目总分：">
        {{form.choiceCount}}分
      </el-form-item>
      <el-form-item label="题目概况：">
        {{form.choicePoint}}分 / 道，共 {{form.choiceCount/form.choicePoint}} 道
      </el-form-item>
      <el-form-item label="题目列表：">
        <div class="exam-student-list">
          <div class="student-tag-list scrollStyle">
            <el-tag
              style="margin:10px 0 0 10px"
              v-for="tag in tagList.choTag"
              :key="tag.id">
              {{tag.txtId}}
            </el-tag>
          </div>
          <div class="btn-bottom">
            <span class="fr total-color">共有 {{handleData(form.choiceId)}} 道题目</span>
          </div>
        </div>
      </el-form-item>
    <div class="topic-title">二、判断题</div>
      <el-form-item label="题目总分：">
        {{form.judgeCount}}分
      </el-form-item>
      <el-form-item label="题目概况：">
        {{form.judgePoint}}分 / 道，共 {{form.judgeCount/form.judgePoint}} 道
      </el-form-item>
      <el-form-item label="题目列表：">
        <div class="exam-student-list">
          <div class="student-tag-list scrollStyle">
            <el-tag
              style="margin:10px 0 0 10px"
              v-for="tag in tagList.judTag"
              :key="tag.id">
              {{tag.txtId}}
            </el-tag>
          </div>
          <div class="btn-bottom">
            <span class="fr total-color">共有 {{handleData(form.judgeId)}} 道题目</span>
          </div>
        </div>
      </el-form-item>
      <div style="height:20px"></div>
      <!-- 按钮 -->
      <el-form-item style="text-align:right">
        <el-button type="primary" plain @click="prewStep">返回上一步</el-button>
        <el-button type="primary" @click="finishAdd">确定添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'AddFinished',
  data () {
    return {

    }
  },
  props: {
    tagList: Object,
    form: Object
  },
  methods: {
    // 处理数据报错
    handleData (data) {
      if (data) {
        return data.length
      } else {
        return 0
      }
    },
    // 返回上一步
    prewStep () {
      this.$emit('fourthStep')
    },
    // 确定添加
    finishAdd () {
      let ex = {
        otherId: [],
        otherName: '',
        otherPoint: 0,
        otherCount: 0,
        status: 1,
        maker: '',
        makerId: 0,
        createTime: ''
      }
      ex.createTime = this.$utils.getFormatDate()
      if (sessionStorage.managerInfo) {
        let ob = JSON.parse(sessionStorage.managerInfo)
        ex.makerId = ob.id
        ex.maker = ob.name
      }
      let data = Object.assign(this.form, ex)
      // data.stuId = JSON.stringify(data.stuId)
      // data.choiceId = JSON.stringify(data.choiceId)
      // data.judgeId = JSON.stringify(data.judgeId)
      // data.otherId = JSON.stringify(data.otherId)
      data.choiceCount = data.choiceCount * 1
      data.choicePoint = data.choicePoint * 1
      data.judgeCount = data.judgeCount * 1
      data.judgePoint = data.judgePoint * 1
      data.wastedTime = data.wastedTime * 1
      this.$http.post('/api/manage/addPaper', data).then(res => {
        if (res.body.msg === 'success') {
          this.$confirm('恭喜您！添加考试成功', '提示', {
            confirmButtonText: '返回列表',
            cancelButtonText: '预览',
            type: 'success'
          }).then(() => {
            this.$toPage('/paperManage')
          }).catch(() => {
            // this.$toPage('/choiceManage')
            console.log('预览')
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-finished-body{
  // background: skyblue;
  width:460px;
  // height:500px;
  margin: 0 auto;
  padding-right:100px;
  text-align: left;
}
.exam-student-list{
  width:100%;
  // background:skyblue;
  border-radius: 4px;
  border:1px solid #DCDFE6;
  overflow:hidden;
}
.student-tag-list{
  width:100%;
  // background:orange;
  height:auto;
  border-radius: 4px 4px 0 0;
  text-align: left;
  max-height:250px;
  // border-bottom:1px solid #DCDFE6;
}
.btn-bottom{
  width:100%;
  height:40px;
  background:#F5F7FA;
  border-radius: 0 0 4px 4px;
  overflow:hidden;
  line-height: 40px;
  margin-top:10px;
}
.total-color{
  color:rgb(127, 128, 131);
  font-size:12px;
  display:block;
  margin-right:10px;
}
.topic-title{
  width:100px;
  text-align:right;
  padding:0 12px 0 0;
  box-sizing: border-box;
  color:#606266;
  font-size:15px;
  font-weight:bold;
  margin-bottom:10px;
}
</style>
