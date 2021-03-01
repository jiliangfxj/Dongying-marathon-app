const baseEnum=require('baseEnum.js');

var weekDay = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wendesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,

  properties: {
    0: new baseEnum.enumItemDetail(0, '周日'),
    1: new baseEnum.enumItemDetail(1, '周一'),
    2: new baseEnum.enumItemDetail(2, '周二'),
    3: new baseEnum.enumItemDetail(3, '周三'),
    4: new baseEnum.enumItemDetail(4, '周四'),
    5: new baseEnum.enumItemDetail(5, '周五'),
    6: new baseEnum.enumItemDetail(6, '周六'),
  },

  get allValues() {
    return [this.properties[0], this.properties[1], this.properties[2], this.properties[3], this.properties[4], this.properties[5], this.properties[6]];
  }
}

var month = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,

  properties: {
    0: new baseEnum.enumItemDetail(0, '1月'),
    1: new baseEnum.enumItemDetail(1, '2月'),
    2: new baseEnum.enumItemDetail(2, '3月'),
    3: new baseEnum.enumItemDetail(3, '4月'),
    4: new baseEnum.enumItemDetail(4, '5月'),
    5: new baseEnum.enumItemDetail(5, '6月'),
    6: new baseEnum.enumItemDetail(6, '7月'),
    7: new baseEnum.enumItemDetail(7, '8月'),
    8: new baseEnum.enumItemDetail(8, '9月'),
    9: new baseEnum.enumItemDetail(9, '10月'),
    10: new baseEnum.enumItemDetail(10, '11月'),
    11: new baseEnum.enumItemDetail(11, '12月'),
  },

  get allValues() {
    return [this.properties[0], this.properties[1], this.properties[2], this.properties[3], this.properties[4], this.properties[5], this.properties[6], this.properties[7], this.properties[8], this.properties[9], this.properties[10], this.properties[11]];
  }
}

var monthDay = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  24: 24,
  25: 25,
  26: 26,
  27: 27,
  28: 28,
  29: 29,
  30: 30,
  31: 31,

  properties: {
    1: new baseEnum.enumItemDetail(1, '1号'),
    2: new baseEnum.enumItemDetail(2, '2号'),
    3: new baseEnum.enumItemDetail(3, '3号'),
    4: new baseEnum.enumItemDetail(4, '4号'),
    5: new baseEnum.enumItemDetail(5, '5号'),
    6: new baseEnum.enumItemDetail(6, '6号'),
    7: new baseEnum.enumItemDetail(7, '7号'),
    8: new baseEnum.enumItemDetail(8, '8号'),
    9: new baseEnum.enumItemDetail(9, '9号'),
    10: new baseEnum.enumItemDetail(10, '10号'),
    11: new baseEnum.enumItemDetail(11, '11号'),
    12: new baseEnum.enumItemDetail(12, '12号'),
    13: new baseEnum.enumItemDetail(13, '13号'),
    14: new baseEnum.enumItemDetail(14, '14号'),
    15: new baseEnum.enumItemDetail(15, '15号'),
    16: new baseEnum.enumItemDetail(16, '16号'),
    17: new baseEnum.enumItemDetail(17, '17号'),
    18: new baseEnum.enumItemDetail(18, '18号'),
    19: new baseEnum.enumItemDetail(19, '19号'),
    20: new baseEnum.enumItemDetail(20, '20号'),
    21: new baseEnum.enumItemDetail(21, '21号'),
    22: new baseEnum.enumItemDetail(22, '22号'),
    23: new baseEnum.enumItemDetail(23, '23号'),
    24: new baseEnum.enumItemDetail(24, '24号'),
    25: new baseEnum.enumItemDetail(25, '25号'),
    26: new baseEnum.enumItemDetail(26, '26号'),
    27: new baseEnum.enumItemDetail(27, '27号'),
    28: new baseEnum.enumItemDetail(28, '28号'),
    29: new baseEnum.enumItemDetail(29, '29号'),
    30: new baseEnum.enumItemDetail(30, '30号'),
    31: new baseEnum.enumItemDetail(31, '31号'),
  },
  // 大月
  get daysBig() {
    return [this.properties[1], this.properties[2], this.properties[3], this.properties[4], this.properties[5], this.properties[6], this.properties[7], this.properties[8], this.properties[9], this.properties[10], this.properties[11], this.properties[12], this.properties[13], this.properties[14], this.properties[15], this.properties[16], this.properties[17], this.properties[18], this.properties[19], this.properties[20], this.properties[21], this.properties[22], this.properties[23], this.properties[24], this.properties[25], this.properties[26], this.properties[27], this.properties[28], this.properties[29], this.properties[30], this.properties[31]];
  },
  // 小月
  get daysSmall() {
    return [this.properties[1], this.properties[2], this.properties[3], this.properties[4], this.properties[5], this.properties[6], this.properties[7], this.properties[8], this.properties[9], this.properties[10], this.properties[11], this.properties[12], this.properties[13], this.properties[14], this.properties[15], this.properties[16], this.properties[17], this.properties[18], this.properties[19], this.properties[20], this.properties[21], this.properties[22], this.properties[23], this.properties[24], this.properties[25], this.properties[26], this.properties[27], this.properties[28], this.properties[29], this.properties[30]];
  },
  // 二月
  get daysFeb() {
    return [this.properties[1], this.properties[2], this.properties[3], this.properties[4], this.properties[5], this.properties[6], this.properties[7], this.properties[8], this.properties[9], this.properties[10], this.properties[11], this.properties[12], this.properties[13], this.properties[14], this.properties[15], this.properties[16], this.properties[17], this.properties[18], this.properties[19], this.properties[20], this.properties[21], this.properties[22], this.properties[23], this.properties[24], this.properties[25], this.properties[26], this.properties[27], this.properties[28]];
  },

}

const getMonthDays = function(m) {
  switch (m) {
    case month.january:
    case month.march:
    case month.may:
    case month.july:
    case month.august:
    case month.october:
    case month.december:
      return monthDay.daysBig;
    case month.february:
      return monthDay.daysFeb;
    case month.april:
    case month.june:
    case month.september:
    case month.november:
      return monthDay.daysSmall;
    default:
      throw new Error('wrong month get.');
      break;
  }
}
module.exports = {
  weekDay: weekDay,
  month: month,
  monthDay: monthDay,
  getMonthDays: getMonthDays
}