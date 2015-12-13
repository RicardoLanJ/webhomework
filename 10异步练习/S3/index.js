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
        var alp = ['A', 'B', 'C', 'D', 'E'];
        for (var i = 0; i < 5; ++i) {
            robot.analogClickRing($('#button' + alp[i]));
        }
    },   
    analogClickRing : function ($e) {
        var key = $e.html().substring(0, 1);
        if (controlRing.isAvailable(key)) {
            waiting($e, numberArrival, key);
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
            if (robot.isEnd()) return;
            callback(null, data, $tc, key);
            controlRing.hasGetNumber++;
            robot.analogClickInfobar();
        }  else {
            callback(null);
        }
    });
}

function numberArrival (err, data, $tc, key) {
    if (err) console.log(err);
    else {
        $tc.html(data);
        controlRing.turnGrey(key);
        //controlRing.enableAll();
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
        return /*this.button[target] === 0;*/ true;
    },
    allAvailable : function() {
        for (var key in this.button) {
            if (this.button[key] !== 0) return false;
        }
        return true;
    },
    disableOther : function(me) {
        this.button[me] = 3;
        /*for (var key in this.button) {
            if (this.button[key] === 0) {
               this.button[key] = 2;
               this.turnGrey(key);
            }
        }*/
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