const wxStorageMgr = require('wxStorageManager.js');
const eventModelFac = require('../models/eventModelFactory.js');
const util = require('util.js');

const storageKeyRecyclebin = 'recycleBin';
const maxDaysReserve = 7;

class recycleItem {
  // the meaning of dataType:
  // 0: construct from a eventModel item;
  // 1: construct from local data;
  constructor(data, dataType) {
    switch (dataType) {
      case 0:
        this.originalItem = data;
        this.deleteTime = new Date();
        break;
      case 1:
        this.originalItem = new eventModelFac.create(data.originalItem);
        this.deleteTime = data.deleteTime;
        break;
    }

    var deletedDaysPassed = util.diffDays(this.deleteTime, new Date());
    
    if (deletedDaysPassed < 0) {
      this.daysReserve = deletedDaysPassed - maxDaysReserve;
    } else {
      this.daysReserve = maxDaysReserve - deletedDaysPassed;
    }
  }

  get isItemReadyToWash() {
    return this.daysReserve < 0;
  }
}

const insertItem = function(item) {
  wxStorageMgr.insertItem(storageKeyRecyclebin, new recycleItem(item, 0));
}

const getAllDeletedItems = function() {
  var data = wxStorageMgr.getDataFromStorageSync(storageKeyRecyclebin);
  if (!data) return [];

  var items = [];
  for (var i in data) {
    items.push(new recycleItem(data[i], 1));
  }

  return items.sort((a, b) => {
    return a.deleteTime > b.deleteTime;
  });
}

const deleteItem = function(item) {
  wxStorageMgr.deleteItem(storageKeyRecyclebin, (e) => {
    return e.originalItem.id === item.originalItem.id;
  });
}

// #region washRecycleBin
const storageKeyLastTimeWashRecycleBin = 'LastTimeWashRecycleBin';
const daysIntervalToWash = 1;
const washRecycleBin = function() {
  var lastTime = wxStorageMgr.getDataFromStorageSync(storageKeyLastTimeWashRecycleBin);
  if (lastTime) {
    var daysFromLastTime = util.diffDays(lastTime, new Date());
    if (daysFromLastTime < daysIntervalToWash) {
      return;
    }
  }

  // start to wash
  var allRecycleItems = getAllDeletedItems();
  if (!allRecycleItems || allRecycleItems.length < 1) {
    return;
  }
  var itemsContinueReserve = [];
  for (var i in allRecycleItems) {
    if (!allRecycleItems[i].isItemReadyToWash) {
      itemsContinueReserve.push(allRecycleItems[i]);
    }
  }
  wxStorageMgr.setDataToStorageSync(storageKeyRecyclebin, itemsContinueReserve);
  wxStorageMgr.setDataToStorageSync(storageKeyLastTimeWashRecycleBin, new Date());
}
// #endregion

module.exports = {
  maxDaysReserve,
  insertItem,
  getAllDeletedItems,
  deleteItem,
  washRecycleBin
}