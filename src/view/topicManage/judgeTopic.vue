<template>
  <div class="judge-manage">
    <!-- <el-button type="primary">路由</el-button> -->
    <div class="line-title judge-info-title">判断题管理</div>
    <!-- 查询 -->
    <div class="judge-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.txtId" label="题号" maxlength="30" placeholder="请输入题号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.txtName" label="题名" maxlength="30" placeholder="请输入题目名称" clearable></wj-input>
        <wj-select class="mgl20" v-model="form.hardType" label="难度" :options="hardOption"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium" @click="getJudgeList">查询</el-button>
        <el-button type="primary" size="medium" @click="$toPage('/addJudge')">添加</el-button>
      </div>
    </div>
    <!-- 表格数据 -->
    <!-- 数据表格 -->
    <wj-table :tableData="judgeList" @change="pageAction">
      <el-table-column prop="txtId" label="题号" width="80" align="center"></el-table-column>
      <el-table-column prop="txtName" label="题目" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="难度" width="200" align="center">
        <template slot-scope="scoped">
          <el-rate
            :value="scoped.row.hardType*1"
            disabled>
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="maker" label="制定人" align="center"></el-table-column>
      <el-table-column prop="createTime" label="制定时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button size="mini" type="primary" @click="lookJudge(scoped.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="delChoice(scoped.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </wj-table>
    <!-- 查看详情弹窗 -->
    <el-dialog
      style="text-align:left"
      title="详情"
      :visible="lookShow"
      width="480px"
      :before-close="lookClose">
      <wj-judge-detail :dataList="dataList"></wj-judge-detail>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Judge',
  data () {
    return {
      form: {
        txtId: '',
        txtName: '',
        hardType: ''
      },
      // 排序
      sortOption: [
        {label: '全部', value: ''},
        {label: '使用次数递增', value: 1},
        {label: '使用次数递减', value: 2},
        {label: '日期递增', value: 3},
        {label: '日期递减', value: 4}
      ],
      // 难度
      hardOption: [
        {label: '全部', value: ''},
        {label: '一级', value: 1},
        {label: '二级', value: 2},
        {label: '三级', value: 3},
        {label: '四级', value: 4},
        {label: '五级', value: 5}
      ],
      // 列表数据
      judgeList: {
        isloading: false,
        total: 0,
        size: 10,
        page: 1,
        list: []
      },
      // 列表所有数据以便于分页
      judgeAllList: [],
      // 查看选择题详情弹窗显隐
      lookShow: false,
      // 查看详情数据
      dataList: {}
    }
  },
  methods: {
    // 查看详情
    lookJudge (list) {
      this.lookShow = true
      this.dataList = list
    },
    // 弹窗关闭回调函数
    lookClose () {
      this.lookShow = false
    },
    // 删除选择题
    delChoice (id) {
      let data = {
        id: id
      }
      this.$confirm('确定删除该题目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/manage/removeJudge', data).then(res => {
          if (res.body.msg === 'success') {
            this.$message.success('恭喜您！已成功删除该题目')
            this.getJudgeList()
          } else {
            this.$message.error('未知错误！删除题目失败')
          }
        })
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    // 获取列表数据
    getJudgeList () {
      this.judgeList.isloading = true
      this.judgeList.page = 1
      let data = this.form
      this.$http.post('/api/manage/getJudgeList', data).then(res => {
        if (res.body.msg === 'success') {
          this.judgeList.isloading = false
          this.judgeAllList = res.body.data
          this.judgeList.total = res.body.data.length
          // 处理数据集
          this.judgeList.list = this.$utils.getTableData(this.judgeAllList, this.judgeList.page, this.judgeList.size)
        } else {
          this.judgeList.isloading = false
          this.judgeAllList = []
          this.judgeList.list = []
          this.judgeList.total = 0
        }
      })
    },
    // 列表分页
    pageAction (page) {
      this.judgeList.page = page
      this.judgeList.list = this.$utils.getTableData(this.judgeAllList, this.judgeList.page, this.judgeList.size)
    }
  },
  mounted () {
    this.getJudgeList()
  }
}
</script>
<style lang="scss" scoped>
.judge-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.judge-info-title{
  text-align: left;
  width:100%;
}
// 查询
.judge-info-search {
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
