// #region general funcions
const getDataFromStorageSync = function(key) {
  return wx.getStorageSync(key);
}

const setDataToStorageSync = function(key, data) {
  wx.setStorageSync(key, data);
}
// #endregion general funcions

const insertItem = function (key, data) {
  var dataList = getDataFromStorageSync(key);
  if (!dataList) {
    dataList = [];
  } 
  
  dataList.push(data);
  setDataToStorageSync(key, dataList);
}

const deleteItem = function(key, findDelegate) {
  var dataList = getDataFromStorageSync(key);
  var itemIdx = dataList.findIndex(findDelegate);
  if (itemIdx < 0) {
    throw new Error("The item to wipe not found.");
  }

  dataList.splice(itemIdx, 1);
  setDataToStorageSync(key, dataList);
}

const updateItem = function(key, data, findDelegate) {
  var dataList = getDataFromStorageSync(key);
  if (!dataList) {
    dataList = [];
  }

  var exsitedIndex = dataList.findIndex(findDelegate);
  if (exsitedIndex < 0) {
    dataList.push(data);
  } else {
    dataList[exsitedIndex] = data;
  }

  setDataToStorageSync(key, dataList);
}

module.exports = {
  getDataFromStorageSync,
  setDataToStorageSync,
  insertItem,
  deleteItem,
  updateItem
}