const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

/** 
 * GET请求
 * @param url:String  require(必需) 请求地址相对路径
 * @param cb:Function  可选   成功回调函数
 */
function getReq(url, cb) {
  wx.showLoading({ title: '加载中', })
  let token = wx.getStorageSync('token') || ''
  header.Authorization = 'Barner ' + token
  console.log(url + "  is: ")
  ajax(url, header, {}, "GET", cb)
}

/** 
 * POST请求
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param cb:Function  可选   成功回调函数
 */
function postReq(url, data, cb) {
  wx.showLoading({ title: '加载中', })
  let token = wx.getStorageSync('token') || ''
  header.Authorization = 'Barner ' + token
  console.log(url + " data is: ", data)
  ajax(url, header, data, "POST", cb)
}

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param header:Object   必须  请求头参数
 * @param data:Object   可选  请求数据
 * @param method:String   可选  请求方式POST/GET
 * @param cb:Function  可选   成功回调函数
 */
function ajax(url, header, data, method, cb) {
  wx.request({
    url: url,
    header: header,
    data: data,
    method: method,
    success: function (res) {
      wx.hideLoading()
      if (res.status === 404) {
        wx.redirectTo({
          url: '/pages/404/404'
        })
      }
      console.log(url + " success res is: ", res)
      let ret = {}
      if (res.statusCode == 200) {
        ret = res.data
      } else if (res.statusCode == 500 || res.statusCode == 404) {
        wx.redirectTo({
          url: '/pages/404/404'
        })
      } else if (res.statusCode == 401) {
        wx.showToast({
          title: '登录过期，请重新登录',
          icon: 'none'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/login/studentLogin/studentLogin'
          })
        }, 1000)
      }
       else {
        ret = { "code": 9998, "msg": res.data.message ? res.data.message : "服务器重启中!" }
      }
      return typeof cb == "function" && cb(ret)
    },
    fail: function (err) {
      wx.hideLoading()
      wx.redirectTo({
        url: '/pages/404/404'
      })
      console.log(url + " fail res is: ", err)
      return typeof cb == "function" && cb({ "code": 9999, "msg": "网络错误!" })
    }
  })
}

module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
}