var validator = {
  form: {
    username: {
      chinese : "用户名",
      status: false,
      errorMessage: '6~18位英文字母、数字或下划线，必须以英文字母开头'
    }, 
    sid: {
      chinese : "学号",
      status: false,
      errorMessage: '8位数字，不能以0开头'
    },
    password : {
      status : false,
      errorMessage: '密码为6~12位数字、大小写字母、中划线、下划线'
    },
    repeatPassword : {
      status : false,
      errorMessage : '请再输入一次密码'
    },
    phone: {
      chinese : "电话",
      status: false,
      errorMessage: '11位数字，不能以0开头'
    }, 
    email: {
      chinese : "邮箱",
      status: false,
      errorMessage: '请输入合法邮箱'
    }
  }, 

  findFormatErrors : function(user) {
    var errorMessages = [];
    for (var key in user) {
      if (user.hasOwnProperty(key) && key !== 'protocol') {
        if (!this.isFieldValid(key, user[key]))
          errorMessages.push(this.form[key].errorMessage);
      }
    }
    return errorMessages.length > 0 ? new Error(errorMessages) : null;
  },

  isUsernameValid: function (username){
    return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,18}$/.test(username);
  },

  isSidValid: function (sid){
    return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
  },

  isPasswordValid: function (password){
    this.password = password;
    return this.form.password.status = /^[-_a-zA-Z\d]{6,12}$/.test(password);
  },

  isRepeatPasswordValid: function (repeatPassword){
    return this.form.repeatPassword.status = (this.password !== undefined && this.password === repeatPassword);
  },

  isPhoneValid: function (phone){
    return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
  },

  isEmailValid: function (email){
    return this.form.email.status = /^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
  },

  isFieldValid: function(fieldname, value){
    var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
    return this["is" + CapFiledname + 'Valid'](value);
  },

  isFormValid: function(){
    return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status &&
      this.form.password.status && (typeof window !== 'object' || this.form.repeatPassword.status);
  },

  getErrorMessage: function(fieldname){
    return this.form[fieldname].errorMessage;
  },

  isAttrValueUnique: function(registry, user, attr){
    for (var key in registry) {
      if (registry.hasOwnProperty(key) && registry[key][attr] == user[attr]) return false;
    }
    return true;
  },

  init : function() {
    for(var key in this.form) {
      key['status'] = false;
    }
  } 
};

if (typeof module == 'object') { // 服务端共享
  module.exports = validator;
}


