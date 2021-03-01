//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  xunlianpeisu:function(param){
    wx.navigateTo({
      url: '/pages/more/xunlianpeisu',
    })
  },

  lianxiwomen:function(parm){
    wx.navigateTo({
      url: '/pages/more/lianxiwomen',
    })
  },
 
  gengduosaishi:function(param){
    wx.navigateTo({
      url: '/pages/more/gengduosaishi',
    })
  },
  chakanbushu:function(param){
    wx.navigateTo({
      url: '/pages/more/chakanbushu',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function (res) {
    if (res.from == 'button') {

    }
    return {
      title: '东营马拉松running',
      path: '/pages/more/more',
      imageUrl: '../../images/paoliang.jpg'
    }
  }
})