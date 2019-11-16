<template>
  <div class="basic-info-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="试卷编号">
        <el-input v-model="form.paperId" placeholder="请输入试卷编号"></el-input>
      </el-form-item>
      <el-form-item label="试卷名称">
        <el-input v-model="form.paperName" placeholder="请输入试卷名称"></el-input>
      </el-form-item>
      <el-form-item label="试卷总分" style="text-align:left">
        100 分
      </el-form-item>
      <el-form-item label="考试时间" style="text-align:left">
        <el-date-picker
          v-model="dateTime"
          type="datetime"
          placeholder="请选择考试日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="考试时长" style="text-align:left">
        <el-input v-model="form.wastedTime" style="width:80px" placeholder="< 200"></el-input>&ensp;分钟
      </el-form-item>
      <el-form-item label="考试学生">
        <div class="exam-student-list">
          <div class="student-tag-list scrollStyle">
            <el-tag
              style="margin:10px 0 0 10px"
              v-for="tag in stuTagList"
              :key="tag.id"
              @close="delStudent(tag)"
              closable>
              {{tag.name}}
            </el-tag>
          </div>
          <div class="btn-bottom">
            <el-button type="primary" class="fl" style="margin:11px 10px" size="mini" @click="openDialog">添加</el-button>
            <span class="fr total-color">共有 {{stuIdAll.length}} 个学生</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" icon="el-icon-right" @click="nextStep">下一步</el-button>
      </el-form-item>
    </el-form>
    <!-- 学生对话框 -->
    <el-dialog
      title="添加学生"
      :visible.sync="dialogShow"
      width="1240px"
      :before-close="closeDialog">
      <!-- 数据表格 -->
      <!-- 查询 -->
      <div class="student-info-search">
        <!-- 查询输入参数 -->
        <div class="info-input">
          <wj-input v-model="stuForm.stuId" label="学号" maxlength="30" placeholder="请输入学号" clearable></wj-input>
          <wj-input class="mgl20" v-model="stuForm.name" label="姓名" maxlength="30" placeholder="请输入姓名" clearable></wj-input>
          <wj-select class="mgl20" v-model="stuForm.major" label="专业" :options="majorOption"></wj-select>
          <wj-select class="mgl20" v-model="stuForm.grade" label="年级" :options="gradeOption"></wj-select>
          <wj-select class="mgl20" v-model="stuForm.class" label="班级" :options="classOption"></wj-select>
        </div>
        <!-- 右侧按钮 -->
        <div class="search-btn fr">
          <el-button type="primary" size="medium" @click="getStudent">查询</el-button>
        </div>
      </div>
      <wj-table :tableData="stuDataList" @selectionChange="getStuList" maxHeight="450px" :showPage="false">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scoped">
            {{scoped.row.sex==='1'?'男':scoped.row.sex==='2'?'女':''}}
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="scoped">
            {{scoped.row.major==='1'?'信息资源管理':scoped.row.major==='2'?'健康管理':''}}
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="scoped">
            {{handleGrade(scoped.row.grade)}}
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="scoped">
            {{scoped.row.class==1?'一班':scoped.row.class==2?'二班':''}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="200"></el-table-column>
      </wj-table>
      <div style="text-align:center">
        <el-button type="primary" plain @click="closeDialog">取消</el-button>
        &nbsp;
        <el-button type="primary" @click="certainChoice">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
      form: {
        paperId: '',
        paperName: '',
        totalPoints: 100,
        examTime: '',
        wastedTime: '',
        stuId: []
      },
      dateTime: '',
      // 学生弹出框显隐
      dialogShow: false,
      // 接口获取学生列表数据
      stuDataList: {
        isloading: false,
        page: 1,
        size: 8,
        total: 50,
        list: []
      },
      // 存储所有学生数据以便于显示以及分页
      stuAllData: [],
      stuForm: {
        stuId: '',
        name: '',
        major: '',
        grade: '',
        class: ''
      },
      // 专业
      majorOption: [
        {label: '全部', value: ''},
        {label: '信息资源管理', value: 1},
        {label: '健康管理', value: 2}
      ],
      // 年级
      gradeOption: [
        {label: '全部', value: ''},
        {label: '大一', value: 1},
        {label: '大二', value: 2},
        {label: '大三', value: 3},
        {label: '大四', value: 4}
      ],
      // 班级
      classOption: [
        {label: '全部', value: ''},
        {label: '一班', value: 1},
        {label: '二班', value: 2}
      ],
      // 用于显示tag标签的list
      exTagList: [],
      stuTagList: [],
      // 存储所有学生id
      exIdAll: [],
      stuIdAll: []
    }
  },
  methods: {
    // 下一步
    nextStep () {
      if (this.form.paperId === '') {
        this.$message.error('请填写试卷编号')
        return ''
      }
      if (this.form.paperName === '') {
        this.$message.error('请填写试卷名称')
        return ''
      }
      if (this.dateTime === '' || this.dateTime === null) {
        this.$message.error('请选择考试时间')
        return ''
      }
      if (this.stuIdAll.length === 0) {
        this.$message.error('请添加考试学生！')
        return ''
      }
      this.form.examTime = this.$utils.formatStringtoDate(this.dateTime)
      this.form.stuId = this.stuIdAll
      this.$emit('firstFinish', this.form, this.stuTagList)
      console.log(this.form)
    },
    // 显示弹出框
    openDialog () {
      this.dialogShow = true
    },
    // 关闭弹窗框
    closeDialog () {
      this.dialogShow = false
    },
    // 获取学生信息数据
    getStudent () {
      this.stuDataList.isloading = true
      this.stuDataList.page = 1
      let data = this.stuForm
      // console.log(this.form)
      this.$http.post('/api/manage/student', data).then(res => {
        this.stuDataList.isloading = false
        this.stuAllData = res.body.data
        this.stuDataList.total = res.body.data.length
        // 处理数据集
        this.stuDataList.list = this.stuAllData
      })
    },
    // 处理年级
    handleGrade (lv) {
      let result = ''
      switch (lv) {
        case '1':
          result = '大一'
          break
        case '2':
          result = '大二'
          break
        case '3':
          result = '大三'
          break
        case '4':
          result = '大四'
          break
        default:
          break
      }
      return result
    },
    // 勾选学生
    getStuList (data) {
      let tagList = []
      let idAll = []
      for (let i in data) {
        let stu = {}
        stu.id = data[i].id
        stu.name = data[i].name
        tagList.push(stu)
        idAll.push(data[i].id)
      }
      this.exTagList = tagList
      this.exIdAll = idAll
    },
    // 确定选中学生
    certainChoice () {
      this.stuTagList = JSON.parse(JSON.stringify(this.exTagList))
      this.stuIdAll = JSON.parse(JSON.stringify(this.exIdAll))
      this.closeDialog()
    },
    // 删除学生
    delStudent (item) {
      this.stuTagList.splice(this.stuTagList.indexOf(item), 1)
      this.stuIdAll.splice(this.stuIdAll.indexOf(item.id), 1)
    }
  },
  mounted () {
    this.getStudent()
  }
}
</script>
<style lang="scss" scoped>
//滚动条样式
.scrollStyle{
  overflow-y:auto;
  overflow-x:hidden;
}
.scrollStyle::-webkit-scrollbar{
  width:6px;
}
.scrollStyle::-webkit-scrollbar-thumb{
  border-radius:12px;
  background:rgb(177, 175, 175);
}
.scrollStyle::-webkit-scrollbar-track{
  border-radius:12px;
  background:rgb(230, 226, 226);
}
.basic-info-form{
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
  height:250px;
  border-radius: 4px 4px 0 0;
  text-align: left;
  // border-bottom:1px solid #DCDFE6;
}
.btn-bottom{
  width:100%;
  height:50px;
  background:#F5F7FA;
  border-radius: 0 0 4px 4px;
  overflow:hidden;
  line-height: 50px;
}
.total-color{
  color:rgb(127, 128, 131);
  font-size:12px;
  display:block;
  margin-right:10px;
}
// 查询
.student-info-search {
  width:100%;
  // padding:30px 0;
  overflow:hidden;
  // border-top:1px solid #e6e6e6;
  // border-bottom:1px solid #e6e6e6;
  .info-input{
    overflow:hidden;
    float:left;
  }
}
</style>
