const { LinValidator, Rule } = require("../../core/lin-validator-v2");
const {User} = require('../models/user')

const {LoginType} = require('../lib/enum')
class PositiveIntergerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule("isInt", "需要是正整数", { min: 1 })];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "不符合 email 规范")];
    this.password1 = [
      // 用户指定范围
      new Rule("isLength", "密码至少2字符,最多32字符", { min: 2, max: 32 }),
      new Rule(
        "matches",
        "密码不符合规范",
        "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]"
      )
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule("isLength", "昵称至少2字符,最多32字符", { min: 2, max: 32 })
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 != psw2) {
      throw new Error("两次输入的密码不同");
    }
  }

  async validateEmail(vals){
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(user){
      throw new Error('邮箱已存在')
    }
  }
}

class TokenValidator extends LinValidator{
  constructor(){
    super()
    this.account = [
      new Rule('isLength', '最小2字符, 最大32字符', {min:2, max:32})
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', "至少2字符", {min: 2, max: 128})
    ]

    // type
  }

  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error('type 是必须参数')
    }
    if(!LoginType.isThisType(vals.body.type)){
      throw new Error('type 参数不合法')
    }
  }
}

class NotEmptyValidator extends LinValidator{
  constructor(){
    super()
    this.token = [
      new Rule('isLength', '不能为空', {min: 1})
    ]
  }
}

module.exports = {
  PositiveIntergerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator
};
