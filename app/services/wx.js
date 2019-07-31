const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WXManager{ 
  static async codeToToken(code){
    // code appid appsecret
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
      )
    const result = await axios.get(url)
    if(result.status !== 200){
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    const errmsg  = result.data.errmsg
    if(errcode){
      throw new global.errs.AuthFailed('openid获取失败:' + errmsg)
    }

    // openid 
    // 档案 
    let user = await User.getUserByOpenId(result.data.openid)
    if(!user){
      user = await User.registerByOpenId(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}
