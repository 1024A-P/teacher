<template>
  <div class="exam-manage">
    <div class="line-title exam-info-title">考试管理</div>
    <!-- 添加考试 -->
    <!-- 试卷 -->
    <div class="first-table">
      <div class="paper-all-table">
        <div class="paper-table-top">
          <div class="line-title paper-table-title">添加考试</div>
        </div>
        <wj-table :tableData="paperData">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="试卷名" align="center"></el-table-column>
          <el-table-column prop="maker" label="制定人" align="center"></el-table-column>
          <el-table-column prop="uploadTime" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scoped">
              <el-button size="mini" type="primary">添加</el-button>
            </template>
          </el-table-column>
        </wj-table>
      </div>
      <!-- 已制定的考试 -->
      <div class="maked-all-exam">
        <div class="exam-table-top">
          <div class="line-title exam-table-title">考试启动</div>
        </div>
        <wj-table :tableData="paperData">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="考试时间" align="center"></el-table-column>
          <el-table-column prop="maker" label="考试时长" align="center"></el-table-column>
          <el-table-column prop="uploadTime" label="考生" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scoped">
              <el-button size="mini" type="primary">启动</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </wj-table>
      </div>
    </div>
    <!-- 正在考试和已完成考试 -->
    <div class="exam-all-status">
      <div class="exam-status-title">
        <div class="line-title exam-main-title">
          考试列表
        </div>
      </div>
      <wj-table :tableData="paperData">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="考试时间" align="center"></el-table-column>
        <el-table-column prop="maker" label="考试时长" align="center"></el-table-column>
        <el-table-column prop="maker" label="试卷名" align="center"></el-table-column>
        <el-table-column prop="uploadTime" label="考生" align="center"></el-table-column>
        <el-table-column prop="uploadTime" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scoped">
            <el-button size="mini" type="primary" plain>查看</el-button>
            <el-button size="mini" type="danger">取消</el-button>
          </template>
        </el-table-column>
      </wj-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExamManage',
  data () {
    return {
      // 试卷
      paperData: {
        isloading: false,
        total: 20,
        size: 4,
        page: 1,
        list: [
          {
            name: 'JAVA期中考试',
            maker: '林小夕',
            uploadTime: '2019-10-24'
          },
          {
            name: 'JAVA期中考试',
            maker: '林小夕',
            uploadTime: '2019-10-24'
          },
          {
            name: 'JAVA期中考试',
            maker: '林小夕',
            uploadTime: '2019-10-24'
          },
          {
            name: 'JAVA期中考试',
            maker: '林小夕',
            uploadTime: '2019-10-24'
          },
          {
            name: 'JAVA期中考试',
            maker: '林小夕',
            uploadTime: '2019-10-24'
          },
          {
            name: 'JAVA期中考试',
            maker: '林小夕',
            uploadTime: '2019-10-24'
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
.exam-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.exam-info-title{
  text-align: left;
  width:100%;
  margin-bottom:30px;
}
.first-table{
  width:100%;
  // background:skyblue;
  overflow:hidden;
  margin-bottom:30px;
  min-height:450px;
}
// 试卷列表
.paper-all-table{
  width:44%;
  float:left;
  // box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
  padding-bottom:20px;
  border:1px solid #ebeef5;
}
.paper-table-top{
  font-size:16px;
  height:50px;
  width:100%;
  text-align: left;
  background:rgb(245,247,250);
}
.paper-table-title{
  font-size:16px;
  margin-top:13px;
  margin-left:10px;
}
// 考试启动
.maked-all-exam{
  width:52%;
  float:right;
  // box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
  padding-bottom:20px;
  border:1px solid #ebeef5;
}
.exam-table-top{
  font-size:16px;
  height:50px;
  width:100%;
  text-align: left;
  background:rgb(245,247,250);
}
.exam-table-title{
  font-size:16px;
  margin-top:13px;
  margin-left:10px;
}
// 正在考试和已完成考试列表
.exam-all-status{
  margin: 0;
  border:1px solid #ebeef5;
  padding-bottom: 20px;
}
.exam-status-title{
  width:100%;
  height:50px;
  line-height:50px;
  text-align:left;
  background:rgb(245,247,250);
}
.exam-main-title{
  font-size:16px;
  margin-left:10px;
}
</style>
