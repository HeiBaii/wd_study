const app = getApp()
const api = require('../../../utils/api.js')
const http = require('../../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '选择附加课班级', //导航栏 中间的标题
    },
    height: app.globalData.height, // 此页面 页面内容距最顶部的距离
    classTypeList: [], // 班型列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  // 页面初始化
  init () {
    this.setData({
      classTypeList: wx.getStorageSync('additionalIds')
    })
    this.data.classTypeList.forEach(item => {
      item.additionalClass = {
        eduClassName: '请选择附加课班级',
        eduClassId: ''
      }
      item.classShow = false // 班级列表弹窗是否显示
    })
    this.setData({
      classTypeList: this.data.classTypeList
    })
    console.log(this.data.classTypeList)
  },
  // 获取班级
  getClass (e) {
    console.log(this.data.classTypeList)
    let index = e.currentTarget.dataset.index
    this.data.classTypeList[index].classShow = true
    let id = {
      customerId: wx.getStorageSync('userInfo').customerId,
      courseCategoryId: e.currentTarget.dataset.coursecategoryid,
      classId: e.currentTarget.dataset.classid
    }
    if (this.data.classTypeList[index].additionalClass.eduClassId === '') {
      http.postReq(api.getClassList, id, res => {
        if (res.code === 0) {
          // this.data.classTypeList.forEach(cell => {
          //   console.log(cell)
          //   cell.classList = res.data
          //   cell.classList.forEach(i => {
          //     i.selected = false // 班级列表项是否选中
          //   })
          // })
          this.data.classTypeList[index].classList = res.data
          this.data.classTypeList[index].classList.selected = false
        }
        this.setData({
          classTypeList: this.data.classTypeList
        })
      })
    } else {
      this.data.classTypeList[index].classList.forEach(i => {
        if (i.id === this.data.classTypeList[index].additionalClass.eduClassId) {
          i.selected = true
        }
        this.setData({
          classTypeList: this.data.classTypeList
        })
      })
    }
  },
  // 选择班级 
  changeClass (e) {
    let index = e.currentTarget.dataset.index
    let cellindex = e.currentTarget.dataset.cellindex
    let classList = this.data.classTypeList[index].classList[cellindex]
    let additionalClass = this.data.classTypeList[index].additionalClass
    additionalClass.eduClassName = classList.className
    additionalClass.eduClassId = classList.id
    this.data.classTypeList[index].classList.forEach(item => {
      item.selected = false
    })
    classList.selected = true
    this.setData({
      classTypeList: this.data.classTypeList
    })
  },
  // 班级选择确定
  classOk (e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.data.classTypeList[index].classShow = false
    this.setData({
      classTypeList: this.data.classTypeList
    })
  },
  // 删除版型
  delClassType(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let classTypeList = that.data.classTypeList
    wx.showModal({
      title: '提示',
      content: '你确定删除该附加课班级吗',
      confirmColor: '#4573ff',
      success(res) {
        if (res.confirm) {
          classTypeList.splice(index, 1)
          that.setData({
            classTypeList: that.data.classTypeList
          })
        }
      }
    })
    this.setData({
      classTypeList: this.data.classTypeList
    })
  },
  // 关闭班级弹窗
  closeClass (e) {
    let index = e.currentTarget.dataset.index
    this.data.classTypeList[index].classShow = false
    this.setData({
      classTypeList: this.data.classTypeList
    })
  },
  // 提交附加课申请 
  submit () {
    let classTypeList = this.data.classTypeList
    let params = {}
    params.customerId = wx.getStorageSync('userInfo').customerId
    params.code = wx.getStorageSync('userInfo').account
    params.name = wx.getStorageSync('userInfo').name
    params.mobile = '12345678910'
    params.additionalClassDetailList = []
    for (let i of classTypeList) {
      if (i.additionalClass.eduClassId === '') {
        app.toast('还有附加课班级未选择')
        return
      } else {
        let eduClass = {}
        eduClass.eduClassId = i.additionalClass.eduClassId
        eduClass.eduClassName = i.additionalClass.eduClassName
        params.additionalClassDetailList.push(eduClass)
      }
    }
    http.postReq(api.commitAdditional, params, res => {
      if (res.code === 0) {
        app.toast('申请提交成功')
        setTimeout(() => {
          wx.removeStorageSync('additionalIds')
          wx.redirectTo({
            url: "/pages/additionalClass/additionalList/additionalList"
          })
        }, 1000)
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