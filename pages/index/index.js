//index.js

var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    feed: [],
    feed_length: 0,
    
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
    
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
    
    })
  },
  onLoad: function () {
    console.log('onLoad')
    
  },
  goToTalkPage1: function (param) {
    wx.navigateTo({

      url: '/pages/index/ind-1',

    })
  },
  goToTalkPage2: function (param) {
    wx.navigateTo({

      url: '/pages/index/ind-2',

    })
  },
  goToTalkPage3: function (param) {
    wx.navigateTo({

      url: '/pages/index/ind-3',

    })
  },
  goToTalkPage4: function (param) {
    wx.navigateTo({

      url: '/pages/index/ind-4',

    })
  },
  goToTalkPage5: function (param) {
    wx.navigateTo({

      url: '/pages/index/ind-5',

    })
  }
 

})
