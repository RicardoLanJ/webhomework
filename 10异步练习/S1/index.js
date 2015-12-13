$(function() {
    controlRing.inti();
    $('#control-ring-container').click(function(e) {
        var key = e.target.innerHTML.substring(0, 1);
        if (controlRing.isAvailable(key)) {
            waiting(e.target, numberArrival, key);
        }
    });
    $('#info-bar').click(function(e) {
        if (controlRing.culAvailable()) {
            $('#answer').html(culculateAns());
        }
    });
    $('#button').hover(function(){}, function() {
        controlRing.inti();
    });
});

function waiting (target, callback, key) {
    var $tc = $(target).children('span').html('...' ).show();
    controlRing.disableOther(key);
    $.get('api/getnumber', {"_" : $.now()}, function(data, status) {
        if (status === "success") {
            callback(null, data, $tc);
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