const utils = (function () {
  return {
    getFormatDate: getFormatDate,
    getTableData: getTableData
  }
  // 获取当前时间
  function getFormatDate () {
    var date = new Date()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    if (date.getMinutes() >= 0 && date.getMinutes() <= 9) {
      minutes = '0' + date.getMinutes()
    }
    if (date.getSeconds() >= 0 && date.getSeconds() <= 9) {
      seconds = '0' + date.getSeconds()
    }
    var currentDate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + date.getHours() + ':' + minutes + ':' + seconds
    return currentDate
  }
  // 通过传入数据集以及页数和条数，可返回对应的数据集
  function getTableData (list, page, size) {
    let data = []
    if (list.length !== 0) {
      data = list.slice((page - 1) * size, page * size)
      // console.log(setData)
      return data
    } else {
      return data
    }
  }
})()
export default {
  install (Vue) {
    Vue.prototype.$utils = utils
  }
}
