window.onload = function() {
    var number = document.getElementsByClassName('num');
    var useddot = 0; var isans = 0;
    var ex = document.getElementById('expression');
    for (var i = number.length - 1; i >= 0; i--) {
        var ater = number[i];
        ater.onclick = function() {
            var answer_ = document.getElementById('answer');
            initial(answer_);
            if (this.innerHTML === ".") {
                if (useddot === 0 && (!isNaN(answer_.innerHTML.charAt(answer_.innerHTML.length - 1)))) {
                    answer_.innerHTML += ".";
                    ex.innerHTML += ".";
                    useddot = 1;
                }
            }  else {
                if (answer_.innerHTML === "0") {answer_.innerHTML = this.innerHTML; ex.innerHTML = this.innerHTML;}
                else {
                    if (answer_.innerHTML.charAt(answer_.innerHTML.length - 1) === ")") {answer_.innerHTML += "*"; ex.innerHTML += "*";} 
                    answer_.innerHTML += this.innerHTML;
                    ex.innerHTML += this.innerHTML;
                }
            }
        };
    }
    // document.getElementById('').onclick = function() {};
    var countbracket = 0;
    var prebracket = document.getElementById('bracket');
    document.getElementById('chl').onclick = function() {
        var answer_ = document.getElementById('answer'); /*wtf dom will be delete after rewrite the same tag*/
        initial(answer_);
        if (answer_.innerHTML === "0" && countbracket === 0) {answer_.innerHTML = this.innerHTML; ex.innerHTML = this.innerHTML;}
        else {
            var ch = answer_.innerHTML.charAt(answer_.innerHTML.length - 1);
            if (ch === ".") return;
            if (!isNaN(ch) || ch === ")") {ex.innerHTML += "*"; answer_.innerHTML += "*";}
            answer_.innerHTML += "(";
            ex.innerHTML += "(";
            useddot = 0;
        }
        countbracket++;
        prebracket.innerHTML += ")";
    };
    
    document.getElementById('chr').onclick = function() {
        var answer_ = document.getElementById('answer');
        ch = answer_.innerHTML.charAt(answer_.innerHTML.length-1);
        initial(answer_);
        if (!isNaN(ch) || ch === ")") {
            if (countbracket > 0) {
                answer_.innerHTML += ")";
                ex.innerHTML += ")";
                prebracket.innerHTML = prebracket.innerHTML.substring(0, prebracket.innerHTML.length - 1);
                countbracket--;
                useddot = 0;
            }
        }
    };

    document.getElementById('chb').onclick = function() {
        var ch = answer.innerHTML.charAt(answer.innerHTML.length - 1);
        initial(answer);
        if (ch === ".") useddot = 0;
        if (ch === ")") {prebracket.innerHTML += ")"; countbracket++;} 
        else if (ch === "(") {
            /*if (answer.innerHTML.charAt(answer.innerHTML.length-2) !== "*" && ex.innerHTML.charAt(ex.innerHTML.length-2) == "*")
                ex.innerHTML = ex.innerHTML.substring(0, ex.innerHTML.length - 1); */
            prebracket.innerHTML = prebracket.innerHTML.substring(0, prebracket.innerHTML.length - 1);
            countbracket--;
        }
        var answer_ = document.getElementById('answer');
        answer_.innerHTML = answer_.innerHTML.substring(0, answer_.innerHTML.length - 1);
        ex.innerHTML = ex.innerHTML.substring(0, ex.innerHTML.length - 1);
        if (ch === "-" && answer_.innerHTML.charAt(answer.innerHTML.length - 1) === "(") {
            ex.innerHTML = ex.innerHTML.substring(0, ex.innerHTML.length - 1);
        }
        if (answer_.innerHTML.length === 0) {answer_.innerHTML = "0"; ex.innerHTML = "0";} 
    };

    document.getElementById('chc').onclick = function() {
        if (isans === 1) {mainex.innerHTML = "Ans = " + answer.innerHTML; isans = 0;}
         clearall();
         // mainex.innerHTML = "0";
    };

    document.getElementById('chd').onclick = function() {
        var answer_ = document.getElementById('answer');
        var ch = answer_.innerHTML.charAt(answer_.innerHTML.length-1);
        initial(answer_);
        if (ch === "(" || ch === "." || ch === "÷") return;
        if (ch === "×" || ch === "+" || ch === "-") {
            answer_.innerHTML = answer_.innerHTML.substring(0, answer_.innerHTML.length-1);
            ex.innerHTML = ex.innerHTML.substring(0, ex.innerHTML.length-1);
        }
        answer_.innerHTML += "÷"; ex.innerHTML += "/";
        useddot = 0;
    };

    document.getElementById('chmul').onclick = function() {
        var answer_ = document.getElementById('answer');
        var ch = answer_.innerHTML.charAt(answer_.innerHTML.length-1);
        initial(answer_);
        if (ch === "(" || ch === "." || ch === "×") return;
        if (ch === "÷" || ch === "+" || ch === "-") {
            answer_.innerHTML = answer_.innerHTML.substring(0, answer_.innerHTML.length-1);
            ex.innerHTML = ex.innerHTML.substring(0, ex.innerHTML.length-1);
        }
        answer_.innerHTML += "×"; ex.innerHTML += "*" ;
        useddot = 0;
    };

    document.getElementById('chmin').onclick = function() {
        var answer_ = document.getElementById('answer');
        initial(answer_);
        if (answer_.innerHTML === "0") {
            answer_.innerHTML = "-";
            ex.innerHTML = "0-";
            return;
        }
        var ch = answer_.innerHTML.charAt(answer_.innerHTML.length-1);
        if (ch === "(") {
            ex.innerHTML += "0";
        }
        if (ch === "." || ch === "-") return;
        if (ch === "×" || ch === "+" || ch === "÷") {
            answer_.innerHTML = answer_.innerHTML.substring(0, answer_.innerHTML.length-1);
            ex.innerHTML = ex.innerHTML.substring(0, ex.innerHTML.length-1);
        }
        answer_.innerHTML += "-"; ex.innerHTML += "-";
        useddot = 0;
    };

    document.getElementById('chadd').onclick = function() {
        var answer_ = document.getElementById('answer');
        var ch = answer_.innerHTML.charAt(answer_.innerHTML.length-1);
        initial(answer_);
        if (ch === "(" || ch === "." || ch === "+") return;
        if (ch === "×" || ch === "÷" || ch === "-") {
            answer_.innerHTML = answer_.innerHTML.substring(0, answer_.innerHTML.length-1);
            ex.innerHTML = ex.innerHTML.substring(0, ex.innerHTML.length-1);
        }
        answer_.innerHTML += "+"; ex.innerHTML += "+";
        useddot = 0;
    };

    document.getElementById('chequ').onclick = function() {
        // culculate
        var his = document.getElementById('history');
        var answer_ = document.getElementById('answer');
        var ch = answer_.innerHTML.charAt(answer_.innerHTML.length-1);
        if (isans !== 1) {
            if (ch !== ")" && isNaN(ch)) {
                clearall();
                mainex.innerHTML = answer_.innerHTML + "=";
                answer.innerHTML = "Error";
            } else { 
                if (countbracket > 0) {
                    while(countbracket-- > 0) {
                        answer.innerHTML += ")";
                        ex.innerHTML += ")";
                        prebracket.innerHTML = prebracket.innerHTML.substring(0, prebracket.innerHTML.length - 1);
                    }
                    countbracket = 0;
                }
                mainex.innerHTML = answer_.innerHTML + "=";
                var ater = culculate(ex.innerHTML);
                clearall();
                if (ater === "Error") answer.innerHTML = "Error";
                else answer.innerHTML = ater.toFixed(9) * 1000000000 / 1000000000;
                useddot = 0;
                isans = 1;
            }
        }
        

        his.style.top = "30px";
        his.style.color = "black";
        his.style.fontSize = "22px";
        his.style.transition = "all 0s";
        ansdiv.style.top = "30px";
        ansdiv.style.transition = "all 0s";
        setTimeout(function() {back(his);}, 0);
    };

    function back (his) {
        his.style.transition = "all 0.2s ease";
        his.style.top = "6px";
        his.style.color = "#87878E";
        his.style.fontSize = "12px";
        ansdiv.style.top = "0px";
        ansdiv.style.transition = "all 0.2s ease";
    }

    /*function getlastchar (str) {
        return str.charAt(str.length-1);
    }

    function deletelastone (str) {
        return str.substring(0, str.length-1);
    }*/

    function clearall () {
        ex.innerHTML = answer.innerHTML = "0";
        useddot = 0;
        countbracket = 0;
        prebracket.innerHTML = answer.outerHTML;
    }

    function initial (answer_) {
        if (isans === 1) {mainex.innerHTML = "Ans = " + answer_.innerHTML;}
        if (answer_.innerHTML === "Error" || answer_.innerHTML === "Infinity" || isans === 1) {answer_.innerHTML = "0"; isans = 0;}
    }

    function culculate (str) {
         // return eval(str);
        var cul = [], osta = ['#'];
        var ch, num, op, L, R, cache, i;
        while (str.length !== 0) {
            ch = str.charAt(0);
            if (!isNaN(ch)) {
                num = parseFloat(str);
                cul.push(num);
                str = str.substring(num.toString().length, str.length);
                i = 0;
                if (str.charAt(i) == ".") i++;
                    while (!isNaN(str.charAt(i)) && i < str.length) i++;
                    str = str.substring(i, str.length);
            } else {
                str = str.substring(1, str.length);
                if (ch === "(") {
                    osta.push("(");
                } else if (ch === ")") {
                    while ((op = osta.pop()) !== "(") {
                        R = cul.pop();
                        L = cul.pop();
                        if (jisuan(op, L, R, cul, osta) === "Error") return "Error";
                    } 
                } else {
                    while (cmp(osta[osta.length-1]) >= cmp(ch)) {
                        op = osta.pop();
                        R = cul.pop();
                        L = cul.pop();
                        if (jisuan(op, L, R, cul, osta) === "Error") return "Error";
                    }
                    osta.push(ch);
                }
            }
        }
        while (osta.length > 1) {
            op = osta.pop();
            R = cul.pop();
            L = cul.pop();
            if (jisuan(op, L, R, cul, osta) === "Error") return "Error";
        }
        return cul[0];
    }
    function jisuan (op, L, R, cul, osta) {
        if (op === "+") cache = (L+R);
        else if (op === "-") cache = (L-R);
        else if (op === "*") cache = (L*R);
        else {
            if (R === 0) return "Error";
            cache = (L/R);
        }
        cul.push(cache.toFixed(9) * 1000000000/ 1000000000);
    }
    function cmp(ch) {
        if (ch === "#") return 0;
        else if (ch === "(") return 1;
        else if (ch === "+" || ch === "-") return 2;
        else return 3;
     }
};


