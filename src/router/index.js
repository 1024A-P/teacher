import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import HelloWorld from '@/components/HelloWorld'
// 教师和学生用户管理
import Student from '@V/userManage/student'
import Teacher from '@V/userManage/teacher'
// 题库管理
import Choice from '@V/topicManage/choiceTopic'
import AddChoice from '@V/topicManage/addChoice'
import AddJudge from '@V/topicManage/addJudge'
import Calculation from '@V/topicManage/calculationTopic'
import Fill from '@V/topicManage/fillTopic'
import Judge from '@V/topicManage/judgeTopic'
import Discuss from '@V/topicManage/discussTopic'
import Other from '@V/topicManage/otherTopic'
// 试卷管理
import Paper from '@V/paperManage/testPaper'
import AddPaper from '@V/paperManage/addPaper'
import PaperDetail from '@V/paperManage/paperDetail'
// 考试管理
import Exam from '@V/examManage/examIndex'
// 成绩管理
import Score from '@V/scoreManage/scoreIndex'
// 成绩统计
import ScoreCount from '@V/scoreManage/scoreCount'
// 个人中心
import UserInfo from '@V/infoManage/userInfo'

Vue.use(Router)
Vue.use(VueResource)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Student',
      component: Student,
      meta: {
        // Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
        keepAlive: false
      }
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher,
      meta: {
        keepAlive: false
      }
    },
    // 题库管理
    {
      path: '/choiceManage',
      name: 'ChoiceTopic',
      component: Choice,
      meta: {
        keepAlive: false
      }
    },
    // 添加选择题
    {
      path: '/addChoice',
      name: 'AddChoice',
      component: AddChoice,
      meta: {
        keepAlive: false
      }
    },
    // 添加判断题
    {
      path: '/addJudge',
      name: 'AddJudge',
      component: AddJudge,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/calculationManage',
      name: 'CalculationTopic',
      component: Calculation,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/fillManage',
      name: 'FillTopic',
      component: Fill,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/judgeManage',
      name: 'JudgeTopic',
      component: Judge,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/discussManage',
      name: 'DiscussTopic',
      component: Discuss,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/otherManage',
      name: 'OtherTopic',
      component: Other,
      meta: {
        keepAlive: true
      }
    },
    // 试卷管理
    {
      path: '/paperManage',
      name: 'TestPaper',
      component: Paper,
      meta: {
        keepAlive: false
      }
    },
    // 预览试卷/详情
    {
      path: '/paperDetail',
      name: 'PaperDetail',
      component: PaperDetail,
      meta: {
        keepAlive: false
      }
    },
    // 添加试卷
    {
      path: '/addPaper',
      name: 'AddPaper',
      component: AddPaper,
      meta: {
        keepAlive: false
      }
    },
    // 考试管理
    {
      path: '/examManage',
      name: 'ExamManage',
      component: Exam,
      meta: {
        keepAlive: true
      }
    },
    // 成绩管理
    {
      path: '/scoreManage',
      name: 'ScoreManage',
      component: Score,
      meta: {
        keepAlive: true
      }
    },
    // 成绩统计
    {
      path: '/scoreCount',
      name: 'ScoreCount',
      component: ScoreCount,
      meta: {
        keepAlive: true
      }
    },
    // 个人中心
    {
      path: '/infoManage',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        keepAlive: false
      }
    }
  ]
})
