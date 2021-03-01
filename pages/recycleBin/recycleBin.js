const eventUtil = require('../../utils/eventUtil.js')
const recycleBinMgr = require('../../utils/recycleBinManager.js');

//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    events: [],
    maxDaysReserve: recycleBinMgr.maxDaysReserve,
  },
  //事件处理函数
  onShow: function() {
    var currentPage = this;
    var eventList = recycleBinMgr.getAllDeletedItems();

    currentPage.setData({
      events: eventList,
    });
  },
  onRestoreTapped: function(e) {
    var currentPage = this;
    var recycledEventToRestore = e.currentTarget.dataset.recycleditem;
    wx.showModal({
      content: '确定恢复[' + recycledEventToRestore.originalItem.title + ']?',
      success: function(res) {
        if (res.confirm) {
          // avoid auto reserved item removed when refresh event list.
          recycledEventToRestore.originalItem.autoReserve = false;
          eventUtil.updateEvent(recycledEventToRestore.originalItem);
          recycleBinMgr.deleteItem(recycledEventToRestore);

          var eventList = recycleBinMgr.getAllDeletedItems();
          currentPage.setData({
            events: eventList,
          });

          wx.showToast({
            title: '恢复成功',
            timeout: 2000,
          });
        }
      }
    })
  }
})