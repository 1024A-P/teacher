<template>
  <div class="paper-manage">
    <div class="line-title paper-info-title">考试管理</div>
    <!-- 查询 -->
    <div class="paper-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.paperId" label="考试号" maxlength="30" placeholder="请输入考试号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.paperName" label="考试名" maxlength="30" placeholder="请输入考试名称" clearable></wj-input>
        <wj-select class="mgl20" v-model="form.status" label="状态" :options="statusOption"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium" @click="getExamList">查询</el-button>
        <el-button type="primary" size="medium" @click="$toPage('/addPaper')">添加</el-button>
      </div>
    </div>
    <!-- 试卷卡片 -->
    <div class="paper-card-list">
      <div class="paper-card" v-for="(item,index) in examList.list" :key="index">
        <wj-card :item="item" @refresh="getExamList"></wj-card>
      </div>
      <div class="loading-block" v-show="examList.isloading">
        <div class="loading-tuan">
          <p>
            <span class="el-icon-loading" style="color:#409EFF"></span>
            <br>
            <span style="font-size:14px;color:#409EFF">拼命加载中</span>
          </p>
        </div>
      </div>
      <p v-show="examList.list.length===0" style="font-size:14px">暂无数据</p>
    </div>
    <!-- 分页 -->
    <div class="paper-page" v-show="examList.list.length!==0">
      <!-- 数据统计 -->
      <div class="data-count">
        当前显示第 {{examList.page}} 页，共有 {{examList.total}} 条数据
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="examList.total"
        :page-size="examList.size"
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
        paperId: '',
        status: '',
        paperName: ''
      },
      statusOption: [
        {label: '全部', value: ''},
        {label: '未发布', value: '1'},
        {label: '已发布', value: '2'},
        {label: '已完成', value: '3'}
      ],
      examList: {
        isloading: false,
        total: 0,
        size: 8,
        page: 1,
        list: []
      },
      examAllList: []
    }
  },
  methods: {
    pageChange (page) {
      this.tableData.page = page
      console.log(page)
    },
    // 获取考试列表
    getExamList () {
      this.examList.isloading = true
      let data = this.form
      this.$http.post('/api/manage/getExamList', data).then(res => {
        if (res.body.msg === 'success') {
          this.examList.isloading = false
          this.examList.total = res.body.data.length
          this.examAllList = res.body.data
          // 处理数据集
          this.examList.list = this.$utils.getTableData(this.examAllList, this.examList.page, this.examList.size)
        } else {
          this.examList.isloading = false
          this.examList.total = res.body.data.length
          this.examList.list = []
        }
      })
    }
  },
  mounted () {
    this.getExamList()
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
  width:100%;
  // background:yellowgreen;
  overflow:hidden;
  margin-top:20px;
  position: relative;
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
  margin-top:20px;
}
.data-count{
  font-size:10px;
  float:left;
  color:#aca9a9;
  padding-left:10px;
}
.loading-block{
  background-color:hsla(0,0%,100%,.9);
  width:100%;
  height:100%;
  position:absolute;
  z-index:2000;
}
.loading-tuan{
  display: inline-block;
  vertical-align: middle;
  width:100px;
  height:100px;
  margin-top:50px;
}
</style>
