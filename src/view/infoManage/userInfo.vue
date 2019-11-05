<template>
  <div class="user-info-manage">
    <div class="line-title user-info-title">个人中心</div>
    <div class="user-info-form">
      <el-form ref="form" label-width="100px" label-position="right">
        <el-form-item label="教师号" style="text-align:left">
          <el-input v-model="userData.teacherId" placeholder="请输入教师号" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" style="text-align:left">
          <el-input v-model="userData.password" placeholder="请输入登录密码" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="text-align:left">
          <el-input v-model="userData.name" placeholder="请输入教师姓名" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="text-align:left">
          <el-radio-group v-model="userData.sex">
            <el-radio v-model="userData.sex" label="1">男</el-radio>
            <el-radio v-model="userData.sex" label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" style="text-align:left">
          <el-input v-model="userData.birthday" placeholder="请输入出生日期" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" style="text-align:left">
          <el-input v-model="userData.phone" placeholder="请输入出生日期" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="qq邮箱" style="text-align:left">
          <el-input v-model="userData.email" placeholder="请输入qq邮箱" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="所在专业" style="text-align:left">
          <el-select v-model="userData.major" placeholder="请选择所在专业" style="width:85%">
            <el-option label="信息资源管理" value="1"></el-option>
            <el-option label="健康管理" value="2"></el-option>
            <el-option label="兼任所有专业" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在年级" style="text-align:left">
          <el-select v-model="userData.grade" placeholder="请选择所在年级" style="width:85%">
            <el-option label="大一" value="1"></el-option>
            <el-option label="大二" value="2"></el-option>
            <el-option label="大三" value="3"></el-option>
            <el-option label="大四" value="4"></el-option>
            <el-option label="兼任所有年级" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在班级" style="text-align:left">
          <el-select v-model="userData.class" placeholder="请选择所在班级" style="width:85%">
            <el-option label="一班" value="1"></el-option>
            <el-option label="二班" value="2"></el-option>
            <el-option label="兼任所有班级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现居地址" style="text-align:left">
          <el-input v-model="userData.address" placeholder="请输入现居地址" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item style="text-align:left">
          <div style="width:85%">
            <el-button type="primary">保存</el-button>
            <el-button>重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      userData: {
        teacherId: '6732011',
        password: '1023032504',
        name: '林小夕',
        sex: '1',
        birthday: '1997-11-23',
        major: '1',
        grade: '4',
        class: '1',
        phone: '17612047283',
        email: '1023032504@qq.com',
        address: '广东省广州市天河区广汕一路221号'
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.user-info-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.user-info-title{
  text-align: left;
  width:100%;
  margin-bottom:40px;
}
.user-info-form{
  width:460px;
}
</style>
