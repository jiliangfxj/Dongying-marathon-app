const util = require('util.js')
const mdLoop = require('../models/eventLoopMode.js')
const eventType = require('../models/eventType.js')
const mdDisplay = require('../models/loopedDateEventDisplayMode.js');
const eventModel = require('../models/eventModel.js');
const eventFac = require('../models/eventModelFactory.js');
const wxStorageMgr = require('wxStorageManager.js');
const recycleBinMgr = require('recycleBinManager.js');

const storageKeyEvents = 'events';

var eventList = undefined;
var saveToLocal = function() {
  wxStorageMgr.setDataToStorageSync(storageKeyEvents, eventList);
}
var findEvent = function(id) {
  return eventList.find((e) => {
    return e.id === id
  });
}
const updateEvent = (data) => {
  if (data.autoReserve && data.isCompleted) {
    wipeEvent(data);
    return;
  }

  if (eventList === undefined) {
    getEventList();
  }
  wxStorageMgr.updateItem(storageKeyEvents, data, (e) => {
    return e.id === data.id
  });

  // Update cached event list.
  var exsitedIndex = eventList.findIndex((e) => {
    return e.id === data.id
  });
  if (exsitedIndex < 0) {
    eventList.unshift(data);
  } else {
    eventList[exsitedIndex] = data;
  }
  eventList = eventList.sort(sortEvent);
}

const wipeEvent = (data) => {
  recycleBinMgr.insertItem(data);

  wxStorageMgr.deleteItem(storageKeyEvents, (e) => {
    return e.id === data.id
  });

  for (var i = 0; i < eventList.length; i++) {
    if (eventList[i].id == data.id) {
      eventList.splice(i, 1);
      break;
    }
  }
}
const getEvent = (id) => {
  if (eventList === undefined) {
    getEventList();
  }

  return eventList.find((e) => {
    return e.id === id
  });
}

const getEventList = () => {
  // Load from memory
  if (eventList !== undefined) {
    var completedEventIdx = eventList.findIndex((event) => {
      return event.autoReserve && event.isCompleted
    });
    while (completedEventIdx >= 0) {
      eventList.splice(completedEventIdx, 1);
      completedEventIdx = eventList.findIndex((event) => {
        return event.autoReserve && event.isCompleted
      });
    }

    if (completedEventIdx.length > 0) {
      saveToLocal();
    }

    return eventList;
  }

  // Load from local
  var datas = wxStorageMgr.getDataFromStorageSync(storageKeyEvents);

  return buildEventListFromStorage(datas);
}

function buildEventListFromStorage(data) {
  eventList = [];
  for (var i in data) {
    var event = eventFac.create(data[i]);

    // Auto remove events that set to autoreserve.
    if (event.autoReserve && event.isCompleted) {
      wipeEvent(event);
      continue;
    }

    eventList.push(event);
  }
  return eventList.sort(sortEvent);
}

function sortEvent(a, b) {
  if (a.typeId != b.typeId) {
    return a.typeId > b.typeId;
  } else if (a.typeId == eventType.eventType.date) {
    return a.endDays > b.endDays;
  } else if (a.typeId == eventType.eventType.tick) {
    return (a.endTicks - a.tickList.length) > (b.endTicks - b.tickList.length);
  }
}

module.exports = {
  updateEvent,
  wipeEvent,
  getEventList,
  getEvent,
}