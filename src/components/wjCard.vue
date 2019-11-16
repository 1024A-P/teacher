<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{item.paperName}}</span>
      <el-button
        style="float: right;"
        type="primary"
        size="mini"
        v-show="item.status==='1'"
        @click="uploadExam">
        发布
      </el-button>
      <span
        class="exam-status fr"
        v-show="item.status==='2'">
        已发布
      </span>
      <span
        class="exam-status fr"
        v-show="item.status==='3'">
        已完成
      </span>
    </div>
    <!-- <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div> -->
    <div class="text item">
      考试号：{{item.paperId}}
    </div>
    <div class="text item">
      出题人：{{item.maker}}
    </div>
    <!-- <div class="text item">
      状态：{{item.status==='1'?'未发布':item.status==='2'?'已发布':item.status==='3'?'已完成':'暂无数据'}}
    </div> -->
    <div class="text item">
      创建时间：{{item.createTime}}
    </div>
    <div style="text-align:right">
      <el-button type="primary" size="mini" plain @click="jumpDetail">预览</el-button>
      <el-button type="danger" size="mini" @click="delExam">删除</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: 0,
          paperName: '暂无数据',
          maker: '暂无数据',
          status: 0,
          createTime: '暂无数据'
        }
      }
    }
  },
  methods: {
    jumpDetail () {
      this.$toPage('/paperDetail', {
        id: this.item.id
      })
    },
    // 发布考试
    uploadExam () {
      let data = {
        id: this.item.id,
        status: 2
      }
      this.$confirm('确定发布该考试?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http.post('/api/manage/uploadExam', data).then(res => {
          if (res.body.msg === 'success') {
            this.$message.success('恭喜您！发布考试成功')
            this.$emit('refresh')
          } else {
            console.log('发布失败！')
          }
        })
      }).catch(() => {
        console.log('已取消发布')
      })
    },
    // 删除考试
    delExam () {
      let data = {
        id: this.item.id
      }
      this.$confirm('确定删除该考试?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/manage/removeExam', data).then(res => {
          if (res.body.msg === 'success') {
            this.$message.success('恭喜您！删除考试成功')
            this.$emit('refresh')
          } else {
            console.log('删除失败！')
          }
        })
      }).catch(() => {
        console.log('已取消删除')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.text {
    font-size: 14px;
  }
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  // width: 480px;
  text-align: left;
  margin:10px;
}
.exam-status{
  color:#4b4a4a;
  font-size:14px;
}
</style>
