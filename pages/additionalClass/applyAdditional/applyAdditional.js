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
    categoryList: [], // 科目列表
    courseCategoryId: '', // 科目ID
    checkedId: []  // 选中的班型ID集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllCourseCategory()
  },
  // 获取学员已购买科目列表
  getAllCourseCategory () {
    const customerId = {
      customerId: wx.getStorageSync('userInfo').customerId
      }
    http.postReq(api.getAllCourseCategory, customerId, res => {
      if (res.code === 0) {
        this.setData({
          categoryList: res.data
        })
        this.data.categoryList.forEach (item => {
          item.selected = false
          item.checked = false
          item.childChecked = false
        })
      }
    })
  },
  // 点击科目列表项,获取班型列表  
  changeToggle: function (e) {
    let id = {
      customerId: wx.getStorageSync('userInfo').customerId,
      courseCategoryId: e.currentTarget.dataset.id
    }
    // 存储最新展开的科目ID
    this.setData({
      courseCategoryId: id.courseCategoryId
    })
    // 获取班型列表
    http.postReq(api.getClassTypeList, id, res => {
      if (res.code === 0) {
        this.data.categoryList.forEach(item => {
          if (item.id === id.courseCategoryId) {
            res.data.forEach(item => {
              item.checked = ''
            })
            item.classTypeList = res.data
          }
        })
      }
    })
    // 判断是否展开
    setTimeout (() => {
      let index = e.currentTarget.dataset.index
      for (let i = 0; i < this.data.categoryList.length; i++) {
        if (index !== i) {
          this.data.categoryList[i].selected = false
        }
      }
      this.data.categoryList[index].selected = !this.data.categoryList[index].selected
      // 判断重新点击的科目列表的时候，班型是否选中
      if (this.data.categoryList[index].checked === true) {
        this.data.categoryList[index].classTypeList.forEach(item => {
          item.checked = true
        })
      } else {
        this.data.categoryList[index].classTypeList.forEach(item => {
          for (let x of this.data.checkedId) {
            if (item.classTypeId === x) {
              item.checked = true
            }
          }
        })
      }
      this.setData({
        categoryList: this.data.categoryList
      })
    },100)
  },
  // 全选
  checkAll (e) {
    let id = e.currentTarget.dataset.id
    this.data.categoryList.forEach(item => {
      if (item.id === id) {
        if (item.checked === false) {
          item.checked = true
          item.classTypeList.forEach(item => {
            item.checked = true
            this.setData({
              categoryList: this.data.categoryList
            })
          })
        } else {
          item.checked = false
          item.classTypeList.forEach(i => {
            i.checked = false
            this.setData({
              categoryList: this.data.categoryList
            })
          })
        }
      }
    })
  },
  // 选择班型
  checkboxChange (e) {
    let classTypeId = e.currentTarget.dataset.classtypeid
    this.data.categoryList.forEach(item => {
      if (item.id === this.data.courseCategoryId) {
        item.classTypeList.forEach(item => {
          if (item.classTypeId === classTypeId) {
            if (item.checked) {
              item.checked = false
              this.data.checkedId = this.data.checkedId.filter(x => x !== item.classTypeId)
            } else {
              item.checked = true
              this.data.checkedId.push(item.classTypeId)
            }
          }
        })
      } else {
        return
      }
    })
  },
  // 点击下一步
  next() {
    this.isChildChecked()
    let checkedIds = []
    this.data.categoryList.forEach(item => {
      console.log(item)
      if (item.childChecked) {
        for (let i of item.classTypeList) {
          if (i.checked) {
            let classTypeArr = {
              courseCategoryId: 0,
              courseCategoryName: ''
            }
            let newId = ''
            newId = JSON.parse(JSON.stringify(classTypeArr))
            newId.courseCategoryId = item.id
            newId.courseCategoryName = item.categoryName
            newId.classId = i.classTypeId
            newId.classTypeName = i.classTypeName
            checkedIds.push(newId)
          }
        }
      }
    })
    console.log(checkedIds)
    if (checkedIds.length < 1) {
      app.toast('请选择班型')
    } else {
      wx.setStorageSync('additionalIds', checkedIds)
      wx.navigateTo({
        url: '/pages/additionalClass/submitApply/submitApply'
      })
    }
  },
  // 判断子级是否有选中
  isChildChecked () {
    this.data.categoryList.forEach(item => {
      if (item.classTypeList) {
        let judge = item.classTypeList.find(i => {
          return i.checked === true
        })
        if (judge !== undefined) {
          item.childChecked = true
        } else {
          item.childChecked = false
        }
      }
    })
  },
  // 数组去重方法
  uniq (array) {
    var temp = [] //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i])
      }
    } 
    return temp
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