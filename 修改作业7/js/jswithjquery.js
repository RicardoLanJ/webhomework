window.onload = function() {
    game();
};

function game() {
    $('#gameover').hide();
    build_map(4, 4);
    bind();
}

function build_map (n, m) {
    var g = document.getElementById('game-container');
    $('#game-container').empty();
    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < m; ++j)
            if (i * 4 + j < 15) g.appendChild(newNode(i, j));
    }
}

function newNode (i, j) {
    var N = document.createElement('div');
    N.className += "top" + i + " left" + j + " pic" + " d" + (i*4+j);
    return N;
}

function changePic (k) {
    document.getElementById('picLink').href = "css/divide" + k + ".css";
}

function bind () {    //  < 10 line   甘中意玩 陪你玩咯 -- 非凡
    var stage = {wx : 3, wy : 3, p : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], g : 0};
    document.getElementById('game-container').onclick = (function(yidong, stage) {
        return function(event) {var s = stage; yidong(event, s);};
    })(yidong, stage);
    document.getElementById('refresh').onclick = (function(chongxinkaishi, stage) {
        return function() {var s = stage;chongxinkaishi(s);};
    })(chongxinkaishi, stage);
    document.getElementById('next').onclick = (function(nextg, stage) {
        return function() {var s = stage;nextg(s);};
    })(nextg, stage);
}

function yidong(event, s) {
    var div = event.target, nx = getXY(div.className, "top"), ny = getXY(div.className, "left"), temp, wx = s.wx, wy = s.wy;
    if (canMove(wx, wy, nx, ny)) {
        temp = s.p[wx*4+wy]; s.p[wx*4+wy] = s.p[nx*4+ny]; s.p[nx*4+ny] = temp;  // swap position table
        move(div, s.wx, s.wy); s.wx = nx; s.wy = ny;
        if (Astar(1015, s.p, 1)) if (s.g < 2) whoisyourdaddy(); else {s.g++; iamyourdaddy();}
    }
}

function chongxinkaishi(s) {
    if (s.g == 3) location.reload();
    var time = 0, fx = [[-1, 0], [1, 0], [0, 1], [0, -1]], tx = -1, ty = -1;
    while (time < 20 || !Astar(930, s.p, 0)) {  // at least 20 time and mess enough
        do {
            var f = _.random(0, 3); tx = s.wx + fx[f][0]; ty = s.wy + fx[f][1];
        } while (tx < 0 || tx > 3 || ty > 3 || ty < 0);
        move(document.getElementById('game-container').childNodes[s.p[(tx*4+ty)]], s.wx, s.wy);
        temp = s.p[tx*4+ty]; s.p[tx*4+ty] = s.p[s.wx*4+s.wy]; s.p[s.wx*4+s.wy] = temp;
        s.wx = tx; s.wy = ty; time++;
    }
}

function Astar (n, p, op) {
    for (var i = 0, r = 0; i < 15; ++i) {
        r += p[i] * i;
    }
    return op === 0? r >= n : r === n;
}

function getXY (cn, X) {
    var reg = new RegExp(".*" + X + "(\\d).*");
    return parseInt(cn.replace(reg, "$1"));
}

function canMove (wx, wy, nx, ny) {
    return ((wx === nx) && Math.abs(wy - ny) === 1) || ((ny === wy) && Math.abs(nx - wx) === 1);
}

function move (me, tx, ty) {
    me.className = me.className.replace(/top\d/, "top" + tx).replace(/left\d/, "left" + ty);
}

function whoisyourdaddy () {
    $('#next').removeClass('unvis');
}

function nextg(stage) {
    var gk = ['1: panda', '2: bilibili', '3: minions'];
    stage.g = (stage.g+1) % 3;
    $('#picLink').attr('href', "css/divide" + stage.g + ".css");
    $('#title').text(gk[stage.g]);
    $('#next').addClass('unvis');
}

function iamyourdaddy () {
    $('#next').addClass('unvis');
    $('#title').text('');
    $('#game-container').children().hide();
    $('#gameover').show();
}