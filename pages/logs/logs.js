//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: [],
    motto: "",
    userInfo: {},
    btnText: "扫码",
    account:"已预约设计师："
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  
  onLoad: function () {
    var that = this
    const token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/user/orders',
      header: {
        'Authorization': token
      },
      success: function (res) {
        console.log("获取订单: "),
          console.log(res.data),
          that.setData({
          motto: res.data.orders[0]
          })
      },
      fail: error => {
        console.log(error)
      }
    }) 

    // this.setData({
      
      // logs: (wx.getStorageSync('logs') || []).map(function (log) {
      //   return util.formatTime(new Date(log))
      // })
    // }),

      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })
  }
})




//logs.js
// var util = require('../../utils/util.js')
// Page({
//   data: {
//     logs: []
//   },
//   onLoad: function () {
//     this.setData({
//       logs: (wx.getStorageSync('logs') || []).map(function (log) {
//         return util.formatTime(new Date(log))
//       })
//     })
//   }
// })
