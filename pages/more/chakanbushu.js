//index.js
//获取应用实例
var app = getApp();

Page({
  /*-------------------------------------------- 数据 ----------------------------------------------*/
  data: {

    //步数列表
    stepList: {

      step: [555, 1000, 345, 657, 885, 1200, 3500],	//字符串

      barHeight: [],
      barTop: 300,
      stepTop: 20000,
      showingStepIdx: 6,	//显示步数的index
      todayStep: 621,	//今天步数
      date: ['六天前', '五天前', '四天前', '三天前', '前天', '昨天', '今天'],	//字符串

    },

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /*-------------------------------------------- 自定义函数 ----------------------------------------------*/
	/*	设置柱状图
	* */
  setGraph: function () {
    var that = this;
    that.data.stepList.step.forEach(function (item, idx) {
      var weixin_bushu = wx.getStorageSync('weixin_bushu');
      var diyitian = wx.getStorageSync('diyitian');
      var diertian = wx.getStorageSync('diertian');
      var disantian = wx.getStorageSync('disantian');
      var disitian = wx.getStorageSync('disitian');
      var diwutian = wx.getStorageSync('diwutian');
      var diliutian = wx.getStorageSync('diliutian');
      var diqitian = wx.getStorageSync('diqitian');

      that.data.stepList.step[0] = diyitian;
      that.data.stepList.step[1] = diertian;
      that.data.stepList.step[2] = disantian;
      that.data.stepList.step[3] = disitian;
      that.data.stepList.step[4] = diwutian;
      that.data.stepList.step[5] = diliutian;
      that.data.stepList.step[6] = diqitian;
      that.data.stepList.todayStep = diqitian;


      if (item > that.data.stepList.stepTop) {	//防止超出
        that.data.stepList.barHeight[idx] = that.data.stepList.barTop;
      } else {
        var scale = that.data.stepList.barTop / that.data.stepList.stepTop;	//转换比例
        that.data.stepList.barHeight[idx] = parseInt(item * scale);
      }
    });

    that.setData({
      stepList: that.data.stepList
    });
   
  },
  /*-------------------------------------------- 绑定函数 ----------------------------------------------*/
	/*  加载完成
	 * */
  onLoad: function () {
    this.setGraph();



    if (app.globalData.userInfo) {
      this.setData({
        motto: 'hello world',
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

	/*	点击日期显示步数
	*	@param e对应的事件
	* */
  showStepTap: function (e) {
    let that = this;
    that.data.stepList.showingStepIdx = e.currentTarget.dataset.idx;	//idx:wxml中绑定的序号,显示的数据变动
    that.setData({
      stepList: that.data.stepList
    });
  }
});
