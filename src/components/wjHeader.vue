<template>
  <div class="index-header">
    <!-- 顶部左边以及logo -->
    <div class="header-top-left">
      <div class="index-logo">
        <!-- <img src="@A/images/teacher_logo.png"> -->
        健康学院考试教师系统
      </div>
    </div>
    <!-- 顶部右边个人头像 -->
    <div class="header-top-right">
      <i class="el-icon-user-solid user-icon"></i>
      &nbsp;
      <el-dropdown trigger="hover" placement="bottom" @command="userControl" style="height:48px;">
        <span class="user-name">
          欢迎您！{{manager.name}}老师
          <el-badge :value="message" class="item" size="small" v-show="message===1"></el-badge>
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="width:90px;text-align:center" :command="1">
            <span class="el-icon-s-home" style="color:#409EFF">&ensp;个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item style="width:90px;text-align:center" :command="2">
            <span class="el-icon-message-solid" style="color:#409EFF;position:relative">&ensp;通&emsp;&nbsp;&nbsp;知&nbsp;
              <el-badge :value="message" size="small" style="position:absolute;top:-8px;" v-show="message===1"></el-badge>
            </span>
          </el-dropdown-item>
          <el-dropdown-item style="width:90px;text-align:center" :command="3">
            <span class="el-icon-switch-button" style="color:#409EFF">&ensp;退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      // 通知消息数量
      message: 0,
      messageNum: 0,
      // 登录用户信息
      manager: {}
    }
  },
  methods: {
    userControl (ty) {
      switch (ty) {
        case 1:
          this.jumpUser()
          break
        case 2:
          this.messageRing()
          break
        case 3:
          this.deleteSession()
          break
        default:
          break
      }
    },
    // 跳转到个人中心并触发事件
    jumpUser () {
      this.$toPage('/infoManage')
      this.$root.eventHandle.$emit('JUMP_USER_INFO')
    },
    // 删除session信息
    deleteSession () {
      sessionStorage.removeItem('managerInfo')
      location.reload()
    },
    // 获取未评分的学生个数
    getNotPoint () {
      let data = {
        makerId: this.manager.id
      }
      this.$http.post('/api/manage/getNotPoint', data).then(res => {
        if (res.body.msg === 'success') {
          this.messageNum = res.body.data.length
          this.message = 1
        } else {
          this.messageNum = 0
          this.message = 0
        }
      })
    },
    // 点击通知，动态显示
    messageRing () {
      if (this.message === 0) {
        this.$alert('当前无任何通知', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log('欢迎你登录本系统！')
          }
        })
      } else if (this.message === 1) {
        this.$confirm('当前有' + this.messageNum + '个同学的成绩尚未评分, 是否现在评分?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$toPage('/scoreManage')
        }).catch(() => {
          console.log('取消跳转')
        })
      }
    }
  },
  mounted () {
    if (sessionStorage.managerInfo) {
      this.manager = JSON.parse(sessionStorage.managerInfo)
    }
    this.getNotPoint()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index-header{
  width:100%;
  height:60px;
  background:#33a1fd;
  color:white;
}
.header-top-left{
  height:60px;
  float:left;
  padding-left:10px;
  .index-logo{
    height:60px;
    line-height:60px;
    font-size:20px;
  }
}
.header-top-right{
  height:60px;
  float:right;
  line-height:60px;
  margin-right:20px;
  .user-icon{
    font-size:18px;
  }
  .user-name{
    color:white;
    font-size:14px;
    cursor:pointer;
  }
  // 标记
  .item {
    top:-5px;
  }
}
</style>
<style lang="scss">
.el-badge__content{
  border: none!important;
  line-height:16px;
  height:16px;
  padding:0 5px!important;
}
.el-dropdown-menu__item{
  line-height:36px;
}
</style>
