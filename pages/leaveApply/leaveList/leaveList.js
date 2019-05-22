// pages/additionalClass/additionalList/additionalList.js
const app = getApp()
const api = require('../../../utils/api.js')
const http = require('../../../utils/http.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '请假申请', //导航栏 中间的标题
    },
    height: app.globalData.height, // 此页面 页面内容距最顶部的距离
    params: { // 请求参数
      page: 1,
      pageNum: 20,
      customerId: ''
    },
    additionalList: [] // 列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdditional()
  },
  // 获取附加课申请列表
  getAdditional() {
    const customerId = wx.getStorageSync('userInfo').customerId
    this.data.params.customerId = customerId
    http.postReq(api.getAdditionalList, this.data.params, res => {
      if (res.code === 0) {
        let additionalList = res.data.resultList
        additionalList.forEach(item => {
          // 将时间戳转换成不一样的格式
          item.applyTime = util.timestampFormat(item.applyTime)
        })
        this.setData({
          additionalList
        })
      } else {
        app.toast(res)
      }
    })
  },
  // 点击附加课列表去附加课详情
  go_detail(e) {
    let id = e.currentTarget.dataset.id
    let additionalClassId = e.currentTarget.dataset.additionalclassid
    wx.navigateTo({
      url: '/pages/additionalClass/additionalDetail/additionalDetail?id=' + id + '&' + 'additionalClassId=' + additionalClassId
    })
  },
  // 点击附加课申请
  applyAdditional() {
    wx.navigateTo({
      url: '/pages/additionalClass/applyAdditional/applyAdditional'
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