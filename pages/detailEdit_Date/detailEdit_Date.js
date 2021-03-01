const util = require('../../utils/util.js')
const eventUtil = require('../../utils/eventUtil.js')
const mdEventType = require('../../models/eventType.js');
const mdEvent = require('../../models/eventModel.js');
const utOption = require('../../utils/optionsUtil.js');
const mdEventLoop = require('../../models/eventLoopMode.js');
const mdDisplay = require('../../models/loopedDateEventDisplayMode.js');
const dateRelatedEnums = require('../../models/dateRelatedEnums.js');
const eventFac = require('../../models/eventModelFactory.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    isNew: true,
    eventTypes: mdEventType.eventType.allTypes,
    loopModes: mdEventLoop.eventLoopMode.allModes,
    loopedEventDisplayModes: mdDisplay.loopedDateEventDisplayMode.allValues,
    unLoopModeValue: mdEventLoop.eventLoopMode.unLoop, // A const value to identify the unloop mode for wxml used to check.
    selectedDisplayModeIdx: undefined,
    detail: undefined,
    multiIndex: [0, 0, 0],
    multiArray: [mdEventLoop.eventLoopMode.allModes, [],
      []
    ]
  },

  bindMultiPickerChange: function(e) {
    var loopMode = this.data.multiArray[0][this.data.multiIndex[0]].value;
    var perWeek_weekday = this.data.multiArray[1].length > 0 ? this.data.multiArray[1][this.data.multiIndex[1]].value : undefined;
    var perMonth_date = this.data.multiArray[1].length > 0 ? this.data.multiArray[1][this.data.multiIndex[1]].value : undefined;
    var perYear_month = this.data.multiArray[1].length > 0 ? this.data.multiArray[1][this.data.multiIndex[1]].value : undefined;
    var perYear_date = this.data.multiArray[2].length > 0 ? this.data.multiArray[2][this.data.multiIndex[2]].value : undefined;

    this.data.detail.loopMode = loopMode;
    mdEvent.setLoopDetail(this.data.detail, loopMode, perWeek_weekday, perMonth_date, perYear_month, perYear_date);
    this.setData({
      multiIndex: e.detail.value,
      detail: this.data.detail,
    });

  },
 
  
  onDisplayModeChanged: function(e) {
    this.data.detail.displayMode = this.data.loopedEventDisplayModes[e.detail.value].value;
    this.setData({
      detail: this.data.detail,
      selectedDisplayModeIdx: e.detail.value
    });
  },

  onBeginDateChanged: function(e) {
    this.data.detail.beginDate = e.detail.value;
    this.setData({
      detail: this.data.detail
    });
  },

  onEndDateChanged: function(e) {
    this.data.detail.setEndDate(e.detail.value);
    this.setData({
      detail: this.data.detail
    });
  },
  onTitleChanged: function(e) {
    this.data.detail.title = e.detail.value;
    this.setData({
      detail: this.data.detail
    });
  },

  onAutoReserveChanged: function(e) {
    this.data.detail.autoReserve = e.detail.value;
    this.setData({
      detail: this.data.detail
    });
  },
  onRemarkChanged: function(e) {
    this.data.detail.remark = e.detail.value;
    this.setData({
      detail: this.data.detail
    });
  },
  onCreateBtnClicked: function(e) {
    var currentPage = this;
    if (this.data.isNew) {
      eventUtil.updateEvent(this.data.detail);
      wx.navigateBack();
    } else {
      wx.showModal({
        title: '更新确认',
        content: '确定要更新[' + currentPage.data.detail.title + ']?',
        success: function(e) {
          if (e.confirm) {
            eventUtil.updateEvent(currentPage.data.detail);
            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var eventDetail;
    var isNew = options.detail == undefined;
    var selectedDisplayModeIdx;
    var multiIndex = this.data.multiIndex;
    var multiArray = this.data.multiArray;

    // Intialize eventDetail.
    if (options.detail !== undefined) {
      eventDetail = eventFac.create(JSON.parse(options.detail));
    } else {
      eventDetail = eventFac.getDefaultEventModel(mdEventType.eventType.date);
    }

    // Intialize selectedLoopMode
    var selectedLoopModeIdx = this.data.loopModes.findIndex(function(m) {
      return m.value === eventDetail.loopMode
    });
    multiArray[0] = this.data.loopModes;
    multiIndex[0] = selectedLoopModeIdx;

    switch (eventDetail.loopMode) {
      case mdEventLoop.eventLoopMode.perWeek:
        multiArray[1] = dateRelatedEnums.weekDay.allValues;
        multiIndex[1] = dateRelatedEnums.weekDay.allValues.findIndex((v) => {
          return v.value === eventDetail.perWeek_weekday
        });
        break;
      case mdEventLoop.eventLoopMode.perMonth:
        multiArray[1] = dateRelatedEnums.monthDay.daysBig;
        multiIndex[1] = dateRelatedEnums.monthDay.daysBig.findIndex((v) => {
          return v.value === eventDetail.perMonth_date
        });
        break;
      case mdEventLoop.eventLoopMode.perYear:
        multiArray[1] = dateRelatedEnums.month.allValues;
        multiIndex[1] = dateRelatedEnums.month.allValues.findIndex((v) => {
          return v.value === eventDetail.perYear_month
        });
        var monDates = dateRelatedEnums.getMonthDays(eventDetail.perYear_month);
        multiArray[2] = monDates;
        multiIndex[2] = monDates.findIndex((v) => {
          return v.value === eventDetail.perYear_date
        });
        break;
    }

    // Intialize selectedDisplayMode.
    selectedDisplayModeIdx = this.data.loopedEventDisplayModes.findIndex(function(m) {
      return m.value === eventDetail.displayMode
    })
    this.setData({
      isNew: isNew,
      detail: eventDetail,
      selectedDisplayModeIdx: selectedDisplayModeIdx,
      multiIndex: multiIndex,
      multiArray: multiArray
    });
  },
})