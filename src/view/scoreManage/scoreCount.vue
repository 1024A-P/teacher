<template>
  <div class="score-count-manage">
    <div class="line-title score-count-title">成绩统计</div>
    <!-- 查询 -->
    <div class="score-count-search">
      <!-- 查询输入参数 -->
      <div class="info-input">
        <wj-select v-model="form.examId" label="试卷名" :options="examOption" style="width:260px"></wj-select>
      </div>
      <!-- 右侧按钮 -->
      <div class="mgl20 fl">
        <el-button type="primary" size="medium" style="height:35px;margin-top:1px" @click="getExamPoint">筛选</el-button>
      </div>
    </div>
    <!-- echart图表 -->
    <div class="echart-part">
      <div id="chart-first" style="width:36%;height:376px;float:left;"></div>
      <div id="chart-second" style="width:64%;height:376px;float:left;"></div>
    </div>
    <div class="line-title score-count-title">考生成绩列表</div>
    <!-- 数据表格 -->
    <wj-table :tableData="pointList" @change="pageAction" style="margin-top:20px">
      <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
      <el-table-column prop="stuName" label="姓名" align="center"></el-table-column>
      <el-table-column label="试卷号" align="center">
        <template slot-scope="scoped">
          {{'暂无'}}
        </template>
      </el-table-column>
      <el-table-column prop="paperName" label="试卷名" align="center"></el-table-column>
      <el-table-column prop="maker" label="制定人" align="center"></el-table-column>
      <el-table-column label="耗时" align="center">
        <template slot-scope="scoped">
          {{scoped.row.wastedTime+'分钟'}}
        </template>
      </el-table-column>
      <el-table-column prop="finishDate" label="交卷时间" align="center" width="200"></el-table-column>
      <el-table-column label="考试分数" align="center">
        <template slot-scope="scoped">
          {{scoped.row.countPoint===null?'尚未评分':scoped.row.countPoint+' 分'}}
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center">
        <template slot-scope="scoped">
          <div
            v-html="handlePoints(scoped.row.countPoint)">
          </div>
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
        examId: ''
      },
      examOption: [],
      // 答案列表数据
      pointList: {
        isloading: false,
        total: 0,
        size: 10,
        page: 1,
        list: []
      },
      // 所有答案数据
      pointAllList: [],
      // 饼图
      firstChart: {},
      firstChartOption: {},
      // 直方图
      secondChart: {},
      secondChartOption: {}
    }
  },
  methods: {
    // 考试成绩统计
    getEchartFirst () {
      this.firstChart = this.$echarts.init(
        document.getElementById('chart-first')
      )
      this.firstChartOption = {
        title: {
          text: '',
          x: 'left',
          top: 0,
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
            // data: [
            //   {value: 10, name: '不及格'},
            //   {value: 20, name: '及格'},
            //   {value: 7, name: '良好'},
            //   {value: 8, name: '优秀'}
            // ],
            data: [],
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
      this.firstChart.setOption(this.firstChartOption)
      window.addEventListener('resize', () => {
        this.firstChart.resize()
      })
    },
    // 学生成绩echart
    getEchartSecond () {
      this.secondChart = this.$echarts.init(
        document.getElementById('chart-second')
      )
      this.secondChartOption = {
        title: {
          // text: 'JAVA期中考试考生成绩',
          text: '',
          top: 0,
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
            name: '姓 名',
            // data: ['小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙', '小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙', '小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙', '小张', '小李', '小花', '小陈', '小陆', '小吴', '小龙'],
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '分 数',
            max: 100
          }
        ],
        series: [
          {
            name: '考生分数',
            type: 'bar',
            barWidth: '40',
            barCategoryGap: '0',
            // data: [10, 52, 86, 77, 90, 63, 54, 66, 48, 84, 24, 70, 78, 96, 10, 52, 86, 77, 90, 63, 54, 66, 48, 84, 24, 70, 78, 96]
            data: []
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
      this.secondChart.setOption(this.secondChartOption)
      window.addEventListener('resize', () => {
        this.secondChart.resize()
      })
    },
    // 获取所有考试科目
    getExamDetail () {
      let managerInfo = {}
      if (sessionStorage.managerInfo) {
        managerInfo = JSON.parse(sessionStorage.managerInfo)
      }
      let data = {
        makerId: managerInfo.id
      }
      this.$http.post('/api/manage/getTeacherExam', data).then(res => {
        if (res.body.msg === 'success') {
          let ob = res.body.data
          for (let i in ob) {
            let list = {
              value: ob[i].id,
              label: ob[i].paperName
            }
            // 添加筛选考试
            this.examOption.push(list)
          }
          this.form.examId = this.examOption[0].value
          // 获取所有考生在该考试的成绩
          this.getExamPoint()
        } else {
          console.log('获取考试详情失败！')
        }
      })
    },
    // 根据考试id获取已完成评分的所有成绩列表
    getExamPoint () {
      this.pointList.isloading = true
      let data = this.form
      this.$http.post('/api/manage/getStuPoint', data).then(res => {
        if (res.body.msg === 'success') {
          this.pointList.isloading = false
          this.pointAllList = res.body.data
          this.pointList.total = res.body.data.length
          // 处理数据集
          this.pointList.list = this.$utils.getTableData(this.pointAllList, this.pointList.page, this.pointList.size)
          // 画出饼形图
          this.drawFirstChart()
          // 画出echart直方图
          this.drawSecondChart()
        } else {
          console.log('暂无考生成绩！')
          this.pointList.isloading = false
          this.pointList.total = 0
          this.pointList.list = []
          this.pointAllList = []
          // 画出饼形图
          this.drawFirstChart()
          // 画出echart直方图
          this.drawSecondChart()
        }
      })
    },
    // 列表分页
    pageAction (page) {
      this.pointList.page = page
      this.pointList.list = this.$utils.getTableData(this.pointAllList, this.pointList.page, this.pointList.size)
    },
    // 画出饼形图
    drawFirstChart () {
      // 不及格人数
      let sum1 = 0
      let sum2 = 0
      let sum3 = 0
      let sum4 = 0
      let ob = this.pointAllList
      if (ob.length > 0) {
        for (let i in ob) {
          let points = ob[i].countPoint
          if (points < 60) {
            sum1 += 1
          } else if (points >= 60 && points < 70) {
            sum2 += 1
          } else if (points >= 70 && points < 90) {
            sum3 += 1
          } else if (points >= 90) {
            sum4 += 1
          }
        }
        this.firstChartOption.title.text = ob[0].paperName
      } else {
        this.firstChartOption.title.text = '暂无考生成绩'
      }
      let data = [
        {value: sum1, name: '不及格'},
        {value: sum2, name: '及格'},
        {value: sum3, name: '良好'},
        {value: sum4, name: '优秀'}
      ]
      this.firstChartOption.series[0].data = data
      this.refreshEchart(this.firstChart, this.firstChartOption)
    },
    // 画出echart直方图
    drawSecondChart () {
      // console.log(this.pointAllList)
      // 存储学生姓名
      let stuNames = []
      // 存储学生分数
      let stuPoints = []
      for (let i in this.pointAllList) {
        stuNames.push(this.pointAllList[i].stuName)
        stuPoints.push(this.pointAllList[i].countPoint)
      }
      if (this.pointAllList.length !== 0) {
        this.secondChartOption.title.text = this.pointAllList[0].paperName
      } else {
        this.secondChartOption.title.text = '暂无考生成绩'
      }
      this.secondChartOption.xAxis[0].data = stuNames
      this.secondChartOption.series[0].data = stuPoints
      this.refreshEchart(this.secondChart, this.secondChartOption)
    },
    // 刷新视图
    refreshEchart (obj, objOption) {
      if (obj && objOption) {
        obj.clear()
        obj.setOption(objOption)
      }
    },
    // 成绩统计
    handlePoints (points) {
      let result = ''
      if (points < 60) {
        result = '<span style="color:#F56C6C;font-weight:bold">不及格</span>'
      } else if (points >= 60 && points < 70) {
        result = '<span style="color:#E6A23C;font-weight:bold">及格</span>'
      } else if (points >= 70 && points < 90) {
        result = '<span style="color:#409EFF;font-weight:bold">良好</span>'
      } else if (points >= 90) {
        result = '<span style="color:#67C23A;font-weight:bold">优秀</span>'
      }
      return result
    }
  },
  mounted () {
    this.getEchartFirst()
    this.getEchartSecond()
    this.getExamDetail()
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
