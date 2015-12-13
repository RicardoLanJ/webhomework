$(function() { 
    var handle = {
        A: {
            ahandle: function(alp, ch, currentSum, omit) {
                if (handle.errorMaker() && !omit) return new Object({
                    mes: handle.A.errormessage,
                    cur: currentSum
                });
                var $tc = $('#buttonA').children('span').html('...').show();
                controlRing.disableOther('A');
                $.get('api/getnumber', {
                    "_": $.now()
                }, function(data, status) {
                    try {
                        if (status === "success") {
                            if (robot.isEnd()) return;
                            numberArrival(null, data, $tc);
                            var err;
                            if (ch < 5)
                                err = handle[alp[ch]][alp[ch].toLowerCase() + 'handle'](alp, ch + 1, currentSum + parseInt(data), false);
                            else
                                err = handle.Bubble.bubblehandle(currentSum);
                            if (err !== null) throw err;
                        } else {
                            numberArrival('error occur');
                        }
                    } catch (e) {
                        console.log('errora');
                        controlRing.button.A = 0;
                        controlRing.turnBlue('A');
                        $('#info').append('<p>' + e.mes + '   是' + e.cur + '</p>');
                        handle.A.ahandle(alp, ch, currentSum, true);
                    }

                });
                if (!omit) $('#info').append('<p>' + handle.A.rightmessage + '</p>');
                return null;
            },
            errormessage: 'A：这不是个天大的秘密',
            rightmessage: 'A：这是个天大的秘密',
        },
        B: {
            bhandle: function(alp, ch, currentSum, omit) {
                if (handle.errorMaker() && !omit) return new Object({
                    mes: handle.B.errormessage,
                    cur: currentSum
                });
                var $tc = $('#buttonB').children('span').html('...').show();
                controlRing.disableOther('B');
                $.get('api/getnumber', {
                    "_": $.now()
                }, function(data, status) {
                    try {
                        if (status === "success") {
                            if (robot.isEnd()) return;
                            numberArrival(null, data, $tc);
                            var err;
                            if (ch < 5)
                                err = handle[alp[ch]][alp[ch].toLowerCase() + 'handle'](alp, ch + 1, currentSum + parseInt(data), false);
                            else
                                err = handle.Bubble.bubblehandle(currentSum);
                            if (err !== null) throw err;
                        } else {
                            numberArrival('error occur');
                        }
                    } catch (e) {
                        console.log('errorb');
                        controlRing.button.B = 0;
                        controlRing.turnBlue('B');
                        $('#info').append('<p>' + e.mes + '   是' + e.cur + '</p>');
                        handle.B.bhandle(alp, ch, currentSum, true);
                    }

                });
                if (!omit) $('#info').append('<p>' + handle.B.rightmessage + '</p>');
                return null;
            },
            errormessage: 'B：我知道',
            rightmessage: 'B：我不知道',
        },
        C: {
            chandle: function(alp, ch, currentSum, omit) {
                if (handle.errorMaker() && !omit) return new Object({
                    mes: handle.C.errormessage,
                    cur: currentSum
                });
                var $tc = $('#buttonC').children('span').html('...').show();
                controlRing.disableOther('C');
                $.get('api/getnumber', {
                    "_": $.now()
                }, function(data, status) {
                    try {
                        if (status === "success") {
                            if (robot.isEnd()) return;
                            numberArrival(null, data, $tc);
                            var err;
                            if (ch < 5)
                                err = handle[alp[ch]][alp[ch].toLowerCase() + 'handle'](alp, ch + 1, currentSum + parseInt(data), false);
                            else
                                err = handle.Bubble.bubblehandle(currentSum);
                            if (err !== null) throw err;
                        } else {
                            numberArrival('error occur');
                        }
                    } catch (e) {
                        console.log('errorc');
                        controlRing.button.C = 0;
                        controlRing.turnBlue('C');
                        $('#info').append('<p>' + e.mes + '   是' + e.cur + '</p>');
                        handle.C.chandle(alp, ch, currentSum, true);
                    }

                });
                if (!omit) $('#info').append('<p>' + handle.C.rightmessage + '</p>');
                return null;
            },
            errormessage: 'C：你知道',
            rightmessage: 'C：你不知道',
        },
        D: {
            dhandle: function(alp, ch, currentSum, omit) {
                if (handle.errorMaker() && !omit) return new Object({
                    mes: handle.D.errormessage,
                    cur: currentSum
                });
                var $tc = $('#buttonD').children('span').html('...').show();
                controlRing.disableOther('D');
                $.get('api/getnumber', {
                    "_": $.now()
                }, function(data, status) {
                    try {
                        if (status === "success") {
                            if (robot.isEnd()) return;
                            numberArrival(null, data, $tc);
                            var err;
                            if (ch < 5)
                                err = handle[alp[ch]][alp[ch].toLowerCase() + 'handle'](alp, ch + 1, currentSum + parseInt(data), false);
                            else
                                err = handle.Bubble.bubblehandle(currentSum);
                            if (err !== null) throw err;
                        } else {
                            numberArrival('error occur');
                        }
                    } catch (e) {
                        console.log('errord');
                        controlRing.button.D = 0;
                        controlRing.turnBlue('D');
                        $('#info').append('<p>' + e.mes + '   是' + e.cur + '</p>');
                        handle.D.dhandle(alp, ch, currentSum, true);
                    }

                });
                if (!omit) $('#info').append('<p>' + handle.D.rightmessage + '</p>');
                return null;
            },
            errormessage: 'D：他知道',
            rightmessage: 'D：他不知道',
        },
        E: {
            ehandle: function(alp, ch, currentSum, omit) {
                if (handle.errorMaker() && !omit) return new Object({
                    mes: handle.E.errormessage,
                    cur: currentSum
                });
                var $tc = $('#buttonE').children('span').html('...').show();
                controlRing.disableOther('E');
                $.get('api/getnumber', {
                    "_": $.now()
                }, function(data, status) {
                    try {
                        if (status === "success") {
                            if (robot.isEnd()) return;
                            numberArrival(null, data, $tc);
                            var err;
                            if (ch < 5)
                                err = handle[alp[ch]][alp[ch].toLowerCase() + 'handle'](alp, ch + 1, currentSum + parseInt(data), false);
                            else
                                err = handle.Bubble.handle.Bubble.bubblehandle(currentSum);
                            if (err !== null) throw err;
                        } else {
                            numberArrival('error occur');
                        }
                    } catch (e) {
                        console.log('error' + 'e');
                        controlRing.button.E = 0;
                        controlRing.turnBlue('E');
                        $('#info').append('<p>' + e.mes + '   是' + e.cur + '</p>');
                        handle.E.ehandle(alp, ch, currentSum, true);
                    }

                });
                if (!omit) $('#info').append('<p>' + handle.E.rightmessage + '</p>');
                return null;
            },
            errormessage: 'E：你胸大你话事',
            rightmessage: 'E：才怪',
        },
        Bubble: {
            bubblehandle: function(currentSum) {
                if (handle.errorMaker()) return new Object({
                    mes: handle.Bubble.errormessage,
                    cur: currentSum
                });
                $('#answer').html(currentSum);
                $('#info').append('<p>' + handle.Bubble.rightmessage + currentSum + '</p>');
                return null;
            },
            errormessage: '大气泡：楼主异步调用战斗力爆表，目测',
            rightmessage: '大气泡：楼主异步调用战斗力感人，目测不超过',
        },
        errorMaker: function() {
            this.errorLimit++;
            if (this.errorLimit % 3 === 0) return false;
            var errorRate = 0.6;
            var d = new Date(),
                random = (d.getSeconds() * d.getMinutes() * Math.PI);
            random -= Math.floor(random);
            if (random > errorRate) return true;
            else return false;
        },
        errorLimit: 0
    };

    var robot = {
        seed: 666,
        isEnd: function() {
            return controlRing.allAvailable(); // the requisite of callback continue is one of button have gotten number 
        },
        simulate: function() {
            if (!controlRing.allAvailable()) return;
            var alp = ['A', 'B', 'C', 'D', 'E'],
                ch = 0;
            robot.disorderAlp(alp);
            try {
                var err = handle[alp[ch]][alp[ch].toLowerCase() + 'handle'](alp, ch + 1, 0, false);
                if (err !== null) throw err;
            } catch (e) {
                console.log('begin');
                controlRing.button[alp[ch]] = 0;
                controlRing.turnBlue(alp[ch]);
                $('#info').append('<p>' + e.mes + '   是' + e.cur + '</p>');
                arguments.callee();
            }
        },
        disorderAlp: function(prealp) {
            for (var i = 0; i < 10; ++i) {
                var r = random(this.seed++),
                    ater = prealp[0];
                prealp[0] = prealp[r];
                prealp[r] = ater;
            }
        },
    };

    function numberArrival(err, data, $tc) {
        if (err) console.log(err);
        else {
            $tc.html(data);
            controlRing.enableAll();
        }
    }

    function random(seed) {
        return parseInt(Math.abs(Math.sin(seed)) * 14331161) % 4 + 1;
    }

    var controlRing = {
        // enable : 0, waiting : 1, disable : 2, end : 3
        button: {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            E: 0
        },
        hasGetNumber: -5,
        isAvailable: function(target) {
            return this.button[target] === 0;
        },
        allAvailable: function() {
            for (var key in this.button) {
                if (this.button[key] !== 0) return false;
            }
            return true;
        },
        disableOther: function(me) {
            this.button[me] = 3;
            this.hasGetNumber++;
            for (var key in this.button) {
                if (this.button[key] === 0) {
                    this.button[key] = 2;
                    this.turnGrey(key);
                }
            }
        },
        enableAll: function() {
            for (var key in this.button) {
                if (this.button[key] !== 3) {
                    this.button[key] = 0;
                    this.turnBlue(key);
                } else {
                    this.turnGrey(key);
                }
            }
        },
        turnGrey: function(key) {
            $('#button' + key).addClass('disable');
        },
        turnBlue: function(key) {
            $('#button' + key).removeClass('disable');
        },
        culAvailable: function() {
            if (this.hasGetNumber) return false;
            else {
                this.hasGetNumber = 1;
                return true;
            }
        },
        inti: function() {
            for (var key in this.button) {
                this.button[key] = 0;
                this.turnBlue(key);
                $('#button' + key).children('span').html('').hide();
            }
            this.hasGetNumber = -5;
            $('#answer').html('');
            $('#info').empty();
        }
    };
    controlRing.inti();
    $('#button').hover(function() {}, function() {
        controlRing.inti();
    });
    $('#apb').click(robot.simulate);
});
