// pages/login/codeLogin/codeLogin.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prdShow: true,
    delShow: false,
    btnColor: false,
    btnDisabled: false,
    btnValue: '获取验证码',
    phone: '',
    code: '',
    second: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getCode(e) {
    let phoneVerification = /^[1][3,4,5,7,8][0-9]{9}$/
    if (phoneVerification.test(this.data.phone)) {
      wx.request({
        url: api.sendSms,
        method: 'POST',
        data: {
          eventType: '4',
          mobile: this.data.phone
        },
        success: res => {
          console.log(res)
          wx.showToast({
            title: '验证码发送成功，请注意查收！',
            icon: 'none'
          })
          this.timer()
        }
      })
      
    } else {
      wx.showToast({
        title: '手机号码格式不正确，请重新输入！',
        icon: 'none'
      })
    }
  },
  /**
   * 倒计时
   */
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + 's后重试',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  /**
   * 手机输入事件
   */
  bindPhoneInput(e) {
    let val = e.detail.value
    this.setData({
      phone: e.detail.value
    })
    this.isBtnColor()
  },
  /**
   * 验证码输入事件
   */
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
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
      code: '',
      delShow: false
    })
    this.isBtnColor()
  },
  /**
   * 判断form是否验证通过，改变登录按钮颜色
   */
  isBtnColor() {
    if (this.data.phone && this.data.code) {
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
   */
  submit() {
    wx.request({
      url: api.login,
      data: {
        "account": this.data.phone, //账号
        "smsCode": this.data.code, //登录密码
        "passportType": "2", //登录方式（1=用户+密码登录，2=手机号+短信验证码登录，3=邮箱+密码登录）
      },
      method: "POST",
      success: res => {
        console.log(res)
        let msg = res.data.msg
        let code = res.data.code
        if (code === '0') {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if (code === '1') {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
        } else if (code === '9000') {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
          this.emptyPrd()
        }
      }
    })
  },
  /**
   * 隐私保护政策
   */
  goAgreement () {
    
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