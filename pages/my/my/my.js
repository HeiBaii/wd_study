// pages/my/my/my.js
const app = getApp()
const api = require('../../../utils/api.js')
const http = require('../../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height,
    userData: {},
    year: '',
    day: '',
    hour: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },

  // 获取个人信息
  getUserInfo () {
    const userInfo = wx.getStorageSync('userInfo')
    let customerId = { customerId: userInfo.customerId}
    http.postReq(api.customerDetail, customerId, res => {
      this.setData({
        userData: res.data
      })
    })
    http.postReq(api.countDown, customerId, res => {
      let time = res.data.time
      let day = parseInt(time / 60 / 60 / 24)
      let hour = parseInt(time / 60 / 60 % 24)
      this.setData({
        year: res.data.year,
        day,
        hour
      })
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