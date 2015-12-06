window.onload = function() {
    shuru();
    panduan();
};

function shuru() {
    var c = 0;
    $('input[type=text]').click(function() {
        trantip(this.val);
    }).each(function(c) {
        this.val = c++;
    });
}

function panduan () {
    var format = [0, 0, 0, 0];
    $('input[type=text]').blur(function() {
        $('#tip').hide();
        if (check(this.name, this.value)) {$(this).removeClass('wrong').addClass('right'); format[this.val] = 1;}
        else {$(this).removeClass('right').addClass('wrong'); format[this.val] = 0;}
        wronginfo(format, false);
    });
    $('#reset').click(function(){
        $('input[type=text]').removeClass();
        format = [0, 0, 0, 0];
    });
    $('#myform').submit( function (e) {
        e.preventDefault();
        wronginfo(format, true);
        if (checkall(format)) this.submit();
    });
}

function checkall (format) {
    for (var i = 0; i < 4; ++i) if (format[i] === 0) {return false;}
    return true;
}

function wronginfo (format, p) {
    var info = ["用户名 ", "学号 ", "电话 ", "邮箱 "], r = "", $t = $('input[type=text]');
    for (var i = 0; i < 4; ++i) if (!format[i] && ($t[i].value !== "" || p)) r += info[i];
    if (r === "") $('#info').hide();
    else {$('#info').html(r + "格式不正确哟~").show();}
}

function trantip(v) {
    var a = [
        "用户名6~18位英文字母、数字或下划线，必须以英文字母开头",
        "学号8位数字，不能以0开头",
        "电话11位数字，不能以0开头", 
        "邮箱注意格式"];
    $('#tip')
    .removeClass()
    .addClass("t" + v)
    .html(a[v])
    .show();
}

function check (name, str) {
    switch (name) {
        case "userName":
            return str.match(/^[a-zA-Z][a-zA-Z\d_]{5,17}$/);
        case "stuId" :
            return str.match(/^[1-9]\d{7}$/);
        case "phone" :
            return str.match(/^[1-9]\d{10}$/);
        case "email" :
            return str.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
    }
}
