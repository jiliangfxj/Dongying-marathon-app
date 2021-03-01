class typeDetail {
  constructor(value, displayName) {
    this.value = value;
    this.displayName = displayName;
  }
}

var eventType = {
  date: 0,
  tick: 1,

  properties: {
    0: new typeDetail(0, '日期'),
    1: new typeDetail(1, '次数'),
  },

  get allTypes() {
    // Donot support per-day for now.
    return [this.properties[0], this.properties[1]];
  }
}

module.exports = { eventType: eventType }