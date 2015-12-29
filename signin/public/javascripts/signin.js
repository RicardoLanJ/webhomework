$(function() {
    $('#ToRegister').click(function(){
        window.location.href = '/regist';
    });
    $('#submit').click(function(){
        if ($('#username').val() === "") {
            $('#username').parent().find('.errorAndTip').text('用户名不能为空').show();
            return false;
        }  else if ($('#password').val() === "") {
            $('#username').parent().find('.errorAndTip').text('密码不能为空').show();
            return false;
        }
    });
    rungif();
});

function rungif () {
    var x = ['0%', '25%', '50%', '75%'], c = 0;
    setInterval(function(){
        $('#gif').css('background-position', x[c++] + ' 0%');
        c %= 4;
    }, 1000);
}