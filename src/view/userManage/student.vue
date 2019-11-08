<template>
  <div class="student-manage">
    <!-- <el-button type="primary">路由</el-button> -->
    <div class="line-title student-info-title">学生用户管理</div>
    <!-- 查询 -->
    <div class="student-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.stuId" label="学号" maxlength="30" placeholder="请输入学号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.name" label="姓名" maxlength="30" placeholder="请输入姓名" clearable></wj-input>
        <wj-select class="mgl20" v-model="form.major" label="专业" :options="majorOption"></wj-select>
        <wj-select class="mgl20" v-model="form.grade" label="年级" :options="gradeOption"></wj-select>
        <wj-select class="mgl20" v-model="form.class" label="班级" :options="classOption"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium" @click="getStudent">查询</el-button>
        <el-button type="primary" size="medium" @click="openAdd">添加</el-button>
      </div>
    </div>
    <!-- 数据表格 -->
    <wj-table :tableData="stuDataList" @change="pageAction">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
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
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scoped">
          <el-button size="mini" type="primary" @click="openSet(scoped.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delStudent(scoped.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </wj-table>
    <!-- 新增Dialog -->
    <el-drawer
    title="添加学生用户"
    :visible="controlAdd"
    direction="rtl"
    :before-close="closeAdd"
    size="25%">
    <!-- <wj-dialog v-show="controlAdd" @closeDislog="closeAdd" title="添加学生用户" width="500"> -->
      <el-form ref="form" :model="form" label-width="120px" label-position="right">
        <el-form-item label="学生学号" style="text-align:left">
          <el-input v-model="addForm.stuId" placeholder="请输入学生学号" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" style="text-align:left">
          <el-input v-model="addForm.password" placeholder="请输入登录密码" type="password" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="text-align:left">
          <el-input v-model="addForm.name" placeholder="请输入学生姓名" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="text-align:left">
          <el-radio-group v-model="addForm.sex">
            <el-radio v-model="addForm.sex" label="1">男</el-radio>
            <el-radio v-model="addForm.sex" label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在专业" style="text-align:left">
          <el-select v-model="addForm.major" placeholder="请选择所在专业" style="width:85%">
            <el-option label="信息资源管理" value="1"></el-option>
            <el-option label="健康管理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在年级" style="text-align:left">
          <el-select v-model="addForm.grade" placeholder="请选择所在年级" style="width:85%">
            <el-option label="大一" value="1"></el-option>
            <el-option label="大二" value="2"></el-option>
            <el-option label="大三" value="3"></el-option>
            <el-option label="大四" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在班级" style="text-align:left">
          <el-select v-model="addForm.class" placeholder="请选择所在班级" style="width:85%">
            <el-option label="一班" value="1"></el-option>
            <el-option label="二班" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:left">
          <div style="width:85%">
            <el-button type="primary" @click="addStudent">立即添加</el-button>
            <el-button @click="closeAdd">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    <!-- </wj-dialog> -->
    </el-drawer>
    <!-- 编辑Dialog -->
    <el-drawer
    title="编辑学生用户"
    :visible="controlSet"
    direction="rtl"
    :before-close="closeSet"
    size="25%">
    <!-- <wj-dialog v-show="controlSet" @closeDislog="closeSet" title="编辑学生用户" width="500"> -->
      <el-form ref="form" :model="form" label-width="120px" label-position="right">
        <el-form-item label="学生学号" style="text-align:left">
          <el-input v-model="setForm.stuId" placeholder="请输入学生学号" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" style="text-align:left">
          <el-input v-model="setForm.password" placeholder="请输入登录密码" type="password" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="text-align:left">
          <el-input v-model="setForm.name" placeholder="请输入学生姓名" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="text-align:left">
          <el-radio-group v-model="setForm.sex">
            <el-radio v-model="setForm.sex" label="1">男</el-radio>
            <el-radio v-model="setForm.sex" label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在专业" style="text-align:left">
          <el-select v-model="setForm.major" placeholder="请选择所在专业" style="width:85%">
            <el-option label="信息资源管理" value="1"></el-option>
            <el-option label="健康管理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在年级" style="text-align:left">
          <el-select v-model="setForm.grade" placeholder="请选择所在年级" style="width:85%">
            <el-option label="大一" value="1"></el-option>
            <el-option label="大二" value="2"></el-option>
            <el-option label="大三" value="3"></el-option>
            <el-option label="大四" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在班级" style="text-align:left">
          <el-select v-model="setForm.class" placeholder="请选择所在班级" style="width:85%">
            <el-option label="一班" value="1"></el-option>
            <el-option label="二班" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:left">
          <div style="width:85%">
            <el-button type="primary" @click="setStudent">立即修改</el-button>
            <el-button @click="closeSet">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    <!-- </wj-dialog> -->
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {
      // 查询参数
      form: {
        stuId: '',
        name: '',
        major: '',
        grade: '',
        class: ''
      },
      // 接口获取学生列表数据
      stuDataList: {
        isloading: false,
        page: 1,
        size: 10,
        total: 50,
        list: []
      },
      // 存储所有学生数据以便于显示以及分页
      stuAllData: [],
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
      /**
       * 添加学生窗口
       */
      // 控制新增窗口显隐
      controlAdd: false,
      // 添加所传参数
      addForm: {
        stuId: '',
        password: '',
        sex: '1',
        name: '',
        major: '',
        grade: '',
        class: '',
        createTime: '2019-10-24 00:00:00'
      },
      /**
       * 编辑学生窗口
       */
      // 控制编辑窗口显隐
      controlSet: false,
      // 编辑所传参数
      setForm: {}
    }
  },
  methods: {
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
    // 获取学生信息数据
    getStudent () {
      this.stuDataList.isloading = true
      let data = this.form
      // console.log(this.form)
      this.$http.post('/api/manage/student', data).then(res => {
        this.stuDataList.isloading = false
        this.stuAllData = res.body.data
        this.stuDataList.total = res.body.data.length
        // 处理数据集
        this.stuDataList.list = this.$utils.getTableData(this.stuAllData, this.stuDataList.page, this.stuDataList.size)
      })
    },
    // 列表分页
    pageAction (page) {
      this.stuDataList.page = page
      this.stuDataList.list = this.$utils.getTableData(this.stuAllData, this.stuDataList.page, this.stuDataList.size)
    },
    // 开启新增窗口
    openAdd () {
      this.controlAdd = true
    },
    // 关闭新增窗口
    closeAdd () {
      this.controlAdd = false
      this.addForm = {
        stuId: '',
        password: '',
        sex: '1',
        name: '',
        major: '',
        grade: '',
        class: '',
        createTime: ''
      }
    },
    // 添加学生用户
    addStudent () {
      let data = this.addForm
      data.createTime = this.$utils.getFormatDate()
      this.$http.post('/api/manage/addStudent', data).then(res => {
        if (res.body.msg === 'success') {
          this.$message.success('恭喜您！已成功添加学生用户')
          this.getStudent()
          this.closeAdd()
        } else {
          this.$message.error('未知错误！添加用户失败')
        }
      })
      // console.log(this.addForm)
    },
    // 开启编辑窗口
    openSet (data) {
      this.setForm = {
        id: data.id,
        stuId: data.stuId,
        password: data.password,
        name: data.name,
        sex: data.sex,
        major: data.major,
        grade: data.grade,
        class: data.class
      }
      this.controlSet = true
      // console.log(this.setForm)
    },
    closeSet () {
      this.controlSet = false
    },
    // 编辑学生用户
    setStudent () {
      let data = this.setForm
      this.$http.post('/api/manage/handleStudent', data).then(res => {
        if (res.body.msg === 'success') {
          this.$message.success('恭喜您！已成功修改用户信息')
          this.getStudent()
          this.closeSet()
        } else {
          this.$message.error('未知错误！修改用户信息失败')
        }
      })
    },
    // 删除学生用户
    delStudent (id) {
      let data = {
        id: id
      }
      this.$confirm('确定删除该学生用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/manage/removeStudent', data).then(res => {
          if (res.body.msg === 'success') {
            this.$message.success('恭喜您！已成功删除该学生用户')
            this.getStudent()
          } else {
            this.$message.error('未知错误！删除学生用户失败')
          }
        })
      }).catch(() => {
        console.log('已取消删除')
      })
    }
  },
  mounted () {
    this.getStudent()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.student-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.student-info-title{
  text-align: left;
  width:100%;
}
// 查询
.student-info-search {
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
// 动画过渡
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-enter {
  // transform: translateY(10px);
  opacity: 0;
}
</style>
<style lang="scss">
.el-button--mini, .el-button--mini.is-round{
  padding: 7px 12px;
}
</style>
