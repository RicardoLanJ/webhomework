var bcrypt = require('bcrypt-nodejs');
var validator = require('./validator');
var _ = require('lodash');

module.exports = function(db) {
    var usersCollection = db.collection('users');

    return {
        findUser : function(username, password, res, req) {
            console.log(username + ' ' + password);
            return usersCollection.findOne({username: username})
                .then(function(user){
                    console.log(user);
                    if (user) bcrypt.compare(password, user.password, function(err, r){
                        if (r) {console.log('login success------------');
                            req.session.user = user;
                            res.redirect('detail');
                        }  else {
                            console.log('login error------------');
                            res.render('signin', {title : '登录', error : '用户名密码错误', user : {}}); //user
                        }
                    }); else {
                        console.log('login error------------');
                        res.render('signin', {title : '登录', error : '用户不存在', user : {}}); //user
                    }
                });
        },

        createUser : function(user, req, res) {
            bcrypt.hash(user.password, null, null, function(err, hash) {
                user.password = hash;
                usersCollection.insert(user);
                req.session.user = user;
                res.redirect('detail');
            });
        }, 

        checkUser : function(user) {
            var formatErrors = validator.findFormatErrors(user);
            return new Promise(function(reslove, reject){
                formatErrors ? reject(formatErrors) : reslove(user);
            }).then(function(user){
                return usersCollection.findOne(getQueryForUniqueInAttributes(user))
                    .then(function(existUser){
                        return existUser ? Promise.reject("user isn't unique") : Promise.resolve(user);
                    });
            });
        }, 
        checkUnique : function(val, field) {
            obj = {};  obj[field] = val; if (field === 'repeatPassword') return Promise.resolve();
            return usersCollection.findOne(obj).then(function(existUser){
                console.log(existUser);
                        return existUser ? Promise.reject() : Promise.resolve();
                    });
                    /*.then(function(existUser){
                        console.log(existUser);console.log('=-----------');
                        return existUser ? Promise.reject("user isn't unique") : Promise.reslove(user);
                    });*/
        }
    };

};

function getQueryForUniqueInAttributes (user) {
    return {
        $or : _(user).omit('password').omit('protocol').omit('repeatPassword').pairs().map(pairToObject).value()
    };
}

function pairToObject (pair) {
    obj = {};
    obj[pair[0]] = pair[1];
    return obj;
}
