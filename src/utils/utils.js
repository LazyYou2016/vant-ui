export const time = (x) => {
  return x + 1
}

/**
 * @param format
 * @param currDate
 * @returns
 * 转换时间格式
 */

export const getLastDay = function (format, currDate) {
  var date = new Date()// 获取当前时间
  // var dateNow = date.setDate(date.getDate() - 1)
  var dateNow = new Date(date.setDate(date.getDate() - 1))
  var Month = dateNow.getMonth() + 1
  var Day = dateNow.getDate()
  var Y = dateNow.getFullYear() + '-'
  var M = Month < 10 ? '0' + Month + '-' : Month + '-'
  var D = Day + 1 < 10 ? '0' + Day : Day
  return Y + M + D
}

export const formatDate = function (format, currDate) {
  /*
   * eg:format="yyyy-MM-dd hh:mm:ss";
   */
  var o = {
    'M+': currDate.getMonth() + 1, // month
    'd+': currDate.getDate(), // day
    'h+': currDate.getHours(), // hour
    'm+': currDate.getMinutes(), // minute
    's+': currDate.getSeconds(), // second
    'q+': Math.floor((currDate.getMonth() + 3) / 3), // quarter
    'S': currDate.getMilliseconds()
    // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (currDate.getFullYear() + '')
      .substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/**
 * @param week
 * @returns
 * getday()数字转换星期几格式
 */
export const formatWeekday = function (week) {
  let weekday = {
    '0': '星期日',
    '1': '星期一',
    '2': '星期二',
    '3': '星期三',
    '4': '星期四',
    '5': '星期五',
    '6': '星期六'
  }
  return weekday[week]
}

export const replaceAllJson = function (str) {
  if (str != null) str = str.replace(/&quot;/g, '"')
  let dataJson = JSON.parse(str)
  return dataJson
}

// 数组转为对象 函数
export const _object = function (list, values) {
  var result = {}
  for (var i = 0; i < list.length; i++) {
    if (values) {
      result[list[i]] = values[i]
    } else {
      result[list[i][0]] = list[i][1]
    }
  }
  return result
}

/*
* JS生成某个范围的随机数
* */
// min ≤ r ≤ max
export const RandomNumBoth = function (Min, Max) {
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + Math.round(Rand * Range) // 四舍五入
  return num
}
// min ≤ r < max
export const RandomNumMin = function (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  var num = Min + Math.floor(Rand * Range) // 舍去
  return num
}
// min < r ≤ max
export const RandomNumMax = function (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  if (Math.round(Rand * Range) == 0) {
    return Min + 1
  }
  var num = Min + Math.round(Rand * Range)
  return num
}
// min < r < max
export const RandomNumNot = function (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  if (Math.round(Rand * Range) == 0) {
    return Min + 1
  } else if (Math.round(Rand * Max) == Max) {
    index++
    return Max - 1
  } else {
    var num = Min + Math.round(Rand * Range) - 1
    return num
  }
}

// j将一个数组拆分为相同长度的多个数组
export const arrSliceSameLength = function (orgArr, size) {
  size = parseInt(size)
  if (isNaN(size) || size < 1 || size >= orgArr.length) {
    return [orgArr]
  }
  let newArr = []
  for (let i = 0, len = orgArr.length; i < len; i += size) {
    newArr.push(orgArr.slice(i, i + size))
  }
  return newArr
}

// 生成uuid
export const generateUuid = function (Bit = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  var uuid = Bit.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}
