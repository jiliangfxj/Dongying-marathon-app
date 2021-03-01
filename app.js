//app.js

const recycleBinMgr = require('utils/recycleBinManager.js')
const adMgr = require('utils/adManager.js')
const flagMgr = require('utils/flagManager.js');

var WXBizDataCrypt = require('utils/RdWXBizDataCrypt');


App({
  globalData: {
    userInfo: null,
    iv: null,
    appId: 'wxxxxxxxxxxx',
    session_key: null,
    bushu: "",
    diyitian: 0,
    diertian: 0,
    disantian: 0,
    disitian: 0,
    diwutian: 0,
    diliutian: 0,
    diqitian: 0,
    isInShareScene: false,
    adOptions: undefined,
  },
  onLaunch: function () {


    recycleBinMgr.washRecycleBin();
    flagMgr.update();
    this.globalData.adOptions = adMgr.getOptions();
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var bushu = [];
    var bushu_length = 0;
    var dao1 = 0;
    var dao2 = 0;
    var dao3 = 0;
    var dao4 = 0;
    var dao5 = 0;
    var dao6 = 0;
    var dao7 = 0;


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var APPID = 'wx90bd297deec1aded'
          var SECRET = 'f459a161011739a951566c396fd5f55e'
          var JSCODE = res.code
          var session_key
          console.log("JSCODE " + JSCODE)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code',
            data: {
              //code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("res.data " + res.data)
              session_key = res.data.session_key
              console.log("session_key: " + session_key)
              wx.getWeRunData({
                success(res) {
                  const encryptedRunData = res.encryptedData
                  const runiv = res.iv
                  console.log("加密的数据: " + encryptedRunData)
                  //var WXBizDataCrypt = require('utils/WXBizDataCrypt')
                  var pc = new WXBizDataCrypt(APPID, session_key)
                  var tmpdata = pc.decryptData(encryptedRunData, runiv)
                  console.info('解密后data：' + JSON.stringify(tmpdata))
                  bushu = tmpdata['stepInfoList']
                  wx.setStorageSync('weixin_bushu', bushu)
                  // console.log(tmpdata['stepInfoList'])
                  bushu_length = tmpdata['stepInfoList'].length;
                  console.log('length' + bushu_length)

                  dao1 = bushu[bushu_length - 1]['step'];
                  dao2 = bushu[bushu_length - 2]['step'];
                  dao3 = bushu[bushu_length - 3]['step'];
                  dao4 = bushu[bushu_length - 4]['step'];
                  dao5 = bushu[bushu_length - 5]['step'];
                  dao6 = bushu[bushu_length - 6]['step'];
                  dao7 = bushu[bushu_length - 7]['step'];
                  wx.setStorageSync('diyitian', dao7);
                  wx.setStorageSync('diertian', dao6);
                  wx.setStorageSync('disantian', dao5);
                  wx.setStorageSync('disitian', dao4);
                  wx.setStorageSync('diwutian', dao3);
                  wx.setStorageSync('diliutian', dao2);
                  wx.setStorageSync('diqitian', dao1);
                }
              })
            }
          })
        } else {
          console.log('失败' + res.errMsg)
        }
      }
    })
    wx.setEnableDebug({
      enableDebug: true,
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              var encryptedData = res.encryptedData
              //this.globalData.iv = res.iv
              var raw_data = res.rawData
              //console.log(encryptedData)
              console.log(raw_data)
              //console.log("iv: " + this.globalData.iv)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (options) {
    this.globalData.isInShareScene =
      options.scene == 1044 ||
      options.scene == 1007 // 单人会话卡片
      ||
      options.scene == 1008; // 群组会话卡片
  },
  
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
   
  },
  
  globalData: {
    BaseData: [{
      "id": 786,
      "sex": 1,
      "content": "如果你想强壮，跑步吧！如果你想健美，跑步吧！如果你想聪明，跑步吧。",
      "zanNumber": 27
    }, {
      "id": 854,
      "sex": 1,
      "content": "You don't stop running because you get old, you get old because you stop running. 你不是因为变老而停止跑步，你是因为停止跑步才变老。",
      "zanNumber": 14
    }, {
      "id": 1022,
      "sex": 1,
      "content": "我跑步，只是跑着。原则上是在空白中跑步，也许是为了获得空白而跑步。",
      "zanNumber": 14
    }, {
      "id": 1103,
      "sex": 1,
      "content": "或许我不该仰望天空，应当将视线投去我的内部。我试着看向自己的内部，就如同窥视深深的井底。",
      "zanNumber": 10
    }, {
      "id": 1005,
      "sex": 0,
      "content": "违背了自己定下的原则，哪怕只有一次，以后就将违背更多的原则。",
      "zanNumber": 7
    }, {
      "id": 1214,
      "sex": 1,
      "content": "All I do is keep on running in my own cozy, homemade void, my own nostalgic silence. And this is a pretty wonderful thing. No matter what anybody else says. ",
      "zanNumber": 6
    }, {
      "id": 1207,
      "sex": 1,
      "content": "今天不想跑，所以才去跑，这才是长距离跑者的思维方式。",
      "zanNumber": 5
    }, {
      "id": 1227,
      "sex": 1,
      "content": "少喝酒，少抽烟，少熬夜。多跑步，多喝茶，多看书。健康是最大的本钱，平安是福，对人对己，都是。学着感恩，学着理解，学着友善。",
      "zanNumber": 4
    }, {
      "id": 1206,
      "sex": 1,
      "content": "我失恋的时候我要去跑步，因为跑步是能够把我体内多余的水分蒸发掉，那样比较不容易流泪。",
      "zanNumber": 3
    }, {
      "id": 799,
      "sex": 0,
      "content": "跑步教会我的是自律，是克制，是不放弃，是死磕到底。",
      "zanNumber": 10
    }, {
      "id": 859,
      "sex": 0,
      "content": "如果想哭，就去跑步，让泪水变成汗水蒸发掉。",
      "zanNumber": 7
    }, {
      "id": 825,
      "sex": 0,
      "content": "成长如同参加跑步比赛，看到别人比自己跑得快时并不一定会着急悲伤，唯有被同一起跑线上的人日渐超越时，才会着急悲伤",
      "zanNumber": 6
    }, {
      "id": 861,
      "sex": 0,
      "content": "每个人都有失恋的时候，而每一次我失恋，我都会去跑步，因为跑步可以将你身体里的水分蒸发掉，而让我不那么容易流泪，我怎么可以流泪呢？在阿May心目中，我可是一个很酷的男人。",
      "zanNumber": 3
    }],
    
    IconGood: '../../assets/icon-good.png',
    Avatar: '../../assets/icon-avatar.png',
    AvatarBoy: '../../assets/icon_avatar_boy.png',
    AvatarGirl: '../../assets/icon_avatar_girl.png',
    IconBoy: '../../assets/icon-boy.png',
    IconGirl: '../../assets/icon-girl.png',
    Banner: '../../assets/demo-banner.jpg',
  },
})