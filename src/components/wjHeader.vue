<template>
  <div class="index-header">
    <!-- 顶部左边以及logo -->
    <div class="header-top-left">
      <div class="index-logo">
        <!-- <img src="@A/images/teacher_logo.png"> -->
        健康学院考试管理系统
      </div>
    </div>
    <!-- 顶部右边个人头像 -->
    <div class="header-top-right">
      <i class="el-icon-user-solid user-icon"></i>
      &nbsp;
      <el-dropdown trigger="hover" placement="bottom" @command="userControl" style="height:48px;">
        <span class="user-name">
          欢迎您！林小夕老师
          <el-badge :value="message" class="item" size="small"></el-badge>
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="width:90px;text-align:center" :command="1">
            <span class="el-icon-s-home" style="color:#409EFF">&ensp;个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item style="width:90px;text-align:center" :command="2">
            <span class="el-icon-message-solid" style="color:#409EFF;position:relative">&ensp;通&emsp;&nbsp;&nbsp;知&nbsp;
              <el-badge :value="message" size="small" style="position:absolute;top:-8px;"></el-badge>
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
      message: 10
    }
  },
  methods: {
    userControl (test) {
      console.log(test)
    }
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
  // width:200px;
  // background:rgb(23,42,57);
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
  // .user-face{
  //   width:30px;
  //   height:30px;
  //   background:black;
  //   border-radius: 50%;
  //   display: inline-block;
  //   vertical-align: middle;
  // }
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
  border: none;
  line-height:16px;
  height:16px;
  padding:0 5px;
}
.el-dropdown-menu__item{
  line-height:42px;
}
</style>
