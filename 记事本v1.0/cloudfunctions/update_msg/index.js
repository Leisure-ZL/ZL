// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.up == true){
    return await db.collection("message").add({//增加信息到数据库
      data:{
        time:event.nowtime,
        username:event.username,
        headimg:event.headimg,
        message:event.message
      }
    })
  }else if(event.down == true){//从数据库获取信息
    return await db.collection("message").get()
  }else if(event.del == true){
    return await db.collection("message").where({//删除指定信息
      time:db.command.lt(event.restime)
    }).remove() 
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}