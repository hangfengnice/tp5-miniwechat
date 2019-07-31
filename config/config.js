
module.exports = {

  environment: 'dev',
  database: {
    dbName: 'hangfeng',
    host: 'localhost',
    port: 3306,
    user: "root",
    password: '1'
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60*60*24*30
  },
  wx: {
    appId: 'wx08f0230bc38d7411',
    appSecret: "7822001a6a0a1bac897c95e55a6b65d7",
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}