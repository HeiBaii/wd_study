const app = getApp()
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
const util = require('../../utils/util.js')
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    lastX: 0, // 滑动开始x轴位置
    lastY: 0, // 滑动开始y轴位置
    tx: 0, // 滑动结束x轴位置
    ty: 0, // 滑动结束y轴的位置
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的课表', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height,
    isDetail: false,
    token: '',
    postData: {
      blurSearch: {},
      customerId: '',
      menuId: 0,
      order: {},
      page: 1,
      pageNum: 0,
      search: {
        date: ''
      }
    },
    dateDay: '', // 点击日期后赋值
    tapDay: '', // 点击日期后赋值
    timeTableArr: [], // 课表数组
    timeTableContent: false, // 判断今日是否有课程
    detailCon: {}, // 课程详情对象
    classSpot: []
  },
  onLoad: function () {
    this.init()
  },
  dateInit (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date()
    let year = setYear || now.getFullYear()
    let nextYear = 0
    let month = setMonth || now.getMonth() //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1)
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay() //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {}
    let num = 0
    if (month + 1 > 11) {
      nextYear = year + 1
      dayNums = new Date(nextYear, nextMonth, 0).getDate()
    }
    arrLen = startWeek + dayNums
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {}
      }
      dateArr[i] = obj
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date()
    let nowYear = nowDate.getFullYear()
    let nowMonth = nowDate.getMonth() + 1
    let nowWeek = nowDate.getDay()
    let getYear = setYear || nowYear
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth
    // 判断属于星期几的下滑线显示
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  //滑动移动事件
  handletouchmove (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    this.data.tx = currentX - this.data.lastX
    this.data.ty = currentY - this.data.lastY
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
  },
  // 滑动结束事件
  handletouchend (event) {
    //左右方向滑动
    if (Math.abs(this.data.tx) > Math.abs(this.data.ty)) {
      if (this.data.tx < 0) {
        this.nextMonth()
      }
      else if (this.data.tx > 0) {
        this.lastMonth()
      }
    }
    //上下方向滑动
    else {
      if (this.data.ty < 0) {
        this.nextMonth()
      }
      else if (this.data.ty > 0) {
        this.lastMonth()
      }
    }
    this.data.tx = 0
    this.data.ty = 0
    this.data.lastX = 0
    this.data.lastY = 0
  },
  // 下一月
  lastMonth() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  // 上一月
  nextMonth() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  // 初始化进入
  init () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
    let timeStr = new Date()
    let date = util.formatDate(timeStr, '-')
    this.data.postData.search.date = date
    this.getStudentSchedule()
    this.recentStudentSchedule()
    this.setData({
      tapDay: now.getDate(),
      dateDay: '' + year + month + now.getDate()
    })
  },
  // 点击对应日期
  dateClick(e) {
    let timeStr = e.currentTarget.dataset.clickdate
    let clickDate = util.formatDate(timeStr, '-')
    this.data.postData.search.date = clickDate
    this.getStudentSchedule()
    this.setData({
      tapDay: e.currentTarget.dataset.num,
      dateDay: e.currentTarget.dataset.date
    })
  },
  // 获取近期课表信息
  recentStudentSchedule() {
    console.log(this.data.dateArr)
    let date = new Date('201955')
    // Sun May 05 2019 08:00:00 GMT+0800 (中国标准时间)
    console.log(date)
    let params = {
      "blurSearch": {},
      "customerId": '',//学员ID
      "menuId": 0,
      "order": {},
      "page": 0,
      "pageNum": 0,
      "search": {}
    }
    params.customerId = wx.getStorageSync('userInfo').customerId
    http.postReq(api.recentStudentSchedule, params, res => {
      this.setData({
        classSpot: res.data.resultList
      })
      console.log(this.data.classSpot)
    })
  },
  // 获取我的课表信息
  getStudentSchedule () {
    const userInfo = wx.getStorageSync('userInfo')
    this.data.postData.customerId = userInfo.customerId
    http.postReq(api.getStudentSchedule, this.data.postData, res => {
      let code = res.code
      if (code === 0 && res.data.resultList.length) {
        this.setData({
          timeTableArr: res.data.resultList[0].scheduleList
        })
      } else {
        this.setData({
          timeTableArr: []
        })
      }
      if (this.data.timeTableArr.length) {
        this.setData({
          timeTableContent: true
        })
      } else {
        this.setData({
          timeTableContent: false
        })
      }
    })
  },
  // 点击课程列表项，显示对应课程详情
  courseDetail (e) {
    this.setData({
      isDetail: true
    })
    let id = {id: e.currentTarget.dataset.id}
    http.postReq(api.scheduleDetail, id, res => {
      if (res.code === 0) {
        this.setData({
          detailCon: res.data
        })
      }
    })
  },
  // 点击课程详情关闭按钮，关闭详情弹框
  closeDetail () {
    this.setData({
      isDetail: false
    })
  },
  // 点击今天
  nowDay () {
    this.init()
  },
  // 取消
  close () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})