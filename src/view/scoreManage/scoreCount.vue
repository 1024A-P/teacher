<template>
  <div class="score-count-manage">
    <div class="line-title score-count-title">成绩统计</div>
    <!-- 查询 -->
    <div class="score-count-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-select v-model="form.examName" label="试卷名" :options="examOption" style="width:260px"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="mgl20 fl">
        <el-button type="primary" size="medium" style="height:35px;margin-top:1px">筛选</el-button>
      </div>
    </div>
    <!-- echart图表 -->
    <div class="echart-part">
      <div id="chart-first" style="width:36%;height:376px;float:left;"></div>
      <div id="chart-second" style="width:64%;height:376px;float:left;"></div>
    </div>
    <div class="line-title score-count-title">考生成绩列表</div>
    <!-- 数据表格 -->
    <wj-table :tableData="testData" @change="getStudent" style="margin-top:20px">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scoped">
          {{scoped.row.sex==='1'?'男':scoped.row.sex==='2'?'女':''}}
        </template>
      </el-table-column>
      <el-table-column prop="major" label="专业" align="center"></el-table-column>
      <el-table-column label="年级" align="center">
        <template slot-scope="scoped">
          {{handleGrade(scoped.row.grade)}}
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center">
        <template slot-scope="scoped">
          {{scoped.row.class==1?'一班':scoped.row.class==2?'二班':''}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
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
  name: 'ScoreCount',
  data () {
    return {
      // 查询参数
      form: {
        examName: 1
      },
      examOption: [
        {
          value: 1,
          label: 'JAVA期中考试'
        },
        {
          value: 2,
          label: 'C语言期中考试'
        },
        {
          value: 3,
          label: 'C++期中考试'
        }
      ],
      testData: {
        isloading: false,
        page: 1,
        size: 10,
        total: 50,
        list: [
          {
            id: 1,
            stuId: '16161051',
            name: '张三',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 2,
            stuId: '16161021',
            name: '李四',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 3,
            stuId: '16161051',
            name: '张大傻',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 4,
            stuId: '16161051',
            name: '陈大叔',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 5,
            stuId: '16161051',
            name: '刘大婶',
            sex: '2',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 6,
            stuId: '16161051',
            name: '郭大儿',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 7,
            stuId: '16161051',
            name: '诸葛亮',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 8,
            stuId: '16161051',
            name: '司马懿',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 9,
            stuId: '16161051',
            name: '孙尚香',
            sex: '2',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          },
          {
            id: 10,
            stuId: '16161051',
            name: '刘备',
            sex: '1',
            major: '信息资源管理',
            grade: 4,
            class: 1,
            createTime: '2019-10-22 10:24:00'
          }
        ]
      }
    }
  },
  methods: {
    // 考试成绩统计
    getEchartFirst () {
      const myChart = this.$echarts.init(
        document.getElementById('chart-first')
      )
      const option = {
        title: {
          text: 'JAVA期中考试成绩统计',
          x: 'left',
          top: '15',
          left: '10'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}人，占了{d}%'
        },
        legend: {
          orient: 'vertical',
          left: '10',
          top: '16%',
          data: ['不及格', '及格', '良好', '优秀']
        },
        series: [
          {
            // name: '',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 10, name: '不及格'},
              {value: 20, name: '及格'},
              {value: 7, name: '良好'},
              {value: 8, name: '优秀'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    // 学生成绩echart
    getEchartSecond () {
      const myChart = this.$echarts.init(
        document.getElementById('chart-second')
      )
      const option = {
        title: {
          text: 'JAVA期中考试考生成绩',
          top: '15',
          left: '10'
        },
        color: ['#3398DB'],
        // legend: {
        //   top: '15'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙', '小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙', '小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙', '小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '考生分数',
            type: 'bar',
            barWidth: '40',
            barCategoryGap: '0',
            data: [10, 52, 86, 77, 90, 63, 54, 66, 48, 84, 24, 70, 78, 96, 10, 52, 86, 77, 90, 63, 54, 66, 48, 84, 24, 70, 78, 96]
          }
        ],
        dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '52',
          bottom: -5,
          height: 20,
          start: 70,
          end: 100 // 初始化滚动条
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    // 获取学生信息数据
    getStudent (page) {
      this.testData.page = page
      console.log(this.form)
    },
    // 处理年级
    handleGrade (lv) {
      let result = ''
      switch (lv) {
        case 1:
          result = '大一'
          break
        case 2:
          result = '大二'
          break
        case 3:
          result = '大三'
          break
        case 4:
          result = '大四'
          break
        default:
          break
      }
      return result
    }
  },
  mounted () {
    this.getEchartFirst()
    this.getEchartSecond()
  }
}
</script>
<style lang="scss" scoped>
.score-count-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.score-count-title{
  text-align: left;
  width:100%;
}
// 查询
.score-count-search {
  width:100%;
  // padding:30px 0;
  margin:30px 0 20px 0;
  overflow:hidden;
  // border-top:1px solid #e6e6e6;
  // border-bottom:1px solid #e6e6e6;
  .info-input{
    overflow:hidden;
    float:left;
  }
}
// 图表
.echart-part{
  width:100%;
  overflow:hidden;
  // background-color:orange;
  margin-bottom:30px;
}
</style>
