'use strict';

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Model= mongoose.model('Homework');

module.exports = function (isLoggedIn) {
	router.get('/', isLoggedIn, function(req, res) {
		Model.find(function(err, data) {
			console.log('getalldata: ');
			console.log(data);
			if (err) {
				return res.status(500).send(err);
			}
			if (data.length === 0) {
				return res.send('0');
			}
			return res.status(200).send(data);
		});
	});

	router.post('/create', isLoggedIn, function(req, res) {
		var newData = new Model();
	console.log(req.body);
		Model.find({homeworkName : req.body.homeworkName}, function(err, data) {
			console.log('data:' + data);
			if (err) {
				return res.status(500).send(err);
			}
			if (data.length !== 0) {
				return res.send('it existed');
			}
			Model.fillDoc(newData, req.body, function(err, data) {
				if(err) {
					return res.status(500).send(err);
				}
				console.log('ok----------');
				return res.status(200);
			});

		});
	});

	router.put('/:id', isLoggedIn, function (req, res) {
		console.log('----------------------------------------update');
		Model.findById(req.params.id, function (err, data) {
			if (err) {
				return res.status(500).send(err);
			}
			if (!data) {
				return res.status(404).end();
			}
			Model.fillDoc(data, req.body, function (err) {
				if (err) {
					return res.status(500).send(err);
				}
				return res.status(200).send(data);
			});
		});
	});	

	router.delete('/:id', isLoggedIn, function (req, res) {
		Model.findById(req.params.id, function (err, data) {
			if (err) {
				return res.status(500).send(err);
			}
			if (!data) {
				return res.status(404).end();
			}
			data.remove(function (err) {
				if (err) {
					return res.status(500).send(err);
				}
				return res.status(200).end();
			});				
		});
	});	

	return router;
};