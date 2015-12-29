var express = require('express');
var api = require('../public/javascripts/api');
var router = express.Router();


module.exports = function(db){
    var userManager = require('../public/javascripts/userManager')(db);

    /* GET home page. */
    router.get('/', function(req, res, next) {
        if (req.session.user && req.query.username) {
            console.log(req.query.username +" "+ req.session.user.username);
            if (req.query.username !== req.session.user.username)
                res.render('detail', { title: 'detail', user : req.session.user, error : true});
            else
                res.render('detail', { title: 'detail', user : req.session.user, error : false});
        }
        else res.redirect('/Login');
    });

    /* Login in. */
    router.get('/Login', function(req, res, next) {
      res.render('signin', { title: '登录', register : false, user : {}});
    });

    router.post('/Login', function(req, res, next) {
      userManager.findUser(req.body.username, req.body.password, res, req);
    });

    router.get('/loginout', function(req, res, next) {
        delete req.session.user;
        res.redirect('/login');
    });

    /*GET REGIST PAGE*/
    router.get('/regist', function(req, res, next) {
      res.render('signin', { title: '注册', register: true, user : {}});
    });

    /*AJAX : check unique*/
    router.post('/api/validate-unique', function(req, res, next) {
        userManager.checkUnique(req.body.value, req.body.field)
        .then(function(){
            var result = {isUnique: true};
            res.json(result);
        })
        .catch(function(err){
            var result = {isUnique: false};
            res.json(result);
        });
    });

    /*REGIST POST REQ*/
    router.post('/regist', function(req, res, next) {
        var user = req.body;
        userManager.checkUser(user, req, res)
            .then(function(user){
                return userManager.createUser(user, req, res);
            })
/*            .then(function(user){
                req.session.user = user; console.log(user);
                res.redirect('detail');
            })*/
            .catch(function(err) {
                console.log(err);
                res.render('signin', { title: '注册', register: true, user : user, error : err.errorMessages});
            });
    });

    /*ROUTER PROTECT*/
    router.all('*', function(req, res, next){
        console.log('----------safe-----');
        if (req.session.user)  next(); 
        else res.redirect('/');
    });

    /*DETAIL PAGE*/
    router.get('/detail', function(req, res, next){
        console.log(req.session.user);
        res.render('detail', { title: 'detail', user : req.session.user});
    });

    return router;
};
