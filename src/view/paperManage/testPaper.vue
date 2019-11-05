<template>
  <div class="paper-manage">
    <div class="line-title paper-info-title">试卷管理</div>
    <!-- 查询 -->
    <div class="paper-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.txtId" label="试卷号" maxlength="30" placeholder="请输入试卷号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.title" label="标题" maxlength="30" placeholder="请输入标题名字" clearable></wj-input>
        <wj-select class="mgl20" v-model="form.status" label="状态" :options="statusOption"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium">查询</el-button>
        <el-button type="primary" size="medium">添加</el-button>
      </div>
    </div>
    <!-- 试卷卡片 -->
    <div class="paper-card-list">
      <div class="paper-card" v-for="i in 8" :key="i">
        <wj-card></wj-card>
      </div>
    </div>
    <!-- 分页 -->
    <div class="paper-page">
      <!-- 数据统计 -->
      <div class="data-count">
        当前显示第 {{tableData.page}} 页，共有 {{tableData.total}} 条数据
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.total"
        :page-size="tableData.size"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestPaper',
  data () {
    return {
      form: {
        txtId: '',
        status: '',
        title: ''
      },
      statusOption: [
        {label: '全部', value: ''},
        {label: '未发布', value: 1},
        {label: '已发布', value: 2}
      ],
      tableData: {
        total: 24,
        size: 8,
        page: 1,
        list: []
      }
    }
  },
  methods: {
    pageChange (page) {
      this.tableData.page = page
      console.log(page)
    }
  }
}
</script>
<style lang="scss" scoped>
.paper-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.paper-info-title{
  text-align: left;
  width:100%;
}
// 查询
.paper-info-search {
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
// 试卷卡片
.paper-card-list{
  height:550px;
  width:100%;
  // background:yellowgreen;
  overflow:hidden;
  margin-top:20px;
}
.paper-card{
  width:calc(100%/4);
  float:left;
  // margin:10px;
}
// 分页
.paper-page{
  // background:skyblue;
  text-align:right;
}
.data-count{
  font-size:10px;
  float:left;
  color:#aca9a9;
  padding-left:10px;
}
</style>
