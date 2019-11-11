<template>
  <div class="add-choice-manage">
    <div class="choice-info-title">
      <span @click="$toPage('/judgeManage')">
        &lt;&lt;&nbsp;返回上一页
      </span>
    </div>
    <div class="add-choice-topic">
      <div class="single-choice">
        <div class="line-title choice-main-title">
          添加判断题
        </div>
        <div class="single-part">
          <div class="single-title">题 号<sup style="color:red">*</sup></div>
          <div class="single-content">
            <wj-input v-model="singleForm.txtId" style="width:200px;" placeholder="请输入题号"></wj-input>
          </div>
          &ensp;
          <span style="color:#c3c3c3;font-size:12px">以便于题库准确搜索</span>
        </div>
        <div class="single-part">
          <div class="single-title">难 度<sup style="color:red">*</sup></div>
          <div class="single-content">
            <el-rate v-model="singleForm.hardType"></el-rate>
          </div>
        </div>
        <div class="single-part">
          <div class="single-title v-top">题 目<sup style="color:red">*</sup></div>
          <div class="single-content">
            <!-- <wj-input v-model="singleForm.txtName" style="width:400px;"></wj-input> -->
            <el-input type="textarea" v-model="singleForm.txtName" style="width:420px" rows="3" resize="none" placeholder="请输入判断题内容"></el-input>
          </div>
        </div>
        <div class="single-part">
          <div :class="{'single-title':true,'v-top':v_top}">选 项<sup style="color:red">*</sup></div>
          <div class="single-content w300">
            <div class="option-mb">
              <el-radio v-model="exAnswer" :label="1">正确</el-radio>
              <el-radio v-model="exAnswer" :label="2">错误</el-radio>
              <!-- <div class="el-icon-close delete-option" @click="delOption(index)"></div> -->
            </div>
            <div class="add-option-list" v-show="controlSingle">
              <wj-input v-model="addSingle" style="width:300px"></wj-input>
            </div>
            <!-- <div class="add-option">
              <el-button type="primary" size="mini" v-show="!controlSingle" @click="showSingleInput">添加</el-button>
              <el-button type="primary" size="mini" v-show="controlSingle" style="margin-left:0" @click="addSingleOption">确定</el-button>
              <el-button type="primary" size="mini" v-show="controlSingle" plain @click="cancelAddOption">取消</el-button>
            </div> -->
          </div>
        </div>
        <div class="single-part">
          <div class="single-title">答 案<sup style="color:red">*</sup></div>
          <div class="single-content">
            <!-- <span style="color:#999999;" v-show="exAnswer==='' && singleForm.options.length<3">请完善题目内容</span> -->
            <span style="color:#999999;" v-show="exAnswer===''">请勾选答案</span>
            <span style="color:#409EFF;font-weight:bold" v-show="exAnswer!==''">
              {{exAnswer===1?'正确':exAnswer===2?'错误':''}}
            </span>
          </div>
        </div>
        <div class="single-part" style="margin-top:40px">
          <el-button type="primary" @click="certainAdd">确定添加</el-button>
          <!-- <el-button @click="$toPage('/choiceManage')">返回列表</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddJudge',
  data () {
    return {
      singleForm: {
        txtId: '',
        hardType: 1,
        txtName: '',
        answer: '',
        usedExam: [],
        maker: '',
        makerId: '',
        createTime: ''
      },
      // 存储答案
      exAnswer: '',
      // option输入框model的值
      addSingle: '',
      // 控制添加选项的输入框显隐
      controlSingle: false,
      // 控制 选项 二字置顶
      v_top: false
    }
  },
  methods: {
    // 确定添加选择题
    certainAdd () {
      if (this.singleForm.txtId === '') {
        this.$message.warning('请补充题号')
        return ''
      }
      if (this.singleForm.hardType === '') {
        this.$message.warning('请选择难度')
        return ''
      }
      if (this.singleForm.txtName === '') {
        this.$message.warning('请补充题目')
        return ''
      }
      if (this.exAnswer === '') {
        this.$message.warning('请勾选答案')
        return ''
      }
      if (sessionStorage.managerInfo) {
        let ob = JSON.parse(sessionStorage.managerInfo)
        this.singleForm.makerId = ob.id
        this.singleForm.maker = ob.name
      }
      this.singleForm.answer = this.exAnswer
      this.singleForm.createTime = this.$utils.getFormatDate()
      let data = JSON.parse(JSON.stringify(this.singleForm))
      data.usedExam = JSON.stringify(data.usedExam)
      // console.log(data)
      this.$http.post('/api/manage/addJudge', data).then(res => {
        if (res.body.msg === 'success') {
          this.openMessage()
        } else {
          this.$message.success('未知错误！添加选择题失败')
        }
      })
    },
    // 打开消息弹框以便于执行下一步操作
    openMessage () {
      this.$confirm('添加成功, 是否继续添加题目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.exAnswer = ''
        this.singleForm.txtId = ''
        this.singleForm.hardType = 1
        this.singleForm.txtName = ''
        this.singleForm.answer = ''
      }).catch(() => {
        this.$toPage('/judgeManage')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-choice-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.choice-info-title{
  text-align: left;
  // width:100%;
  color:#888888;
  line-height:24px;
  cursor:pointer;
  &:hover{
    color:#409EFF;
    // text-decoration: underline;
  }
}
.add-choice-topic{
  // background:orange;
  margin-top:20px;
}
// 多选
.indefinite-choice{
  width:100%;
  height:400px;
  text-align:left;
}
.single-choice{
  // min-width:400px;
  // height:400px;
  // background:skyblue;
  text-align: left;
  overflow:hidden;
  padding:0 20px;
}
.choice-main-title{
  // background:skyblue;
  font-weight:normal;
  margin:20px 0 10px 0;
}
.single-part{
  // background:brown;
  margin-top:36px;
  font-size:14px;
  color:#303133;
}
.single-title{
  display:inline-block;
  margin-right:10px;
}
.single-content{
  display:inline-block;
}
.add-option-list{
  // background: orange;
  margin-bottom:10px;
}
.add-option{
  // display: inline-block;
  color:#409eff;
  font-weight:bold;
}
.v-top{
  vertical-align: top;
}
.option-mb{
  margin-bottom:20px;
  cursor:pointer;
}
.w300{
  min-width:230px;
}
.certain-btn{
  color:#409eff;
  cursor:pointer;
  &:hover{
    font-weight:bold;
  }
}
</style>
<style lang="scss">
.el-textarea__inner{
  font-family: Arial!important;
}
</style>
