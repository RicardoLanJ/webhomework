var myDate = new Date();
console.log("GN-Drive startup...[100%] "  + myDate.toLocaleString());

var http = require('http');
var fs = require('fs');
var hd = require('./handler');
var path = require('path');
var URL = require('url');
var qy = require('querystring');



var server = http.createServer(makehttp);
server.listen(8000);

function makehttp(request, response) {
    log("-----------");
    log("request: " + request.url);
    var url = URL.parse(request.url).pathname, ext = path.extname(url).substring(1);
    var qys = URL.parse(request.url).query, qyo = qy.parse(qys);
    if (request.method === "GET") {
        log("GET request");
        if (qyo.username !== undefined) {
            log("query user: " + qyo.username);
            hd.returnQuerypage(response, qyo.username, './userdata/userinfo.txt');
        }  else if (url === "/") {
            log("send index");
            hd.returnFile(response, "./html/index.html", "html", true, "");
        }  else if (ext === "ico" || ext === "png" || ext === "jpg") {
            log("send image: " + ext);
            hd.returnImage(response, "./images" + url, ext);
        }  else if (ext === "css" || ext === "js") {
            log("send " + ext + " file");
            hd.returnFile(response, "./" + ext + "/" + url, ext, false, "");
        }  else {
            log("send 404");
            hd.return404(response);
        }
    }  else if (request.method === "POST") {
        log("POST request");
        var result = "";
        request.addListener('data', function(data) {
            result += data;
        });
        request.addListener('end', function() {
            hd.dealData(result, response, qy);
        });
    }
}

function log (str) {
    console.log(str);
}