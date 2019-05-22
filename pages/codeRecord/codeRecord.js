// pages/codeRecord/codeRecord.js
const app = getApp()
const api = require('../../utils/api.js')
const http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '扫码记录', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height,
    screenShow: false, // 筛选是否展开
    startDate: '请选择', // 开始时间
    endDate: '请选择', //结束时间
    isScan: false, // 扫一扫
    isMyCode: false, // 我的二维码
    isClass: false, // 上课考勤
    isGoOut: false, // 临时外出
    isMaterial: false, // 领取教材
    params: { // 请求参数
      "blurSearch": {},
      "customerId": '',
      "menuId": 0,
      "order": {},
      "page": 1,
      "pageNum": '',
      "search": {
        "startTime": '',  // 开始时间
        "endTime": '',    // 结束时间  
        "type": ''        // 类型筛选条件,英文字符的逗号分隔
      }
    },
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.postCodeRecord()
  },
  // 扫码记录查询
  postCodeRecord () {
    const customerId = wx.getStorageSync('userInfo').customerId
    this.data.params.customerId = customerId
    http.postReq(api.codeRecord, this.data.params, res => {
      if (res.code === 0) {
        this.setData({
          dataList: res.data.resultList
        })
        console.log(this.data.dataList)
        this.data.dataList.forEach(item => {
          console.log(item.time.substring(5, 7))
        })
      } else {
        app.toast(res.msg)
      }
    })
  },
  // 点击筛选
  openScreen () {
    this.setData({
      screenShow: true
    })
  },
  // 关闭筛选
  closeScreen () {
    this.setData({
      screenShow: false
    })
  },
  // 筛选确定
  screenSubmit () {
    if (this.data.startDate !== '请选择') {
      let startDate = new Date(this.data.startDate)
      let satrtTime = startDate.getTime() / 1000
      this.data.params.search.startTime = satrtTime.toString()
    }
    if (this.data.endDate !== '请选择') {
      let endDate = new Date(this.data.endDate)
      let satrtTime = endDate.getTime() / 1000
      this.data.params.search.endTime = satrtTime.toString()
    }
    let paramsArr = []
    if (this.data.isScan) {
      paramsArr.push('扫一扫')
    }
    if (this.data.isMyCode) {
      paramsArr.push('我的二维码')
    }
    if (this.data.isClass) {
      paramsArr.push('上课考勤')
    }
    if (this.data.isGoOut) {
      paramsArr.push('临时外出')
    }
    if (this.data.isMaterial) {
      paramsArr.push('领取教材')
    }
    this.data.params.search.type = paramsArr.join(',')
    this.postCodeRecord()
    this.setData({
      screenShow: false
    })
  },
  // 重置
  reset () {
    this.setData({
      startDate: '请选择',
      endDate: '请选择',
      isScan: false,
      isMyCode: false,
      isClass: false,
      isGoOut: false,
      isMaterial: false,
    })
    this.data.params.search.startTime = ''
    this.data.params.search.endTime = '' 
    this.data.params.search.type = '' 
    this.postCodeRecord()
  },
  // 开始日期选择器：
  startDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  // 结束日期选择器
  endDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  // 扫一扫
  onScan () {
    let isScan = !this.data.isScan
    this.setData({
      isScan
    })
  },
  // 我的二维码
  onMyCode() {
    let isMyCode = !this.data.isMyCode
    this.setData({
      isMyCode
    })
  },
  // 上课考勤
  onClass() {
    let isClass = !this.data.isClass
    this.setData({
      isClass
    })
  },
  // 临时外出
  onGoOut() {
    let isGoOut = !this.data.isGoOut
    this.setData({
      isGoOut
    })
  },
  // 领取教材
  onMaterial() {
    let isMaterial = !this.data.isMaterial
    this.setData({
      isMaterial
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})