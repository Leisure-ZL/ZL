var util = require("../../utils/util");//使用内置的utils获取时间
Page({
  //页面的初始数据
  data: {
    pritem:[],
    input: ""
  },
  //保存数据函数
  save:function(e){
    wx.setStorageSync('pritem', this.data.pritem);
  },
  //获取缓存数据
  loadData:function(e){
    var info = wx.getStorageSync('pritem');
      if(info){
        this.setData({
          pritem:info
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
    var newitem = this.data.pritem;
    var nowtime = util.formatTime(new Date());
    if(this.data.input == ""){
      wx.showModal({
        title:"提示",
        content:"请输入内容"
      })
    }else{
      newitem.push({
        iteminfo:this.data.input,
        itemtime:nowtime
      })
      this.setData({
        pritem:newitem,
        input:""
    });
    //更新数据
      this.save();
    }
  },
  //删除一条记事
  close:function(e){
    var info = this.data.pritem;
    var index = e.currentTarget.id;
    info.splice(index,1);
    this.setData({
      pritem:info
    });
    this.save();
  },
  //清空
  alldel:function(e){
    var that = this;
    wx.showModal({
      title:"提示",
      content:"确定清空所有内容吗？",
      success(res){
        var info = that.data.pritem;
        if(res.confirm){
          info.splice(0,info.length);
          that.setData({
            pritem:info
            });
          that.save();
        }
      }
    })
  },
//刷新
restore:function(e){
  this.onLoad()
},
//生命周期函数--监听页面加载
  onLoad: function (options) {
    this.loadData();
    //自动删除多于50条的信息
    if(this.data.pritem.length >= 50){
      var info = this.data.pritem;
      info.splice(50,1);
      this.setData({
        pritem:info
      });
    this.save();
    }
  }
})