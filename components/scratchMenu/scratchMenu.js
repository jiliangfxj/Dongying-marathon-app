//pages / leftSwiperDel / index.js

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    menuWidth: {
      type: Number,
      value: 90
    }
  },
  data: {
    menuWidth: 90,//删除按钮宽度单位（rpx）
    menuTouchStartX: 0,
    txtStyle: ''
  },
  attached: function () {
    //页面初始化 options为页面跳转所带来的参数
    this.initMenuWidth();
  },

  methods: {
    touchS: function (e) {
      if (e.touches.length == 1) {
        this.setData({
          //设置触摸起始点水平方向位置
          menuTouchStartX: e.touches[0].clientX
        });
      }
    },

    touchM: function (e) {
      if (e.touches.length == 1) {
        //手指移动时水平方向位置
        var moveX = e.touches[0].clientX;
        //手指起始点位置与移动期间的差值
        var disX = this.data.menuTouchStartX - moveX;

        var menuWidth = this.data.menuWidth;

        var txtStyle = "";

        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0px";
        } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= menuWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + menuWidth + "px";
          }
        }

        //获取手指触摸的是哪一项
        //var index = e.target.dataset.index;
        //var list = this.data.list;
        //list[index].txtStyle = txtStyle;

        //更新列表的状态
        //this.setData({ list: list });
        this.setData({ txtStyle: txtStyle });
      }
    },

    touchE: function (e) {
      if (e.changedTouches.length == 1) {
        //手指移动结束后水平位置
        var endX = e.changedTouches[0].clientX;
        //触摸开始与结束，手指移动的距离
        var disX = this.data.menuTouchStartX - endX;
        var menuWidth = this.data.menuWidth;

        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = disX > menuWidth / 2 ? "left:-" + menuWidth + "px" : "left:0px";

        //获取手指触摸的是哪一项
        //var index = e.target.dataset.index;
        //var list = this.data.list;
        //list[index].txtStyle = txtStyle;

        //更新列表的状态
        this.setData({ txtStyle: txtStyle });
      }
    },

    //获取元素自适应后的实际宽度
    getScaledMenuWidth: function (w) {
      var realWidth = 0;
      try {
        var res = wx.getSystemInfoSync().windowWidth;
        var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应

        realWidth = Math.floor(res / scale);

        return realWidth;
      }
      catch (e) {
        return false;
        //Do something when catch error
      }
    },

    initMenuWidth: function () {
      var menuWidth = this.getScaledMenuWidth(this.properties.menuWidth);
      this.setData({ menuWidth: menuWidth });
    },
  }
})