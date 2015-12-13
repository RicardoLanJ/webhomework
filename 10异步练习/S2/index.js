$(function() {   // S2
    controlRing.inti();
    $('#button').hover(function(){}, function() {
        controlRing.inti();
    });
    $('#apb').click(robot.simulate);
});

var robot = {
    isEnd : function() {
        return controlRing.allAvailable();  // the requisite of callback continue is one of button have gotten number 
    },
    simulate : function  () {
        var alp = ['A', 'B', 'C', 'D', 'E'], ch = 0;
        robot.analogClickRing($('#button' + alp[ch]), alp, ch + 1);
    },   
    analogClickRing : function ($e, alp, ch) {
        var key = $e.html().substring(0, 1);
        if (controlRing.isAvailable(key)) {
            waiting($e, numberArrival, key, alp, ch);
        }
    },  
    analogClickInfobar : function () {
        if (controlRing.culAvailable()) {
                $('#answer').html(culculateAns());
        }
    }
};

function waiting ($target, callback, key, alp, ch) {
    var $tc = $target.children('span').html('...' ).show();
    controlRing.disableOther(key);
    $.get('api/getnumber', {"_" : $.now()}, function(data, status) {
        if (status === "success") {
            callback(null, data, $tc);
            if (robot.isEnd()) return;
            if (ch === 5) {
                robot.analogClickInfobar();
            }  else {
                robot.analogClickRing($('#button' + alp[ch]), alp, ch + 1);
            }
        }  else {
            callback(null);
        }
    });
}

function numberArrival (err, data, $tc) {
    if (err) console.log(err);
    else {
        $tc.html(data);
        controlRing.enableAll();
    }
}

function culculateAns () {
    var result = 0;
    $('#control-ring span').each(function() {
        result += parseInt(this.innerHTML);
    });
    return result;
}

var controlRing = {
    // enable : 0, waiting : 1, disable : 2, end : 3
    button : {A : 0, B : 0, C : 0, D : 0, E : 0},
    hasGetNumber : -5,
    isAvailable : function(target) {
        return this.button[target] === 0;
    },
    allAvailable : function() {
        for (var key in this.button) {
            if (this.button[key] !== 0) return false;
        }
        return true;
    },
    disableOther : function(me) {
        this.button[me] = 3;
        this.hasGetNumber++;
        for (var key in this.button) {
            if (this.button[key] === 0) {
               this.button[key] = 2;
               this.turnGrey(key);
            }
        }
    }, 
    enableAll : function() {
        for (var key in this.button) {
            if (this.button[key] !== 3) {
                this.button[key] = 0;
                this.turnBlue(key);
            }  else {
                this.turnGrey(key);
            }
        }
    }, 
    turnGrey : function(key) {
        $('#button' + key).addClass('disable');
    }, 
    turnBlue : function(key) {
        $('#button' + key).removeClass('disable');
    },
    culAvailable : function() {
        if (this.hasGetNumber) return false;
        else {
            this.hasGetNumber = 1;
            return true;
        }
    },
    inti : function() {
        for (var key in this.button) {
            this.button[key] = 0;
            this.turnBlue(key);
            $('#button' + key).children('span').html('').hide();
        }
        this.hasGetNumber = -5;
        $('#answer').html('');
    }
};