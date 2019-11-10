<template>
  <div class="choice-manage">
    <!-- <el-button type="primary">路由</el-button> -->
    <div class="line-title choice-info-title">选择题管理</div>
    <!-- 查询 -->
    <div class="choice-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.txtId" label="题号" maxlength="30" placeholder="请输入题号" clearable></wj-input>
        <wj-input class="mgl20" v-model="form.txtName" label="题名" maxlength="30" placeholder="请输入题目名称" clearable></wj-input>
        <wj-select class="mgl20" v-model="form.type" label="类型" :options="typeOption"></wj-select>
        <!-- <wj-select class="mgl20" v-model="form.sortType" label="排序" :options="sortOption"></wj-select> -->
        <wj-select class="mgl20" v-model="form.hardType" label="难度" :options="hardOption"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium" @click="getChoiceList">查询</el-button>
        <el-button type="primary" size="medium" @click="$toPage('/addChoice')">添加</el-button>
      </div>
    </div>
    <!-- 表格数据 -->
    <!-- 数据表格 -->
    <wj-table :tableData="choiceList" @change="pageAction">
      <el-table-column prop="txtId" label="题号" width="80" align="center"></el-table-column>
      <el-table-column label="类型" width="200" align="center">
        <template slot-scope="scoped">
          {{scoped.row.type==='1'?'单选':scoped.row.type==='2'?'不定项':''}}
        </template>
      </el-table-column>
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
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scoped">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </wj-table>
  </div>
</template>

<script>
export default {
  name: 'Choice',
  data () {
    return {
      form: {
        txtId: '',
        txtName: '',
        type: '',
        // sortType: '',
        hardType: ''
      },
      // 类型
      typeOption: [
        {label: '全部', value: ''},
        {label: '单选题', value: 1},
        {label: '不定项选择题', value: 2}
      ],
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
      choiceList: {
        isloading: false,
        total: 0,
        size: 10,
        page: 1,
        list: []
      },
      // 所有列表数据作为固定的数据集
      choiceAllList: [],
      testData: {
        isloading: false,
        total: 50,
        size: 10,
        page: 1,
        list: [
          {
            id: 1,
            txtId: 'c1',
            type: 2,
            title: '下列说法正确的有()',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 2,
            txtId: 'c2',
            type: 1,
            title: '测试题目1',
            difficulty: 2,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 3,
            txtId: 'c3',
            type: 1,
            title: '下列属于关系型数据库的是()',
            difficulty: 3,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 4,
            txtId: 'c4',
            type: 2,
            title: '0.6332的数据类型是()',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 5,
            txtId: 'c5',
            type: 1,
            title: '测试题目2',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 6,
            txtId: 'c6',
            type: 2,
            title: '下面哪个流类属于面向字符的输入流()',
            difficulty: 3,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 7,
            txtId: 'c7',
            type: 1,
            title: '下面哪些不是Thread类的方法()',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 8,
            txtId: 'c8',
            type: 1,
            title: '测试题目3',
            difficulty: 2,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 9,
            txtId: 'c9',
            type: 2,
            title: '下面关于java.lang.Exception类的说法正确的是()',
            difficulty: 3,
            createTime: '2019-10-25 00:00:00'
          },
          {
            id: 10,
            txtId: 'c10',
            type: 2,
            title: '测试题目4',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00'
          }
        ]
      }
    }
  },
  methods: {
    // 获取列表数据
    getChoiceList () {
      this.choiceList.isloading = true
      let data = this.form
      this.$http.post('/api/manage/getChoiceList', data).then(res => {
        if (res.body.msg === 'success') {
          this.choiceList.isloading = false
          this.choiceAllList = res.body.data
          this.choiceList.total = res.body.data.length
          // 处理数据集
          this.choiceList.list = this.$utils.getTableData(this.choiceAllList, this.choiceList.page, this.choiceList.size)
        } else {
          this.choiceList.isloading = false
          this.choiceAllList = []
          this.choiceList.list = []
          this.choiceList.total = 0
        }
      })
    },
    // 列表分页
    pageAction (page) {
      this.choiceList.page = page
      this.choiceList.list = this.$utils.getTableData(this.choiceAllList, this.choiceList.page, this.choiceList.size)
    }
  },
  mounted () {
    this.getChoiceList()
  }
}
</script>
<style lang="scss" scoped>
.choice-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.choice-info-title{
  text-align: left;
  width:100%;
}
// 查询
.choice-info-search {
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
