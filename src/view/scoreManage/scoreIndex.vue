<template>
  <div class="score-manage">
    <div class="line-title score-info-title">试卷评分</div>
    <div class="score-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.name" label="姓名" maxlength="30" placeholder="请输入考生姓名" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.stuId" label="学号" maxlength="30" placeholder="请输入考生学号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.txtId" label="试卷号" maxlength="30" placeholder="请输入试卷号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.title" label="试卷名" maxlength="30" placeholder="请输入试卷名字" clearable></wj-input>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium" style="width:120px">查询</el-button>
        <!-- <el-button type="primary" size="medium">添加</el-button> -->
      </div>
    </div>
    <!-- 考生提交试卷 -->
    <wj-table :tableData="studentList">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
      <el-table-column prop="txtId" label="试卷号" align="center"></el-table-column>
      <el-table-column prop="title" label="试卷名" align="center"></el-table-column>
      <el-table-column prop="submitTime" label="交卷时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button type="primary" size="mini">去评分</el-button>
        </template>
      </el-table-column>
    </wj-table>
  </div>
</template>
<script>
export default {
  name: 'ScoreIndex',
  data () {
    return {
      form: {
        txtId: '',
        stuId: '',
        title: '',
        name: ''
      },
      statusOption: [
        {label: '全部', value: ''},
        {label: '未发布', value: 1},
        {label: '已发布', value: 2}
      ],
      studentList: {
        isloading: false,
        total: 50,
        size: 10,
        page: 1,
        list: [
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          },
          {
            name: '陈大叔',
            stuId: '16161088',
            txtId: 'cx01',
            title: 'JAVA期末考试',
            submitTime: '2019-10-24 18:00:00'
          }
        ]
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.score-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.score-info-title{
  text-align: left;
  width:100%;
}
// 查询
.score-info-search {
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
</style>
