var fs = require('fs');

function returnFile(response, url, ext, html, repeat) {
    fs.readFile(url, function(err, file) {
        if (err) {log(err); return;}
        response.writeHead(200, {
            "Content-Type": "text/" + ext,
            "charset": "utf-8"
        });
        response.write(file);
        if (repeat !== "") wp(repeat, response); 
        if (html) response.write("</body></html>");
        response.end();
        log("return "+ ext+ " file...success");
    });
}

function wp (repeat, response) {
    response.write("<p class=\"repeatinfo\">");
    response.write(repeat + " 重复了呀~");
    response.write("</p>");
}

function returnImage(response, url, ext) {
    fs.readFile(url, function(err, image) {
        if (err) log(err);
        response.writeHead(200, {
            "Content-Type": "image/ext",
        });
        response.end(image, 'binary');
        log("return "+ ext+ " file...success");
    });
}

function return404 (response) {
    response.writeHead(404, {"Content-Type":"text/html"});
    response.write(
    "<head></head>" +
    "<body> " +
        "<img src=\"./git404.png\" style=\"display: block; width:927px; height:342px; margin:auto; position: relative;\"> " +
    "</body>");
    response.end();
    log("return 404...success");
}

function returnQuery (response, json, statu) {
    response.writeHead(statu, {"Content-Type":"text/html"});
    response.write(
        "<head>" +
            "<meta http-equiv=\"Content-type\" content=\"text/html; charset = utf-8\">" + 
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"404.css\">" +
        "</head>" +
        "<body>" +
            "<div>" +
                "<p>用户信息</p>" + 
                "<ul>" + 
                "<li>用户名: " + json.userName+ "</li>" +
                "<li>学号: " + json.stuId + "</li>" +
                "<li>电话: " + json.phone +"</li>" +
                "<li>邮箱: " + json.email + "</li>" + 
            "</dv>" +
        "</body>"
    );
    response.end();
}

function dealData(postdata, response, qy) {
    var newjson = qy.parse(postdata);
    chaxun(newjson, './userdata/userinfo.txt', response);
}

function chaxun (newjson, url, response) { //'./userdata/userinfo.txt'
    fs.exists(url, function(exist) {
        if (!exist) {log("not exist file "); return;}
        fs.readFile(url, "utf-8", function(err, file) {
            if (err) {log(err); return;}
            var alljson = JSON.parse(file);
            var whatrepeat = isrepeat(alljson, newjson);
            if (whatrepeat === "") {alljson.push(newjson); save(alljson, url, response, alljson.length - 1);}
            else returnDateRepeat(response, whatrepeat);
        });
    });
}

function searchUser (json, username) {
    for (var i = 0; i < json.length; ++i) if (json[i].userName === username) return i;
    return -1;
}

function isrepeat (json, newjson) {
    var result = "";
    for (var i = 0; i < json.length; ++i) {
        if (json[i].userName === newjson.userName) result += "用户名 ";
        if (json[i].stuId === newjson.stuId) result += "学号 ";
        if (json[i].phone === newjson.phone) result += "电话 ";
        if (json[i].email === newjson.email) result += "邮箱 ";
    }
    return result;
}

function save (alljson, url, response, index) {
    fs.writeFile(url, JSON.stringify(alljson), function(){
        returnQuery(response, alljson[index], 302);
    });
}

function returnDateRepeat (response, whatrepeat) {
    returnFile(response, "./html/index.html", "html", true, whatrepeat);
}

function returnQuerypage (response, username, url) {
    fs.exists(url, function(exist) {
        if (!exist) {log("not exist file "); return;}
        fs.readFile(url, "utf-8", function(err, file) {
            if (err) {log(err); return;}
            var alljson = JSON.parse(file), index = searchUser(alljson, username);
            if (index === -1) /*return404(response);*/ {response.writeHead(302, {location:'./'}); response.end();}
            else returnQuery(response, alljson[index], 200);
        });
    });
} 

exports.returnFile = returnFile;
exports.returnImage = returnImage;
exports.return404 = return404;
exports.returnQuerypage = returnQuerypage;
exports.dealData = dealData;

function log(str) {
    console.log(str);
}
