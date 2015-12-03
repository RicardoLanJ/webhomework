window.onload = function() {
    makemap();
    bangstart();
};

function makemap () {
    var game = document.getElementById('game-container');
    for (var i = 0; i < 60; ++i) {
        var mole = document.createElement('input');
        mole.setAttribute('type', "radio");
        mole.setAttribute('id', "themole" + i);
        mole.setAttribute('value', 0);
        mole.setAttribute('name', "mole");
        mole.className = "mole";
        game.appendChild(mole);
    }
}

function bangstart () {
    var time, which, ks = 0, reg = 0, score;
    document.getElementById('start').onclick = function() {
        document.getElementById('state').innerHTML = "Playing";
        if (!ks) {
            time = 30;
            score = 0;
            ks = 1;
            playGame();
        }
    };
    document.getElementById('stop').onclick = function() {
        time = 0;
        ks = 0;
    };
    function playGame () {
        var T = document.getElementById('time'), S = document.getElementById('score');
        T.innerHTML = time; S.innerHTML = score;
        selectone();
        var endsi = setInterval(function() {
            T.innerHTML = --time;
            if (time <= 0) {
                document.getElementById('state').innerHTML = "Game Over";
                alert("Game Over\nYour score is: " + score);
                T.innerHTML = "";
                S.innerHTML = "";
                var h = document.getElementById("themole" + which);
                h.className = h.className.replace(/(?:^|\s)showup(?!\S)/, '');
                h.value = 0;
                ks = 0;
                clearInterval(endsi);
            }
        }, 1000);
        if (reg === 0) {
            var j = 0;
            while (j < 60) {document.getElementById("themole" + j).onclick = clickmole;j++;}
            reg = 1;
        }
        function clickmole () {  //closure
            if (ks === 0) return;
            if (this.value === "0") {
                S.innerHTML = --score;
                return;
            } else {
                S.innerHTML = ++score;
                this.value = 0;
                this.className = this.className.replace(/(?:^|\s)showup(?!\S)/, '');
                selectone();
            }
        }
        function selectone () {
            var it = parseInt(Math.random() * Math.random() * 14331161 % 60);
            var now = document.getElementById("themole" + it);
            now.className += " showup";
            now.onclick = clickmole;
            now.value = 1;
            which = it;
        }
    }
}



