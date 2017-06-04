//app.js
App({
  onLaunch: function () {
    console.log("onlunch")
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              wx.setStorageSync('token', res.data.token)
            }
            // success: function(res) {
            //   console.log(res.data)
            // }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null
  }
})
