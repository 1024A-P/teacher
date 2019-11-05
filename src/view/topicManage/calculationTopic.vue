<template>
  <div class="calculation-manage">
    <!-- <el-button type="primary">路由</el-button> -->
    <div class="line-title calculation-info-title">计算题管理</div>
    <!-- 查询 -->
    <div class="calculation-info-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-input v-model="form.txtId" label="题号" maxlength="30" placeholder="请输入题号" clearable></wj-input>
        <wj-select class="mgl20" v-model="form.sortType" label="排序" :options="sortOption"></wj-select>
        <wj-select class="mgl20" v-model="form.difficulty" label="难度" :options="difficultyOption"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="search-btn fr">
        <el-button type="primary" size="medium">查询</el-button>
        <el-button type="primary" size="medium">添加</el-button>
      </div>
    </div>
    <!-- 表格数据 -->
    <!-- 数据表格 -->
    <wj-table :tableData="testData">
      <el-table-column prop="txtId" label="题号" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="题目" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="难度" width="200" align="center">
        <template slot-scope="scoped">
          {{scoped.row.difficulty===1?'简单':scoped.row.difficulty===2?'一般':scoped.row.difficulty===3?'困难':''}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="usedNum" label="使用次数" align="center" width="120"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button size="mini" type="primary" plain>查看</el-button>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </wj-table>
  </div>
</template>

<script>
export default {
  name: 'Calculation',
  data () {
    return {
      form: {
        txtId: '',
        type: '',
        sortType: '',
        difficulty: ''
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
      difficultyOption: [
        {label: '全部', value: ''},
        {label: '简单', value: 1},
        {label: '一般', value: 2},
        {label: '困难', value: 3}
      ],
      testData: {
        isloading: false,
        total: 50,
        size: 10,
        page: 1,
        list: [
          {
            id: 1,
            txtId: 'm1',
            title: '下列说法正确的有()',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00',
            usedNum: 10
          },
          {
            id: 2,
            txtId: 'm2',
            title: '测试题目1',
            difficulty: 2,
            createTime: '2019-10-25 00:00:00',
            usedNum: 8
          },
          {
            id: 3,
            txtId: 'm3',
            title: '下列属于关系型数据库的是()',
            difficulty: 3,
            createTime: '2019-10-25 00:00:00',
            usedNum: 24
          },
          {
            id: 4,
            txtId: 'm4',
            title: '0.6332的数据类型是()',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00',
            usedNum: 11
          },
          {
            id: 5,
            txtId: 'm5',
            title: '测试题目2',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00',
            usedNum: 3
          },
          {
            id: 6,
            txtId: 'm6',
            title: '下面哪个流类属于面向字符的输入流()',
            difficulty: 3,
            createTime: '2019-10-25 00:00:00',
            usedNum: 17
          },
          {
            id: 7,
            txtId: 'm7',
            title: '下面哪些不是Thread类的方法()',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00',
            usedNum: 18
          },
          {
            id: 8,
            txtId: 'm8',
            title: '测试题目3',
            difficulty: 2,
            createTime: '2019-10-25 00:00:00',
            usedNum: 4
          },
          {
            id: 9,
            txtId: 'm9',
            title: '下面关于java.lang.Exception类的说法正确的是()',
            difficulty: 3,
            createTime: '2019-10-25 00:00:00',
            usedNum: 6
          },
          {
            id: 10,
            txtId: 'm10',
            title: '测试题目4',
            difficulty: 1,
            createTime: '2019-10-25 00:00:00',
            usedNum: 88
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.calculation-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.calculation-info-title{
  text-align: left;
  width:100%;
}
// 查询
.calculation-info-search {
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
