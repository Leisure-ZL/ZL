// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.getSelf == true){//获取用户信息
    return await db.collection("user").doc(wxContext.OPENID).field({
    openid:false
  }).get() 
}
  else if(event.setSelf == true){//添加用户信息
    return await db.collection("user").add({
      data:{
        _id:wxContext.OPENID,
        userData:event.userData
      }
    })
  }


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}