const baseEnum = require('baseEnum.js');
const daterelatedEnums=('dateRelatedEnums.js');

var eventLoopMode = {
  unLoop: 0,
  perDay: 1,
  perWeek: 2,
  perMonth: 3,
  perYear: 4,

  properties: {
    0: new baseEnum.enumItemDetail(0, '不重复'),
    1: new baseEnum.enumItemDetail(1, '每天'),
    2: new baseEnum.enumItemDetail(2, '每周'),
    3: new baseEnum.enumItemDetail(3, '每月'),
    4: new baseEnum.enumItemDetail(4, '每年'),
  },

  get allModes() {
    // Donot support per-day for now.
    return [this.properties[0], this.properties[2], this.properties[3], this.properties[4]];
  }
}

module.exports = { eventLoopMode: eventLoopMode }