
const wxStorageMgr = require('wxStorageManager.js');
const util = require('util.js');

const storageKeyLastTimeFlagSetted = 'lastTimeFlagSetted';

var daysIntervalToUpdateFlag = 1;
export var update = function() {
  var lastTime = wxStorageMgr.getDataFromStorageSync(storageKeyLastTimeFlagSetted);
  var now = new Date();

  if (lastTime) {
    var daysFromLastTime = util.diffDays(lastTime, now);
    if (daysFromLastTime < daysIntervalToUpdateFlag) {
      return;
    }
  }

  wxStorageMgr.setDataToStorageSync(storageKeyLastTimeFlagSetted, now);
}