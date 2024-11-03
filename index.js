let pre = document.getElementById("previous");
let act = document.getElementById("actual");
let doted = false;

function is_sign(char) {
    return char != "" && "+-*/".includes(char);
}

function is_num(char) {
    return char != "" && ".0123456789".includes(char);
}

function act_to_prev(char) {
    pre.innerText += act.innerText;
    act.innerText = char;
}

function add_char(char) {
    if (is_num(char)) {
        if (is_num(act.innerText.slice(-1)) && char != ".") {
            char = char;
        }
        else if (char == "." && !doted) {
            doted = true;
            if (act.innerText.length == 0 || act.innerText == "-") {
                char = "0.";
            }
        }
        else if (doted) { 
            char = "";
        }
        else if (!(is_sign(pre.innerText.slice(-1)) && act.innerText.slice(-1) == "-")) {
            pre.innerText += act.innerText;
            act.innerText = "";
        }
        act.innerText += char;
    }
    if (is_sign(char)) {
        if (act.innerText.length == 0 && pre.innerText.length == 0 && char != "-") {
            char == "";
        }
        else if (pre.innerText.length == 0 && act.innerText == "-") {
            char == "";
        }
        else if (act.innerText.slice(-1) == "-" && char == "-"){
            char = "";
        }
        else if (is_sign(act.innerText.slice(-1)) && char == "-") {
            pre.innerText += act.innerText;
            act.innerText = char;
        }
        else if (!is_sign(act.innerText.slice(-1))) {
            pre.innerText += act.innerText;
            act.innerText = char;
        }
        else if (!is_sign(pre.innerText.slice(-1)) && is_sign(act.innerText.slice(-1))) {
            if (char != "-") {
                act.innerText = act.innerText.slice(0, -1);
                act.innerText += char;
            }
        }
        else if (is_sign(pre.innerText.slice(-1)) && is_sign(act.innerText.slice(-1))) {
            char = "";
        }
        doted = false;
    }
}

function clear_display() {
    act.innerText = "";
    pre.innerText = "";
}

function back() {
    act.innerText = act.innerText.slice(0, -1);
    if (act.innerText == "") {
        if (is_sign(pre.innerText.slice(-1))) {
            act.innerText = pre.innerText.slice(-1);
            pre.innerText = pre.innerText.slice(0, -1);
        }
        else {
            while (is_num(pre.innerText.slice(-1))) {
                act.innerText = pre.innerText.slice(-1) + act.innerText;
                pre.innerText = pre.innerText.slice(0, -1);
            }
            if ((pre.innerText.length == 1 || is_sign(pre.innerText.slice(-2, -1))) && pre.innerText.slice(-1) == "-") {
                act.innerText = pre.innerText.slice(-1) + act.innerText;
                pre.innerText = pre.innerText.slice(0, -1);
            }
        }
    }
}

function calculate() {
    try {
        act.innerText = eval(pre.innerText + act.innerText);
    }
    catch (err) {
        act.innerText = "Error";
    }
    pre.innerText = "";
}
