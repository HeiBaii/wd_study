// pages/info/indexInfo/indexInfo.js
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
      title: '消息', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height,
    attend: '', // 上课提醒消息数
    apply: '', // 审核通知消息数
    news: '', // 消息提醒消息数
    evaluate: '', // 待办评价消息数
    evaluateWord: '', // 评价回复消息数
    hello: '你好'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initMsgNum()
  },

  // 页面初始化
  initMsgNum () {
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      customerId: userInfo.customerId,
      mobile: ''
    }
    http.postReq(api.msgNum, params, res => {
      if (res.code === 0) {
        let msgList = res.data.newsTypeCountList
        for (let i in msgList) {
          if (msgList[i].newsType === 'attend') {
            this.setData({
              attend: msgList[i].num
            })
          }
          if (msgList[i].newsType === 'apply') {
            this.setData({
              apply: Number(msgList[i].num)
            })
          }
          if (msgList[i].newsType === 'news') {
            this.setData({
              news: Number(msgList[i].num)
            })
          }
          if (msgList[i].newsType === 'evaluate') {
            this.setData({
              evaluate: Number(msgList[i].num)
            })
          }
          if (msgList[i].newsType === 'evaluate_word') {
            this.setData({
              evaluateWord: Number(msgList[i].num)
            })
          }
        }
        // console.log(this.data.attend, this.data.apply, this.data.news, this.data.evaluate, this.data.evaluateWord)
      }
    })
  },
  // 上课提醒详情页
  attendDetail  () {
    wx.navigateTo({
      url: '/pages/info/classInfo/classInfo'
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