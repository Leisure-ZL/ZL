// pages/center/center.js
const db = wx.cloud.database()
const app = getApp()
Page({

// 页面的初始数据
  data: {
    headimg:"cloud://notepad-vwmbg.6e6f-notepad-vwmbg-1302872857/icon/head.png",
    display:""
  },
  //登录与注册
login:function(e){
  wx.showLoading({
    title: '数据加载中...',
    mask:true
  })
  wx.cloud.callFunction({//尝试从云端获取用户信息
    name:"get_set_UserInfo",
    data:{
      getSelf:true
    },
    success:res=>{
     console.log("已注册")//如果成功获取，将信息写入全局变量
      app.globalData.userID = res.result.data._id
      app.globalData.userInfo = res.result.data.userData
      this.setData({
        headimg: app.globalData.userInfo.avatarUrl,
        display:"none"
      })
      wx.hideLoading()
    },
    fail:err=>{
      console.log("未注册")//未注册则调用注册方法
      this.register({
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl
      })
      wx.hideLoading()
    }
  })
},
//注册
register:function(e){
  wx.cloud.callFunction({
    name:"get_set_UserInfo",
    data:{
      setSelf:true,
      userData:e
    },
    success:res=>{
      app.globalData.userInfo = e
      app.globalData.userID = res.result._id
      this.setData({
        headimg: app.globalData.userInfo.avatarUrl,
        display:"none"
      })
    }
  })
},
//跳转页面
toHelp:function(e){
  wx.navigateTo({
    url: '/pages/help/help',
  })
},
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.cloud.callFunction({//如果已经注册直接登录
      name:"get_set_UserInfo",
      data:{
          getSelf:true
        },
      success:res=>{
       console.log("已登录")
        this.setData({
          headimg: app.globalData.userInfo.avatarUrl,
          display:"none"
        })
        }
  })
},
})