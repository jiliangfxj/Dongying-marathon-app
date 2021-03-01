Page({
  data: {
    focus: false,
    inputValue: '',
    inputValue_fen: '00',
    inputValue_miao: '00',
    inputValue_xinlv: '',

    fen: '',
    miao: '',
    sum: '',
  },


  jisuan(ele) {
    this.setData({
      fen: parseInt(ele.currentTarget.dataset.fen),
      miao: parseInt(ele.currentTarget.dataset.miao),
      sum: (parseInt(ele.currentTarget.dataset.fen) * 60 + parseInt(ele.currentTarget.dataset.miao)) / 5
    })
    wx.navigateTo({
      url: '/pages/more/result'
    })
    wx.setStorageSync('inputValue_fen', this.data.inputValue_fen);
    wx.setStorageSync('inputValue_miao', this.data.inputValue_miao);
    wx.setStorageSync('inputValue_xinlv', this.data.inputValue_xinlv);
    wx.setStorageSync('fen', this.data.fen);
    wx.setStorageSync('miao', this.data.miao);
    wx.setStorageSync('sum', this.data.sum);
  },

  bindButtonTap() {
    this.setData({
      focus: true
    })
  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindKeyInput_fen(e) {
    this.setData({
      inputValue_fen: e.detail.value
    })
  },
  bindKeyInput_miao(e) {
    this.setData({
      inputValue_miao: e.detail.value
    })
  },
  bindKeyInput_xinlv(e) {
    this.setData({
      inputValue_xinlv: e.detail.value
    })
  },
  bindReplaceInput(e) {
    const value = e.detail.value
    let pos = e.detail.cursor
    if (pos != -1) {
      // 光标在中间
      const left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  }
})