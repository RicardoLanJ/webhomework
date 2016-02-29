'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Remember = mongoose.model('Remember');


module.exports = function (passport) {

	router.post('/signup', passport.authenticate('local-signup', {failureFlash : true}), function (req, res) {
		console.log('rec signup');                     //delete me
		res.send(req.user);
	});


	router.post('/signin', passport.authenticate('local-signin', {failureFlash : true}), function (req, res) {
		return Remember.findOne({login: req.user.email})
			.exec(function (err, data) {
				if (err) {return res.status(500).send(err);}
				if (data) {res.cookie('remember', data.login+'#'+data.serial_id+data.token, { maxAge: 360*24*3600000 });}
				return res.send(req.user);
			});
	});


	router.get('/signedin', function (req, res) {
		// If user is logged in, passport.js will create user object in req for every request in express.js, 
		//which you can check for existence in any middleware:
		res.send(req.isAuthenticated() ? req.user : '0');
	});


	router.post('/signout', function (req, res) {
		Remember.findOne({login: req.user.email}, function (err, token) {
			if (err) {
				throw err;
			}
			if (token) {
				token.remove(function (err) {
					if (err) { throw err; }
				});
			}
			req.logOut(); //passport invoke it or use 'req.session.destroy();'?
			res.sendStatus(200);
		});
	});


//test 
	router.get('/index', function (req, res) {
		res.render('index');
	});

	router.get('/views/:name', function (req, res) {
		var name = req.params.name;
  		res.render('views/' + name);
	});

	
//test end

	return router;

};