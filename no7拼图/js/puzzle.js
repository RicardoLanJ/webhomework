window.onload = function() {
    game();
};

function game() {
    var start = 0;
    var nx = 3, ny = 3, fx = [
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 0]
    ];
    var map = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ];
    var node = [{x : 0, y : 0}];
    var next_ = document.getElementById('next');
    var g = document.getElementById('game-container');
    for (var i = 1; i < 30; i += 2) {
        node.push({
            y : (i % 8 + 1) / 2, x : Math.floor(i / 8) + 1 // down x
        });
        (function(i) {
            g.childNodes[i].onclick = function() {
                // if (start === 0) return;
                var ptr = (i + 1) / 2;
                var x = node[ptr].x, y = node[ptr].y;
                for (var j = 0; j < 4; ++j) {
                    var tx = x + fx[j][0], ty = y + fx[j][1];
                    if (tx > 0 && ty > 0 && tx < 5 && ty < 5 && map[tx-1][ty-1] === 0) {
                        nx = x - 1; ny = y - 1;
                        this.className = this.className.replace(/(?:top)\d/, "top" + tx).replace(/(?:left)\d/, "left" + ty);
                        node[ptr].x = tx; node[ptr].y = ty;
                        map[tx-1][ty-1] = map[x-1][y-1];
                        map[x-1][y-1] = 0;
                        iswin();
                    }
                }

            };
        })(i)
    }
    document.getElementById('refresh').onclick = function() {
        var tx, ty, ater, ni, time = 0;
        start = 1;
        if (stage === 5) {
            location.reload();
        }
        while (time < 20 || astar()) {
            do {
                f = parseInt( Math.random() * 233333 ) % 4;
                tx = nx + fx[f][0]; ty = ny + fx[f][1];
            } while(tx < 0 || ty < 0 || tx > 3 || ty > 3);
            // ni = tx * 4 + ty + 1;
            ni = map[tx][ty];
            node[ni].x = nx + 1; node[ni].y = ny + 1;
            // g.childNodes[map[tx][ty]].className = g.childNodes[map[tx][ty]].className.replace(/(?:top)\d/, "top" + node[ni].x).replace(/(?:left)\d/, "left" + node[ni].y);
            map[nx][ny] = ni;
            map[tx][ty] = 0;
            nx = tx;
            ny = ty;
            time++;
        }
        for (var i = 1, j = 1; i < 16; i++, j += 2) {
            var it = g.childNodes[j];
            it.className = it.className.replace(/(?:top)\d/, "top" + node[i].x).replace(/(?:left)\d/, "left" + node[i].y).replace(/\swin/, '');
        }
        g.className = g.className.replace(/\sgwin.*/, '');
        if (!cover.className.match(/unvis/)) cover.className += " unvis";
    };
    var astar = function() {
        var r = 0;
        for (var i = 1, j = 0, k = 0; i < 16; ++i, j %= 4) {
            r += i * map[k][j];
            j++;
            k = (j === 4)? k+1 : k;
        } // 1240
        if (r > 1000) return true;
        else return false;
    };
    var iswin = function() {
        var r = 0;
        for (var i = 1, j = 0, k = 0; i < 16; ++i, j %= 4) {
            r += i * map[k][j];
            j++;
            k = (j === 4)? k+1 : k;
        } // 1240
        if (r === 1240) {
            showmethemoney();
            start = 0;
        }
    };
    var showmethemoney = function() {
        // if (start === 0) return;
        g.className += " gwin";
        for (var i = 1; i < 30; i += 2) {
            g.childNodes[i].className += " win";
        }
        next_.className = next_.className.replace(/\sunvis/, '');
        cover.className = cover.className.replace(/\sunvis/, '');
    };
    var stage = 1, tt = ["第二关: one punch man", "第三关: 美日非三人组", "第四关: 江可泽民， 亦可赛艇<del>exciting!</del>", "Game over"];
    next_.onclick = function() {
        stage++;
        olink = document.getElementById('picLink');
        olink.href = stage !== 5? "css/picture" + stage + ".css" : "###";
        g.className = g.className.replace(/\sgwin.*/, '');
        for (var i = 1, j = 1; i < 16; i++, j += 2) {
            var it = g.childNodes[j];
            it.className = it.className.replace(/\swin/, '');
        }
        next_.className += " unvis";
        cover.className += " unvis";
        title.innerHTML = title.innerHTML.replace(/.*/, tt[stage - 2]);
    };
}
