<template>
  <div class="add-choice-manage">
    <div class="line-title choice-info-title">添加选择题</div>
    <div class="add-choice-topic">
      <el-tabs v-model="activeName" type="card">
        <!-- 单选 -->
        <el-tab-pane label="单选题" name="single">
          <wj-single-choice></wj-single-choice>
        </el-tab-pane>
        <!-- 不定项 -->
        <el-tab-pane label="不定项选择题" name="indefinite">
          <div class="indefinite-choice">

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddChoice',
  data () {
    return {
      activeName: 'single'
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.add-choice-manage{
  // background:skyblue;
  margin:46px 25px 25px 25px;
  overflow:hidden;
  padding-bottom:20px;
}
.choice-info-title{
  text-align: left;
  width:100%;
}
.add-choice-topic{
  // background:skyblue;
  margin-top:36px;
}
// 多选
.indefinite-choice{
  width:100%;
  height:400px;
  background:orange;
  text-align:left;
}
</style>
