const { LinValidator, Rule } = require("../../core/lin-validator");

class PositiveIntergerValidator extends LinValidator {
  constructor() {
    // super()
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
}

module.exports = {
  PositiveIntergerValidator,
  RegisterValidator
};
