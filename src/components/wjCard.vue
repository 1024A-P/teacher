<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{item.title}}</span>
      <el-button style="float: right;" type="primary" size="mini">发布</el-button>
    </div>
    <!-- <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div> -->
    <div class="text item">
      出题人：{{item.name}}
    </div>
    <div class="text item">
      状态：{{item.status===1?'未发布':item.status===2?'已发布':''}}
    </div>
    <div class="text item">
      创建时间：{{item.createTime}}
    </div>
    <div style="text-align:right">
      <el-button type="warning" size="mini" plain>编辑</el-button>
      <el-button type="danger" size="mini">删除</el-button>
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
          title: 'Java期中考试',
          name: '林小夕',
          status: 1,
          createTime: '2019-10-24 00:00:00'
        }
      }
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
</style>
