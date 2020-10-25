var util = require("../../utils/util");//使用内置的utils获取时间
const app = getApp()
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()

Page({
//页面的初始数据
  data: {
    item:[],
    input: ""
  },
//保存数据函数
  save:function(e){
    wx.setStorageSync('item', this.data.item);
  },
//获取缓存数据
  loadData:function(e){
    var info = wx.getStorageSync('item');
      if(info){
        this.setData({
          item:info
        });
  }},
//获取输入框值
  addinput:function(e){
    this.setData({
      input:e.detail.value
    });
  },
  //添加一条记事
  send:function(e){
    var newitem = this.data.item;
    var nowtime = util.formatTime(new Date());
    var msg = this.data.input
    if(this.data.input == ""){
      wx.showModal({
        title:"提示",
        content:"请输入内容"
      })
    }else{
    newitem.push({
      iteminfo:msg,
      itemtime:nowtime,
      itemname:app.globalData.userInfo.nickName,
      itemimg:app.globalData.userInfo.avatarUrl
    })
    this.setData({
      item:newitem,
      input:"",
    });
//更新数据
    this.save();
//上传数据库
    wx.cloud.callFunction({
      name:"update_msg",
      data:{
        up:true,
        nowtime:nowtime,
        username:app.globalData.userInfo.nickName,
        headimg:app.globalData.userInfo.avatarUrl,
        message:msg
      },
      success:res=>{
        console.log("已上传")
    }})
  }
},
//删除一条记事
  close:function(e){
    var info = this.data.item;
    var index = e.currentTarget.id;//获取所选中的item的id
    info.splice(index,1);//使用数组的splice方法删除
    this.setData({
      item:info
    });
    this.save();
  },
//清空
  alldel:function(e){
    var info = this.data.item;
    info.splice(0,info.length);
    this.setData({
      item:info
    });
    this.save();
  },
//刷新
  restore:function(e){
    this.onLoad()
  },
  
//生命周期函数--监听页面加载
  onLoad: function (options) {
    var newitem = this.data.item;
    wx.cloud.callFunction({//尝试从云端获取用户信息
      name:"get_set_UserInfo",
      data:{
          getSelf:true
        },
      success:res=>{
       console.log("已自动登录")//如果成功获取，将信息写入全局变量
        app.globalData.userID = res.result.data._id
        app.globalData.userInfo = res.result.data.userData
        },
      fail:err=>{
        wx.showModal({
          cancelColor: 'cancelColor',
          title: "提示",
          content: "请先登录"
        })
        }
      })
    this.loadData()
//获取数据库信息
    wx.cloud.callFunction({
      name:"update_msg",
      data:{
        down:true
      },
      success:res=>{
        console.log("已下载数据")
        var j = res.result.data.length-1;
        for(var i=0;i<j+1;i++){//遍历数据库信息并显示
        newitem.push({
          iteminfo:res.result.data[i].message,
          itemtime:res.result.data[i].time,
          itemname:res.result.data[i].username,
          itemimg:res.result.data[i].headimg
        })
        this.setData({
          item:newitem,
        });
        this.save();
      }
      if(j >= 50){
        console.log("已删除")//自动清理数据库中多余50条的早期消息
        var restime = res.result.data[49].time
        wx.cloud.callFunction({
          name:"update_msg",
          data:{
            del:true,
            restime:restime
          }
      })
      }
    },
      fail:err=>{
        console.log(err)
      }
    })
//自动删除多于50条的信息
    if(this.data.item.length >= 50){
      var info = this.data.item;
      info.splice(50,1);
      this.setData({
        item:info
      });
    this.save();
    }
  }
})
