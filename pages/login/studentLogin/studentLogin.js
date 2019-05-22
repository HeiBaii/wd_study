// pages/login/login.js
const app = getApp()
const api = require('../../../utils/api.js')
const http = require('../../../utils/http.js')
const common = require('../../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prdShow: true,
    delShow: false,
    userForm: {
      userName: '',
      password: ''
    },
    btnColor: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo') || false,
    loginInfo = wx.getStorageSync('login') || false;
    if (userInfo && loginInfo) {
      this.setData({
        userForm: {
          'userName': loginInfo.account,
          'password': loginInfo.passWord
        },
        btnColor: true
      })
      this.loginBtn()
    }
  },
  /**
   * 为眼睛添加事件，判断是否显示passwor
   */
  isPrdShow() {
    let prdShow = !this.data.prdShow
    this.setData({
      prdShow
    })
  },
  /**
   * 用户名输入事件
   */
  inputUserName(e) {
    this.setData({
      'userForm.userName': e.detail.value
    })
    this.isBtnColor()
  },
  /**
   * 密码输入事件
   */
  inputPassword(e) {
    this.setData({
      'userForm.password': e.detail.value
    })
    let valLength = e.detail.cursor
    if (valLength > 0) {
      this.setData({
        delShow: true
      })
    } else {
      this.setData({
        delShow: false
      })
    }
    this.isBtnColor()
  },
  /**
   * 清空密码框
   */
  emptyPrd() {
    this.setData({
      'userForm.password': '',
      delShow: false
    })
    this.isBtnColor()
  },
  /**
   * 判断form是否验证通过，改变登录按钮颜色
   */
  isBtnColor() {
    if (this.data.userForm.userName && this.data.userForm.password) {
      this.setData({
        btnColor: true
      })
    } else {
      this.setData({
        btnColor: false
      })
    }
  },
  /**
   * 登录 
   * 测试账号密码：102019RKQS99 
   * 测试密码：s4wbmp
   * 测试账号密码：102019DM4D6S
   * 测试密码：fdpr79
   * 102019P72YBD  nxzrbp
   */
  loginBtn() {
    let login = {
      "account": this.data.userForm.userName, //账号
      "passWord": this.data.userForm.password, //登录密码
      "passportType": "1", //登录方式（1=用户+密码登录，2=手机号+短信验证码登录，3=邮箱+密码登录）
    }
    this.login_request(login)
  },
  login_request(loginInfo) {
    http.postReq(api.login, loginInfo, res => {
      let msg = res.msg
      let code = res.code
      if (code === '0') {
        wx.setStorageSync('login', loginInfo)
        let token = res.data.accessToken
        wx.setStorageSync('token', token)
        let userInfo = res.data
        wx.setStorageSync('userInfo', userInfo)
        app.toast('登录成功')
        wx.switchTab({
          url: '/pages/index/index'
        })
      } else if (code === '1') {
        app.toast(msg)
      } else if (code === '9000') {
        app.toast(msg)
        this.emptyPrd()
        this.setData({
          'userForm.userName': ''
        })
      }
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