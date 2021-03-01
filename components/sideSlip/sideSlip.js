Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    isOpened: false, //是否已经弹出  
    animationMain: {},
  },
  properties: {
    open: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        this.setData({
          isOpened: newVal
        });
      }
    },
    autoClose: {
      type: Boolean,
      value: false,
    }
  },
  methods: {
    onAnyElementsInsideTapped: function(e) {
      if (!(e.target.id === 'sideSlip_mask') && (!this.properties.autoClose)) {
        return;
      }
      
      this.setData({
        isOpened: false
      });

      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('closed', myEventDetail, myEventOption)
    },
  }
})