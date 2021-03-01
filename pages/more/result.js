// pages/index/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue_fen: '',
    inputValue_miao: '',
    inputValue_xinlv: '',
    fen: '',
    miao: '',
    sum: '',


    qingsongpao1: "",
    qingsongpao2: "",
    youyang: "",
    changman1: "",
    cahngman2: "",
    yunsu: "",
    changjiezou: "",
    liliangjiezou: "",
    zhongjiezou: "",
    jianxie1: "",
    jianxie2: "",
    zuida: "",
    dasbupao: "",
    duanchongfu1: "",
    duanchongfu2: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inputValue_fen = wx.getStorageSync('inputValue_fen');
    let inputValue_miao = wx.getStorageSync('inputValue_miao');
    let inputValue_xinlv = wx.getStorageSync('inputValue_xinlv');
    let fen = wx.getStorageSync('fen');
    let miao = wx.getStorageSync('miao');
    let sum = wx.getStorageSync("sum");

    this.setData({
      inputValue_fen: inputValue_fen,
      inputValue_miao: inputValue_miao,
      inputValue_xinlv: inputValue_xinlv,
      fen: fen,
      miao: miao,
      sun: sum,
      qingsongpao1: ((sum + 113.4) / 60).toFixed(2),
      qingsongpao2: ((sum + 52.8) / 60).toFixed(2),
      youyang: ((sum + 61.2) / 60).toFixed(2),
      changman1: ((sum + 61.2) / 60).toFixed(2),
      changman2: ((sum + 52.8) / 60).toFixed(2),
      yunsu: ((sum + 23.4) / 60).toFixed(2),
      changjiezou: ((sum + 15) / 60).toFixed(2),
      liliangjiezou: ((sum + 8.4) / 60).toFixed(2),
      zhongjiezou: ((sum + 4.8) / 60).toFixed(2),
      jianxie1: ((sum + 0.6) / 60).toFixed(2),
      jianxie2: ((sum - 42) / 60).toFixed(2),
      zuida: ((sum - 10.8) / 60).toFixed(2),
      dasbupao: ((sum - 42) / 60).toFixed(2),
      duanchongfu1: ((sum - 42) / 60).toFixed(2),
      duanchongfu2: ((sum - 51) / 60).toFixed(2)
    })
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})