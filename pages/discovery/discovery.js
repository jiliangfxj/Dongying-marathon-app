//discovery.js


const eventUtil = require('../../utils/eventUtil.js');
const mdEventLoop = require('../../models/eventLoopMode.js');
const util = require('../../utils/util.js');
const mdEventType = require('../../models/eventType.js');



const app = getApp();


const refreshStorageInfo = (options) => {
  var res = wx.getStorageInfoSync()
  options.data.storageInfo.currentSize = res.currentSize;
  options.data.storageInfo.limitSize = res.limitSize;
  options.setData(options.data);
}



// var util = require('../../utils/util.js')
Page({
  data: {

    isSideSlipOpned: false,
    storageInfo: {
      currentSize: 0,
      limitSize: 10
    },
    events: [],
    // Consts to let ui compare.
    consts: {
      unLoopModeValue: mdEventLoop.eventLoopMode.unLoop
    },
    today: util.formatDate(new Date(), 'y年M月D日 星期w'),


    navTab: ["马拉松赛事","玩在东营","比赛倒计时","喊出口号"],
    currentNavtab: "0",
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    feed: [],
    feed_length: 0,


    iconGood: app.globalData.IconGood,
    avatarBoy: app.globalData.AvatarBoy,
    avatarGirl: app.globalData.AvatarGirl,
    iconBoy: app.globalData.IconBoy,
    iconGirl: app.globalData.IconGirl,
    banner: app.globalData.Banner,
    baseData: app.globalData.BaseData,
   
    dmData: [],
    symbolLeft: '{{',
    symbolRight: '}}',
    hanchukouhao: '东营马拉松running',
  },


  onSideSlipClosed: function (e) {
    this.setData({
      isSideSlipOpned: false
    })
  },
  onSidMenuTapped: function (e) {
    this.setData({
      isSideSlipOpned: true,
    })
  },
  onReady: function () {
    refreshStorageInfo(this);
  },



  //事件处理函数
  onShow: function () {
    this.refreshEventList();
  },
  refreshEventList: function () {
    this.setData({
      events: eventUtil.getEventList()
    });
  },

  onEventItemTapped: function (e) {
    var tappedEventItem = e.currentTarget.dataset.event;
    wx.navigateTo({
      url: '../detailView/detailView?detailId=' + JSON.stringify(tappedEventItem.id),
      fail: function (res) {
        wx.showToast({
          title: 'failed to open event details.',
        })
      }
    })
  },
  onEventItemLongTapped: function (e) {
    var eventItemTapped = e.currentTarget.dataset.event;
    if (!eventItemTapped)
      return;

    var currentPage = this;

    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            var editViewUrl_Prefix;
            var flatedEvent = util.flatObject(eventItemTapped);

            if (flatedEvent.typeId === mdEventType.eventType.date) {
              editViewUrl_Prefix = '../detailEdit_Date/detailEdit_Date?detail=';
            } else if (flatedEvent.typeId === mdEventType.eventType.tick) {
              editViewUrl_Prefix = '../detailEdit_Tick/detailEdit_Tick?detail=';
            }
            wx.navigateTo({
              url: editViewUrl_Prefix + JSON.stringify(flatedEvent),
              fail: function (res) {
                wx.showToast({
                  title: 'failed to open event details.',
                })
              }
            })
            break;
          case 1:
            wx.showModal({
              title: '删除确认',
              content: '确定要删除[' + eventItemTapped.title + ']?',
              success: function (e) {
                if (e.confirm) {
                  eventUtil.wipeEvent(eventItemTapped);
                  currentPage.refreshEventList();
                }
              }
            })
            break;
        }
      }
    });
  },


  onCreateDateEventTapped: function (e) {
    wx.navigateTo({
      url: '../detailEdit_Date/detailEdit_Date'
    });
  },
  onRecycleBinTapped: function (e) {
    wx.navigateTo({
      url: '../recycleBin/recycleBin'
    });
  },





  hanchukouhao(e) {
    this.setData({
      hanchukouhao: e.detail.value
    })
  },
  // 处理弹幕位置
  setDM: function () {
    // 处理弹幕参数
    const dmArr = [];
    const _b = this.data.baseData;
    for (let i = 0; i < _b.length; i++) {
      const time = Math.floor(Math.random() * 10);
      const _time = time < 6 ? 6 + i : time + i;
      const top = Math.floor(Math.random() * 80) + 2;
      const _p = {
        id: _b[i].id,
        sex: _b[i].sex,
        content: _b[i].content,
        zanNumber: _b[i].zanNumber,
        top,
        time: _time,
      };
      dmArr.push(_p);
    }
    this.setData({
      dmData: dmArr
    });
  },
  onLoad: function () {
    console.log('onLoad');
    this.setDM();
    
  },
  goNotice: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/notice',

    })
  },
  goDownload: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/download',

    })
  },
  goResult: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/result',

    })
  },
  goSign: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/sign',

    })
  },
  xinshiji: function(param){
    wx.navigateTo({
      url: '/pages/discovery/xinshiji',
    })
  },
  ruhaikou: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/ruhaikou',

    })
  },
  sunwu: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/sunwu',

    })
  },
  richu: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/richu',

    })
  },
  daqiao: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/daqiao',

    })
  },
  jinianbei: function (param) {
    wx.navigateTo({

      url: '/pages/discovery/jinianbei',

    })
  },



  onShareAppMessage: function (res) {
    if (res.from == 'button') {

    }
    return {
      title: this.data.hanchukouhao,
      path: '/pages/index/index',
      imageUrl: '../../images/paoliang.jpg'
    }
  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },


  
});
