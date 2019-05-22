const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取当前日期的 年月日时分秒 20181117152536
function getDateYmdHis(){
  return formatTime(new Date()).replace(new RegExp('/', 'g'), '').replace(new RegExp(':', 'g'), '').replace(new RegExp(' ', 'g'), '')
}

//获取当前时间戳
function getDateTimestamp(){
  return Date.parse(new Date()) / 1000
}

//年月日时分秒 转年月日 2018-11-17
function ymdHisToYmd(timeStr) {
  return timeStr.substr(0, 4) + '-' + timeStr.substr(4, 2) + '-' + timeStr.substr(6, 2);
}

// 2019-05-05 转 201955
function y0m0dToYmd(timeStr) {
  if (timeStr.lastIndexOf == 1) {
    return timeStr.substr(0, 4) + '-' + '0' + timeStr.substr(4, 2) + '-' + timeStr.substr(6, 2);
  }
  else if (timeStr.lastIndexOf == 4) {
    
  }
}

//防止按钮被多次点击
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

//电话号码检测
function checkPhone(phone) {
  //手机号正则
  var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
  //电话
  if (!phoneReg.test(phone)) {
    //alert('请输入有效的手机号码！');
    return false;
  }
  return true;
}

/** 
 * 时间戳格式化
 * @param time:时间戳13位 ; Delimiter : 分隔符（ 例子： '-' , '/' ）
 * */

function formatDate(time, Delimiter) {
  Delimiter = Delimiter || '-';
  var now = new Date(time);
  var year = now.getFullYear() + '';
  var month = now.getMonth() + 1 + '';
  var date = now.getDate() + '';
  var hour = now.getHours() + '';
  var minute = now.getMinutes() + '';
  var second = now.getSeconds() + '';
  // 补0
  month = month.length < 2 ? '0' + month : month;
  date = date.length < 2 ? '0' + date : date;
  hour = hour.length < 2 ? '0' + hour : hour;
  minute = minute.length < 2 ? '0' + minute : minute;
  second = second.length < 2 ? '0' + second : second;
  // return year + Delimiter + month + Delimiter + date + " " + hour + ":" + minute + ":" + second;
  return year + Delimiter + month + Delimiter + date
}

// JS将时间戳转换为刚刚、N分钟前、今天几点几分、昨天几点几分等表示法
function timestampFormat(timestamp) {
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num
  }
  var curTimestamp = parseInt(new Date().getTime() / 1000)
  var timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数
  var curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000)  // 参数时间戳转换成的日期对象
  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate()
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds()
  if (timestampDiff < 60) { // 一分钟以内
    return "刚刚"
  } else if (timestampDiff < 3600) { // 一小时前之内
    return Math.floor(timestampDiff / 60) + "分钟前"
  } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
    return '今天' + zeroize(H) + ':' + zeroize(i)
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return '昨天' + zeroize(H) + ':' + zeroize(i)
    } else if (curDate.getFullYear() == Y) {
      return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i)
    } else {
      return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i)
    }
  }
}

module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  throttle: throttle,
  getDateYmdHis: getDateYmdHis,
  getDateTimestamp: getDateTimestamp,
  ymdHisToYmd: ymdHisToYmd,
  formatDate: formatDate,
  timestampFormat: timestampFormat
}
