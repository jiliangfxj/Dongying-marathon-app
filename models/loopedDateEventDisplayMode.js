class displayModeDetail {
  constructor(value, displayName) {
    this.value = value;
    this.displayName = displayName;
  }
}

var loopedDateEventDisplayMode = {
  onlyTheNext: 0,
  all: 1,

  properties: {
    0: new displayModeDetail(0, '只显示下一个'),
    1: new displayModeDetail(1, '显示所有'),
  },

  get allValues() {
    return [this.properties[0], this.properties[1]];
  },
}

module.exports = { loopedDateEventDisplayMode: loopedDateEventDisplayMode }