'use strict';

var mongoose 		= require('mongoose');

var homeworkSchema 	= mongoose.Schema({
    homeworkName: {type: String},
	url: {type: String},
	remark: {type: String},
	fileUrl: {type: String},
	deadline: {type: Date},
	setupTime: {type: Date},
});

homeworkSchema.statics = {
	fillDoc: function (document, bodyReq, callback) {
		console.log(this.schema.paths);
		for (var field in this.schema.paths) {
			if(field !== '_id' && field !== '_v' && bodyReq[field] !== undefined) {
				document[field] = bodyReq[field];
			}
		}
		document.save(callback);
	}
};

mongoose.model('Homework', homeworkSchema);
