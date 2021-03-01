const update = function (key, value) {
  var options = wx.getStorageSync('options') || [];
  var itemToUpdate = options.find(function (item) { return item.key === key });

  if (itemToUpdate !== undefined) {
    itemToUpdate.value = value;
  } else {
    itemToUpdate = { key: key, value: value };
    options.unshift(itemToUpdate);
  }
  wx.setStorageSync('options', options);

  return itemToUpdate;
}

const remove = function (key) {
  var options = wx.getStorageSync('options') || [];
  var exsitedItemIdx = options.findIndex(function (item) { return item.key === key });
  if (exsitedItem === undefined) {
    return;
  }
  options.splice(exsitedItemIdx, 1);
  wx.setStorageSync('events', events);
}

const fetch = function (key, dftValue) {
  var options = wx.getStorageSync('options') || [];
  var foundItem = options.find(function (item) { return item.key === key });
  if (foundItem === undefined) {
    foundItem = update(key, dftValue);
  }
  return foundItem;
}

module.exports = {
  update: update,
  remove: remove,
  fetch: fetch,
}