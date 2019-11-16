<template>
  <div class="single-choice">
    <div class="line-title choice-main-title">
      添加单项选择题
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
        <el-input type="textarea" v-model="singleForm.txtName" style="width:420px" rows="3" resize="none" placeholder="请输入单选题题目"></el-input>
      </div>
    </div>
    <div class="single-part">
      <div :class="{'single-title':true,'v-top':v_top}">选 项<sup style="color:red">*</sup></div>
      <div class="single-content w300">
        <div class="option-mb" v-for="(item, index) in singleForm.options" :key="index">
          <el-radio v-model="exAnswer" :label="index">{{$utils.turnEng(index)}}.&ensp;{{item}}</el-radio>
          <div class="el-icon-close delete-option" @click="delOption(index)"></div>
        </div>
        <div class="add-option-list" v-show="controlSingle">
          <wj-input v-model="addSingle" style="width:300px"></wj-input>
        </div>
        <div class="add-option">
          <el-button type="primary" size="mini" v-show="!controlSingle" @click="showSingleInput">添加</el-button>
          <el-button type="primary" size="mini" v-show="controlSingle" style="margin-left:0" @click="addSingleOption">确定</el-button>
          <el-button type="primary" size="mini" v-show="controlSingle" plain @click="cancelAddOption">取消</el-button>
        </div>
      </div>
    </div>
    <div class="single-part">
      <div class="single-title">答 案<sup style="color:red">*</sup></div>
      <div class="single-content">
        <span style="color:#999999;" v-show="exAnswer==='' && singleForm.options.length<3">请完善题目内容</span>
        <span style="color:#999999;" v-show="exAnswer==='' && singleForm.options.length>=3">请勾选答案</span>
        <span style="color:#409EFF;font-weight:bold" v-show="exAnswer!==''">{{$utils.turnEng(exAnswer)}}</span>
      </div>
    </div>
    <div class="single-part" style="margin-top:40px">
      <el-button type="primary" @click="certainAdd">确定添加</el-button>
      <!-- <el-button @click="$toPage('/choiceManage')">返回列表</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'SingleChoice',
  data () {
    return {
      singleForm: {
        txtId: '',
        type: 1,
        hardType: 1,
        txtName: '',
        options: [],
        answer: [],
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
    // 点击 添加 出现输入框
    showSingleInput () {
      this.controlSingle = true
      this.v_top = true
    },
    // 添加选项到单选option
    addSingleOption () {
      this.singleForm.options.push(this.addSingle)
      this.controlSingle = false
      this.v_top = true
      this.addSingle = ''
    },
    // 取消添加选项到单选option
    cancelAddOption () {
      this.addSingle = ''
      this.controlSingle = false
      if (this.singleForm.options.length === 0) {
        this.v_top = false
      } else {
        this.v_top = true
      }
    },
    // 删除选项
    delOption (index) {
      this.exAnswer = ''
      this.singleForm.options.splice(index, 1)
      if (this.singleForm.options.length === 0) {
        this.v_top = false
        this.exAnswer = ''
      } else if (this.singleForm.options.length < 3) {
        this.exAnswer = ''
        this.v_top = true
      } else {
        this.v_top = true
      }
    },
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
      if (this.singleForm.options.length < 3) {
        this.$message.warning('请补充至少三个选项')
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
      this.singleForm.answer.push(this.exAnswer)
      this.singleForm.createTime = this.$utils.getFormatDate()
      let data = JSON.parse(JSON.stringify(this.singleForm))
      data.options = JSON.stringify(data.options).replace(/"/g, "'")
      data.answer = JSON.stringify(data.answer)
      data.usedExam = JSON.stringify(data.usedExam)
      console.log(data)
      // this.$http.post('/api/manage/addSingleChoice', data).then(res => {
      //   console.log(res.body)
      //   if (res.body.msg === 'success') {
      //     this.openMessage()
      //   } else {
      //     this.$message.success('未知错误！添加选择题失败')
      //   }
      // })
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
        this.singleForm.answer = []
        this.singleForm.options = []
      }).catch(() => {
        this.$toPage('/choiceManage')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.single-choice{
  // min-width:400px;
  // height:400px;
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
  .delete-option{
    float:right;
    font-size:12px;
    height:17px;
    line-height:17px;
    &:hover{
      font-weight:bold;
      color:red;
    }
  }
  &:hover{
    background-color:rgb(245,245,245);
  }
  &:hover .delete-option{
    display:block;
  }
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
