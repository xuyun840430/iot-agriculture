/**
 * Confirm Dialog Module
 */
// exports.validate = function(req, res) {
//   console.log("validate!");
// };
import Formsy from 'formsy-react';
import _ from 'lodash'

const validators = {
  default: {
    regexp: '',
    message: '没有判定类型类型'
  },
  time: {
    regexp: /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/,
    message: '错误的时间格式'
  },
  decimal: {
    regexp: /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/,
    message: '请输入数字'
  },
  binary: {
    regexp: /^([0-1])*$/,
    message: '10101000'
  },
  chineseChr: {
    regexp: /[\u4e00-\u9fa5\uf900-\ufa2d]/,
    message: '请用中文填写'
  },
  version: {
    regexp: /^\d{1,2}(\.\d{1,2}){2}$/,
    message: '版本号格式：xx.xx.xx'
  },
  pluginSymbName: {
    regexp: /^[c][o][m]+(\.[p][l][u][g][i][n][s])+(\.[A-Za-z0-9]+)$/,
    message: '插件名格式：com.plugins.xxx'
  },
  email: {
    regexp:  /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
    message: '请使用合法的邮箱名称'
  },
  password: {
    regexp: /^[a-zA-Z\d_]{6,}$/,
    message: '密码长度至少6位'
  },

};

class InputValidation {

  constructor(type) {
    // Type check
    if (_.trim(type).length > 0) {
      // Create formsy validation rules
      Formsy.addValidationRule(type, (values, value) => {
        return validators[type].regexp.test(value)
      })
      this.type = type;
    } else {
      this.type = 'default'
    }
  }

  // Get validation message
  getMsg() {
    return validators[this.type].message;
  }
}

export default InputValidation;