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
    <wj-table :tableData="testData" @change="getStudent">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scoped">
          {{scoped.row.sex==='1'?'男':scoped.row.sex==='2'?'女':''}}
        </template>
      </el-table-column>
      <el-table-column prop="major" label="专业" align="center"></el-table-column>
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
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scoped">
          <el-button size="mini" type="primary" @click="openSet">编辑</el-button>
          <el-button size="mini" type="danger" @click="delStudent">删除</el-button>
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
          <el-input v-model="addForm.password" placeholder="请输入登录密码" style="width:85%"></el-input>
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
          <el-input v-model="setForm.password" placeholder="请输入登录密码" style="width:85%"></el-input>
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
        major: 0,
        grade: 0,
        class: 0
      },
      // 专业
      majorOption: [
        {label: '全部', value: 0},
        {label: '信息资源管理', value: 1},
        {label: '健康管理', value: 2}
      ],
      // 年级
      gradeOption: [
        {label: '全部', value: 0},
        {label: '大一', value: 1},
        {label: '大二', value: 2},
        {label: '大三', value: 3},
        {label: '大四', value: 4}
      ],
      // 班级
      classOption: [
        {label: '全部', value: 0},
        {label: '一班', value: 1},
        {label: '二班', value: 2}
      ],
      testData: {
        isloading: false,
        page: 1,
        size: 10,
        total: 50,
        list: [
          {
            id: 1,
            stuId: '16161051',
            name: '张三',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 2,
            stuId: '16161021',
            name: '李四',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 3,
            stuId: '16161051',
            name: '张大傻',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 4,
            stuId: '16161051',
            name: '陈大叔',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 5,
            stuId: '16161051',
            name: '刘大婶',
            sex: '2',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 6,
            stuId: '16161051',
            name: '郭大儿',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 7,
            stuId: '16161051',
            name: '诸葛亮',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 8,
            stuId: '16161051',
            name: '司马懿',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 9,
            stuId: '16161051',
            name: '孙尚香',
            sex: '2',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 10,
            stuId: '16161051',
            name: '刘备',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          }
        ]
      },
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
        createTime: ''
      },
      /**
       * 编辑学生窗口
       */
      // 控制编辑窗口显隐
      controlSet: false,
      // 编辑所传参数
      setForm: {
        stuId: '',
        password: '',
        sex: '1',
        name: '',
        major: '',
        grade: '',
        class: ''
      }
    }
  },
  methods: {
    // 处理年级
    handleGrade (lv) {
      let result = ''
      switch (lv) {
        case 1:
          result = '大一'
          break
        case 2:
          result = '大二'
          break
        case 3:
          result = '大三'
          break
        case 4:
          result = '大四'
          break
        default:
          break
      }
      return result
    },
    // 获取学生信息数据
    getStudent (page) {
      this.testData.page = page
      console.log(this.form)
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
      console.log(this.addForm)
    },
    // 开启编辑窗口
    openSet () {
      this.controlSet = true
    },
    closeSet () {
      this.controlSet = false
      this.setForm = {
        stuId: '',
        password: '',
        sex: '1',
        name: '',
        major: '',
        grade: '',
        class: ''
      }
    },
    // 编辑学生用户
    setStudent () {
      console.log(this.setForm)
    },
    // 删除学生用户
    delStudent () {
      this.$confirm('确定删除该学生用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!')
      }).catch(() => {
        this.$message.warning('已取消删除!')
      })
    }
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
