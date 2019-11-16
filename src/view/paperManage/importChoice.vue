<template>
  <div class="import-choice-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题目总分">
        <el-input v-model="form.choiceCount" placeholder="请输入题目总分" style="width:130px"></el-input> 分
      </el-form-item>
      <el-form-item label="题目概况">
        <el-input v-model="form.choicePoint" style="width:80px"></el-input>
        分 / 道，共 {{handlePoint()}} 道
      </el-form-item>
      <el-form-item label="题目列表">
        <div class="exam-student-list">
          <div class="student-tag-list scrollStyle">
            <el-tag
              style="margin:10px 0 0 10px"
              v-for="tag in choTagList"
              :key="tag.id"
              @close="delChoice(tag)"
              closable>
              {{tag.txtId}}
            </el-tag>
          </div>
          <div class="btn-bottom">
            <el-button type="primary" class="fl" style="margin:11px 10px" size="mini" @click="openDialog">添加</el-button>
            <span class="fr total-color">共有 {{choIdAll.length}} 道题目</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="prewStep">返回上一步</el-button>
        <el-button type="primary" icon="el-icon-right" @click="nextStep">下一步</el-button>
      </el-form-item>
    </el-form>
    <!-- 学生对话框 -->
    <el-dialog
      title="添加题目"
      :visible.sync="dialogShow"
      width="1100px"
      :before-close="closeDialog">
      <!-- 查询 -->
      <div class="choice-info-search">
        <!-- 查询输入参数 -->
        <div class="info-input">
          <wj-input v-model="choiceForm.txtId" label="题号" maxlength="30" placeholder="请输入题号" clearable></wj-input>
          <wj-input class="mgl20" v-model="choiceForm.txtName" label="题名" maxlength="30" placeholder="请输入题目名称" clearable></wj-input>
          <wj-select class="mgl20" v-model="choiceForm.type" label="类型" :options="typeOption"></wj-select>
          <!-- <wj-select class="mgl20" v-model="form.sortType" label="排序" :options="sortOption"></wj-select> -->
          <wj-select class="mgl20" v-model="choiceForm.hardType" label="难度" :options="hardOption"></wj-select>
        </div>
        <!-- 右侧按钮 -->
        <div class="search-btn fr">
          <el-button type="primary" size="medium" @click="getChoiceList">查询</el-button>
        </div>
      </div>
      <wj-table :tableData="choiceList" @selectionChange="getChoList" maxHeight="450px" :showPage="false">
        <el-table-column type="selection" width="55"></el-table-column>
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
      </wj-table>
      <div style="text-align:center">
        <el-button type="primary" plain @click="closeDialog">取消</el-button>
        &nbsp;
        <el-button type="primary" @click="certainChoice">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ImportChoice',
  data () {
    return {
      form: {
        choiceCount: '',
        choicePoint: '',
        choiceId: []
      },
      // 学生弹出框显隐
      dialogShow: false,
      choiceForm: {
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
      // 用于显示tag标签的list
      exTagList: [],
      choTagList: [],
      // 存储所有学生id
      exIdAll: [],
      choIdAll: [],
      // 统计题目
      topicNum: 0
    }
  },
  methods: {
    // 处理分数
    handlePoint () {
      let result = ''
      if (this.form.choiceCount !== '' && this.form.choicePoint !== '') {
        result = (this.form.choiceCount * 1) / (this.form.choicePoint * 1)
        this.topicNum = result
        return result
      } else {
        result = 0
        this.topicNum = result
        return result
      }
    },
    // 显示弹出框
    openDialog () {
      this.dialogShow = true
    },
    // 关闭弹窗框
    closeDialog () {
      this.dialogShow = false
    },
    // 获取列表数据
    getChoiceList () {
      this.choiceList.isloading = true
      this.choiceList.page = 1
      let data = this.choiceForm
      this.$http.post('/api/manage/getChoiceList', data).then(res => {
        if (res.body.msg === 'success') {
          this.choiceList.isloading = false
          this.choiceAllList = res.body.data
          this.choiceList.total = res.body.data.length
          // 处理数据集
          this.choiceList.list = this.choiceAllList
        } else {
          this.choiceList.isloading = false
          this.choiceAllList = []
          this.choiceList.list = []
          this.choiceList.total = 0
        }
      })
    },
    // 勾选学生
    getChoList (data) {
      let tagList = []
      let idAll = []
      for (let i in data) {
        let stu = {}
        stu.id = data[i].id
        stu.txtId = data[i].txtId
        tagList.push(stu)
        idAll.push(data[i].id)
      }
      this.exTagList = tagList
      this.exIdAll = idAll
    },
    // 确定选中学生
    certainChoice () {
      this.choTagList = JSON.parse(JSON.stringify(this.exTagList))
      this.choIdAll = JSON.parse(JSON.stringify(this.exIdAll))
      this.closeDialog()
    },
    // 删除学生
    delChoice (item) {
      this.choTagList.splice(this.choTagList.indexOf(item), 1)
      this.choIdAll.splice(this.choIdAll.indexOf(item.id), 1)
    },
    // 上一步
    prewStep () {
      this.$emit('firstStep')
    },
    // 下一步
    nextStep () {
      if (this.choIdAll.length === this.topicNum) {
        this.form.choiceId = this.choIdAll
        this.$emit('secondFinsh', this.form, this.choTagList)
      } else {
        this.$message.error('题目数量不一致')
      }
    }
  },
  mounted () {
    this.getChoiceList()
  }
}
</script>
<style lang="scss" scoped>
//滚动条样式
.scrollStyle{
  overflow-y:auto;
  overflow-x:hidden;
}
.scrollStyle::-webkit-scrollbar{
  width:6px;
}
.scrollStyle::-webkit-scrollbar-thumb{
  border-radius:12px;
  background:rgb(177, 175, 175);
}
.scrollStyle::-webkit-scrollbar-track{
  border-radius:12px;
  background:rgb(230, 226, 226);
}
.import-choice-form{
  width:460px;
  // height:500px;
  margin: 0 auto;
  padding-right:100px;
  text-align: left;
}
.exam-student-list{
  width:100%;
  // background:skyblue;
  border-radius: 4px;
  border:1px solid #DCDFE6;
  overflow:hidden;
}
.student-tag-list{
  width:100%;
  // background:orange;
  height:250px;
  border-radius: 4px 4px 0 0;
  text-align: left;
  // border-bottom:1px solid #DCDFE6;
}
.btn-bottom{
  width:100%;
  height:50px;
  background:#F5F7FA;
  border-radius: 0 0 4px 4px;
  overflow:hidden;
  line-height: 50px;
}
.total-color{
  color:rgb(127, 128, 131);
  font-size:12px;
  display:block;
  margin-right:10px;
}
// 查询
.choice-info-search {
  width:100%;
  overflow:hidden;
  .info-input{
    overflow:hidden;
    float:left;
  }
}
</style>
