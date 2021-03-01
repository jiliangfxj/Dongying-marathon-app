const wxStorageMgr = require('wxStorageManager.js');

const storageKey = 'ad-options';

class adOptions {
  constructor(data) {
    this.isVisible = data.isVisible;
  }
}

const changeVisibility = function(isVisible) {
  wxStorageMgr.setDataToStorageSync(key + keyPofixBackup, data);

  // Save the backup time.
  wxStorageMgr.setDataToStorageSync(keyLastBackupTime, new Date());
}

const getOptions = function() {
  var data = wxStorageMgr.getDataFromStorageSync(storageKey);
  if (data) {
    return new adOptions(data);
  }
  return undefined;
}

module.exports = {
  changeVisibility,
  getOptions,
}