const util = require('../../utils/util.js')
const eventUtil = require('../../utils/eventUtil.js')
const mdEventType = require('../../models/eventType.js');
const mdEvent = require('../../models/eventModel.js');
const mdEventLoop = require('../../models/eventLoopMode.js');
const eventFac = require('../../models/eventModelFactory.js');

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAppInShareScene: false,
    detail: eventFac.getDefaultEventModel(mdEventType.eventType.tick),
    // Consts to let ui compare.
    consts: {
      unLoopModeValue: mdEventLoop.eventLoopMode.unLoop,
      eventType_Date: mdEventType.eventType.date,
      eventType_Tick: mdEventType.eventType.tick,
    },
    isTickModalHidden: true,
    isTickHistoryHidden: true,
    isTodoModalHidden: true,
    loopDisplay: undefined,
    todoItemInModel: undefined,
  },

  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    });

    if (options.detailId != undefined) {
      var id = JSON.parse(options.detailId);
      this.setData({
        isNew: false,
        detail: eventUtil.getEvent(id),
      });
    } else if (options.eventData != undefined) {
      var eventDetail = eventFac.create(JSON.parse(options.eventData));
      this.setData({
        isNew: false,
        detail: eventDetail,
      });
    }

    this.setData({
      isAppInShareScene: app.globalData.isInShareScene,
    });
    if (this.data.detail.getLoopDisplay) {
      this.setData({
        loopDisplay: this.data.detail.getLoopDisplay(),
      });
    };
  },
  onHide: function(options) {
    // If in share scene, redirect to index page to avoid a shared detail page display from other non-shared scene.
    if (this.data.isAppInShareScene) {
      wx.reLaunch({
        url: '../index/index',
      });
    }
  },

  onDeleteTapped: function(e) {
    var currentPage = this;
    wx.showModal({
      title: '删除确认',
      content: '确定要删除[' + currentPage.data.detail.title + ']?',
      success: function(e) {
        if (e.confirm) {
          eventUtil.wipeEvent(currentPage.data.detail);
          wx.navigateBack();
        }
      }
    })
  },
  onEditTapped: function(e) {
    var editViewUrl_Prefix;
    var flatedEvent = util.flatObject(this.data.detail);

    if (this.data.detail.typeId === mdEventType.eventType.date) {
      editViewUrl_Prefix = '../detailEdit_Date/detailEdit_Date?detail=';
    } else if (this.data.detail.typeId === mdEventType.eventType.tick) {
      editViewUrl_Prefix = '../detailEdit_Tick/detailEdit_Tick?detail=';
    }
    wx.navigateTo({
      url: editViewUrl_Prefix + JSON.stringify(flatedEvent),
      fail: function(res) {
        wx.showToast({
          title: 'failed to open event details.',
        })
      }
    })
  },
  onTickTapped: function(e) {
    this.setData({
      isTickModalHidden: false
    });
  },
  //取消按钮  
  onTickModalCanceled: function() {
    this.setData({
      isTickModalHidden: true
    });
  },
  //确认  
  onTickModalConfirmed: function() {
    mdEvent.addTick(this.data.detail, this.tickDesc);
    eventUtil.updateEvent(this.data.detail);
    this.setData({
      detail: this.data.detail,
      isTickModalHidden: true
    });
  },
  onTickHisTapped: function(e) {
    this.setData({
      isTickHistoryHidden: false
    });
  },
  onTickHisModalConfirmed: function(e) {
    this.setData({
      isTickHistoryHidden: true
    });
  },
  onTickHisModalCanceled: function(e) {
    this.setData({
      isTickHistoryHidden: true
    });
  },

 
  
  onTodoModalCanceled: function(e) {
    this.setData({
      isTodoModalHidden: true,
    });
  },
  onTodoModalConfirmed: function(e) {
    this.data.detail.updateTodo(this.data.todoItemInModel);
    eventUtil.updateEvent(this.data.detail);
    this.setData({
      detail: this.data.detail,
      isTodoModalHidden: true,
    });
  },
  onTodoDescComfirmed: function(e) {
    this.data.todoItemInModel.title = e.detail.value;
  },

  /* this event handler triggered when ok button clicked on the phone. will not called on the debug environment. */
  onTickDescComfirmed: function(e) {
    // No need add this property into data as it no need to used to bind.
    this.tickDesc = e.detail.value;
  },
  onShareAppMessage: function(options) {
    var flatedEvent = util.flatObject(this.data.detail);
    return {
      title: "转发",
      path: "/pages/detailView/detailView?eventData=" + JSON.stringify(flatedEvent),
      success: function(res) {
        // 转发成功
      }
    }
  },
  onAddToListTapped: function(e) {
    eventUtil.updateEvent(this.data.detail);
    wx.reLaunch({
      url: '../index/index',
    });
  },
  onBackToIndexTapped: function(e) {
    wx.reLaunch({
      url: '../index/index',
    });
  },
})