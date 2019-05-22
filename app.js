//app.js
App({
  onLaunch: function (options) {
    this.hasToken()
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    }
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    wx.getSystemInfo({
      success: (res) => {
        let platform = res.platform
        if (platform === 'ios') {
          this.globalData.height = res.statusBarHeight + 44
          console.log(this.globalData.height)
        } else if (platform === 'android'){
          this.globalData.height = res.statusBarHeight + 48
        } else {
          this.globalData.height = res.statusBarHeight + 46
        }
      }
    })
  },

  globalData: {
    share: false,
    height: 0,
    marginTop: 50
  },
  toast (text) {
    wx.showToast({
      title: text,
      duration: 2000,
      icon: "none"
    })
  },
  hasToken: function () {
    let token = wx.getStorageSync('token') || {}
    if (JSON.stringify(token) == '{}') {
      console.log(111)
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/studentLogin/studentLogin'
        })
      }, 100)
    }
    return token
  }
})