window.onload = function() {
    mouseMaze();
};

var gameStart = false, gameover = false, cheat = false;
function mouseMaze() {
    makewall();
    makeSE();
}

function makewall() {
    var w = document.getElementsByClassName('cm');
    for (var i = 0; i < w.length; ++i) {
        w[i].onmouseover = function() {
            if (gameStart) {
                this.className += " mouseover";
                gameover = true;
                gameStart = false;
                showtip("You Lose");
            }
        };
        w[i].onmouseout = function() {
            if (gameover)
                this.className = this.className.replace(/(?:^|\s)mouseover(?!\S)/ , '' );
        };
    }
}

function makeSE() {
    document.getElementById('start').onmouseover = function() {
        if (!gameStart) {
            gameStart = true;
            gameover = false;
            hidtip();
        }
    };
    document.getElementById('touch-L').onmouseover = function() {
        if (gameStart && !gameover) {
            showtip("You Win");
        }
        gameStart = false;
        gameover = false;
    };
    document.getElementById('touch-R').onmouseover = function() {
        if (gameStart) showtip("Don't cheat, you should start from the 's' and move to the 'E' inside the maze!");
        gameStart = false;
        gameover = false;
    };
}

function showtip (info) {
    var t = document.getElementById('tips');
    if (t.innerHTML !== info) {
        t.innerHTML = info;
        t.className += " showup";
    }
}

function hidtip () {
    var t = document.getElementById('tips');
    t.innerHTML = "";
    t.className = t.className.replace(/(?:^|\s)showup(?!\S)/, "");
}