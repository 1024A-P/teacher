<template>
  <div class="left-header">
    <el-menu :default-active="activeIndex" @select="handleSelect" text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <!-- <i class="el-icon-user"></i> -->
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <!-- <i class="el-icon-s-custom"></i> -->
            <span slot="title">教师管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>题库管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <span slot="title">选择题管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="2-2">
            <span slot="title">填空题管理</span>
          </el-menu-item> -->
          <el-menu-item index="2-3">
            <span slot="title">判断题管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="2-4">
            <span slot="title">计算题管理</span>
          </el-menu-item>
          <el-menu-item index="2-5">
            <span slot="title">论述题管理</span>
          </el-menu-item>
          <el-menu-item index="2-6">
            <span slot="title">其它</span>
          </el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-collection"></i>
        <span slot="title">试卷管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-video-play"></i>
        <span slot="title">考试管理</span>
      </el-menu-item>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>成绩管理 </span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <!-- <i class="el-icon-user"></i> -->
            <span slot="title">试卷评分</span>
          </el-menu-item>
          <el-menu-item index="5-2">
            <!-- <i class="el-icon-s-custom"></i> -->
            <span slot="title">成绩统计</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="6">
        <i class="el-icon-s-home"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'LeftHeader',
  data () {
    return {
      activeIndex: ''
    }
  },
  methods: {
    // 菜单点击跳转
    handleSelect (key) {
      switch (key) {
        // 学生管理
        case '1-1':
          this.$toPage('/')
          break
        // 教师管理
        case '1-2':
          this.$toPage('/teacher')
          break
        // 题库管理
        case '2-1':
          this.$toPage('/choiceManage')
          break
        case '2-2':
          this.$toPage('/fillManage')
          break
        case '2-3':
          this.$toPage('/judgeManage')
          break
        case '2-4':
          this.$toPage('/calculationManage')
          break
        case '2-5':
          this.$toPage('/discussManage')
          break
        case '2-6':
          this.$toPage('/otherManage')
          break
        // 试卷管理
        case '3':
          this.$toPage('/paperManage')
          break
        // 考试管理
        case '4':
          this.$toPage('/examManage')
          break
        // 成绩管理
        case '5-1':
          this.$toPage('/scoreManage')
          break
        // 成绩统计
        case '5-2':
          this.$toPage('/scoreCount')
          break
        // 个人中心
        case '6':
          this.$toPage('/infoManage')
          break
        default:
          break
      }
    },
    // 根据路由名字默认显示active样式
    getRouteName () {
      let name = this.$route.name
      switch (name) {
        case 'Student':
          this.activeIndex = '1-1'
          break
        case 'Teacher':
          this.activeIndex = '1-2'
          break
        case 'ChoiceTopic':
          this.activeIndex = '2-1'
          break
        case 'JudgeTopic':
          this.activeIndex = '2-3'
          break
        case 'TestPaper':
          this.activeIndex = '3'
          break
        case 'ExamManage':
          this.activeIndex = '4'
          break
        case 'ScoreManage':
          this.activeIndex = '5-1'
          break
        case 'ScoreCount':
          this.activeIndex = '5-2'
          break
        case 'UserInfo':
          this.activeIndex = '6'
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.getRouteName()
    this.$root.eventHandle.$on('JUMP_USER_INFO', () => {
      this.activeIndex = '6'
    })
  },
  beforeDestroy () {
    this.$root.eventHandle.$off('JUMP_USER_INFO')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.left-header{
  width:200px;
  height:100%;
  // background:rgb(23,42,57);
  background-color:rgba(88,98,122,1);
  float:left;
  color:white;
}
.fr{
  float:right;
  font-size:14px;
  margin:21px 0;
}
</style>
<style lang="scss">
.el-menu{
  // background-color:rgb(23,42,57);
  background-color:#58627a!important;
  width:200px;
  border:none;
}
.el-menu-item{
  text-align: left;
  border-left:3px solid #58627a;
  color:white!important;
}
.el-menu-item:focus, .el-menu-item:hover{
  // background-color:#0c8ed9;
  background-color:rgb(70,78,98)!important;
  color:white!important;
  border-left:3px solid rgb(70,78,98);
}
.el-menu-item.is-active{
  // background-color:#0c8ed9;
  background-color:rgb(70,78,98)!important;
  color:white!important;
  border-left:3px solid #33a1fd;
}
.el-menu-item i{
  color:white!important;
}
// 下拉二级菜单
.el-submenu {
  text-align: left;
}
.el-submenu__title{
  border-left:3px solid #58627a;
}
.el-submenu__title i{
  color:white!important;
}
.el-submenu__title:hover, .el-submenu__title:focus{
  background-color:rgb(70,78,98)!important;
  color:white!important;
  border-left:3px solid rgb(70,78,98);
}
.el-submenu .el-menu-item{
  border-left:3px solid #383f4e;
  text-align:center;
}
.el-submenu .el-menu-item:hover, .el-submenu .el-menu-item:focus{
  border-left:3px solid rgb(45,50,62);
  background-color:rgb(45,50,62)!important;
}
.el-submenu .el-menu-item.is-active{
  border-left:3px solid #33a1fd;
  background-color:rgba(0,0,0,0.2)!important;
}
.el-menu--inline{
  background-color:#383f4e!important;
}
.el-menu-item-group__title{
  padding:0!important;
}
</style>
