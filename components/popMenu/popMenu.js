Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    isPopuped: false, //是否已经弹出  
    animationMain: {},
  },
  properties: {},
  methods: {
    //点击弹出  
    mainBtnTapped: function(e) {
      if (!this.data.isPopuped) {
        this.popup();
      } else if (this.data.isPopuped) {
        this.close();
      }
    },
    // In order to make the popMenu could be closed on this hander.
    // Donot use catchTap for all the elements inside.
    onAnyElementsInsideTapped: function(e) {
      this.close();
    },

    popup: function() {
      var animationShowItems = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease-out'
      })
      animationShowItems.opacity(1).scale(1, 1).translate(0, 0).step();
      this.setData({
        animationMain: animationShowItems.export(),
        isPopuped: true,
      });
    },

    close: function() {
      var animationHideItems = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease-in'
      })
      animationHideItems.opacity(0).scale(0, 0).translate(100, 0).step();
      this.setData({
        animationMain: animationHideItems.export(),
        isPopuped: false,
      });
    },
  },

  attached: function() {
    this.close();
  },

})