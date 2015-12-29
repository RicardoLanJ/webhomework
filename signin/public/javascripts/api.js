var validator = require ('./validator');

module.exports = {
  validateUnique: function(users, req, res){
    var mes = req.body;
    var user = {}; user[mes.field] = mes.value;
    result = validator.isAttrValueUnique(users, user, mes.field) ? 
      {isUnique: true} : {isUnique: false};
    res.json(result);
  }
};