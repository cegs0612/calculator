import { operate } from "./basicFunctions.js";

const opParameters = {
    a : null, //number or null
    b : null, //number or null
    reading : "", // string
    currentOperation : null, //string or null
    currentResult : null, //number or null,
    history : [], // array of strings
    setValue : function (numVal,variable) {
        if (numVal==="ERROR") {
            this.currentResult = "ERROR";
            return
        }
        let valueToSet = null;
        if (numVal !== null){
           let val = String(numVal);
            //the variable can be: 0.1234
            if (val.includes(".")){
                let float = val.split(".")
                float[1].length>4 ? valueToSet = Number(val).toFixed(4): valueToSet = Number(val);
                valueToSet = Number(valueToSet);
            } else {
                valueToSet = Number(val);
            } 
        }
        switch (variable) {
            case "a":
                this.a = valueToSet;
                break;
            case "b":
                this.b = valueToSet;
                break;
            case "curRes":
                this.currentResult = valueToSet;
                break;
        }
    },
    addHistoryEntry : function (historyString) {
        this.history.push(historyString);
    },
    resetHistory : function () {
        this.history = [];
    },
    resetReading : function () {
        this.reading = ""
    },
    reset : function () {
        this.a = null,
        this.b = null,
        this.reading = "",
        this.currentOperation = null
        //this.currentResult = null
    }
}

//sets the conection to the html where the numbers and the operation will be shown
const displayNumber = document.getElementById("dispNum");
const displayOperation = document.getElementById("dispOp");
const history = document.getElementById("history");

// aux functions

function evaluateExponential(num) {
    //returns a string with the value to be displayed, in exp notation or not
    if (num === null) return "";
    else if (num === 0) return "0";
    else if (num === "ERROR") return "ERROR";
    else if (typeof num === "number") {
        if (String(num).length>8){
            return String(Number(num).toExponential(4));
        } else {
            return String(num);
        }
    }
}

function getOperationString() {
    let a = evaluateExponential(opParameters.a);
    let b = evaluateExponential(opParameters.b);
    let op = opParameters.currentOperation;
    let res = evaluateExponential(opParameters.currentResult);
    return (a + " " + op + " " + b + " = " + res);
}

function getResult() {
    //this function calculates and shows the result only if it has all the data.
    document.getElementById("float").removeAttribute("disabled");//restores float btn
    if(opParameters.a !== null && opParameters.currentOperation !== null && opParameters.b !== null){
        let a = opParameters.a;
        let b = opParameters.b;
        let result = operate(opParameters.currentOperation,a,b);
        opParameters.setValue(result,"curRes");
        opParameters.addHistoryEntry(getOperationString())
        showNumber(opParameters.currentResult);
        showOperation();
        showHistory();            
    }

}

//clear functions

function clear() {
    opParameters.reset();
    showNumber("");
    showOperation();
    showHistory();
    document.getElementById("float").removeAttribute("disabled")  
}
function clearEntry() {
    opParameters.reading = "";
    showNumber("");
    showOperation();
    showHistory();
    document.getElementById("float").removeAttribute("disabled")
}
function eraseNumber() {
    let string = opParameters.reading
    if (string !== "") {
        if (string.charAt(string.length - 1) === ".") {
            document.getElementById("float").removeAttribute("disabled")
        }
        opParameters.reading = string.slice(0, -1);
        showNumber(opParameters.reading);
        showOperation();
        showHistory();
    }
}

// display functions
function showNumber(val) {
    displayNumber.value = val;
}

function showOperation() {
    let a = evaluateExponential(opParameters.a);
    let b = opParameters.reading;
    let op =  "";
    if (opParameters.currentOperation !== null) op = opParameters.currentOperation;
    displayOperation.value = `${a} ${op} ${b}`;
}

function showHistory() {
    history.value = opParameters.history.join("\n");
    history.scrollTop = history.scrollHeight;
}

// handle button functions
function handleNumber(number) {
    opParameters.reading += number;
    showNumber(opParameters.reading);
    showOperation();
}

function handleDecimal() {
    let num = opParameters.reading;
    if (!num.includes(".")) {
        document.getElementById("float").setAttribute("disabled","");
        opParameters.reading === "" ? opParameters.reading = "0." : opParameters.reading = opParameters.reading + ".";
        showNumber(opParameters.reading);
        showOperation();
    }
}

function handleOperationButton(operator) {
    document.getElementById("float").removeAttribute("disabled");
    if (opParameters.a === null && opParameters.reading === "" && opParameters.currentOperation === null){
        if (opParameters.currentResult === null) {
            // if the user presses an op btn with no previous data assigned nor previous result
        opParameters.setValue(0,"a");
        opParameters.currentOperation = operator;
        } else {
            // when there's a previous result
            opParameters.setValue(opParameters.currentResult,"a");
            opParameters.currentOperation = operator;
            opParameters.currentResult = null;
        }
    }
    else if (opParameters.a === null && opParameters.reading !== ""){
        // when the user presses the op btn with some previous data inserted
        opParameters.setValue(opParameters.reading,"a");
        opParameters.currentOperation = operator;
        opParameters.resetReading();
    }
    else if (opParameters.a !== null && opParameters.b === null && opParameters.reading !== "" && opParameters.currentOperation !== null) {
        // when the user enters multiple op in a row
        opParameters.setValue(opParameters.reading,"b");
        getResult(); //get the result
        let result = opParameters.currentResult;
        opParameters.reset(); // resets the object
        opParameters.setValue(result,"a"); // sets the previous result to a 
        opParameters.currentOperation = operator; // sets the new operation
        showNumber("");
    }
    else if (opParameters.a !== null && opParameters.currentOperation !== null) {
        //allows the user to change the operation before entering the second number
        opParameters.currentOperation = operator;
    }
    showOperation() // shows the update
}

function handleEqual() {
    document.getElementById("float").removeAttribute("disabled");
    //when the user presses the equal btn after getting a result, simply erases all data
    if(opParameters.a === null && opParameters.b === null && opParameters.currentOperation === null && opParameters.currentResult !== null) {
        opParameters.reset();
        showNumber("")
        showOperation();
        return
    }
    opParameters.setValue(opParameters.reading,"b");
    getResult();
    opParameters.reset();
}

function handleToggleSign() {
    if (opParameters.reading.charAt(0) !== "+" && opParameters.reading.charAt(0) !== "-") {
        opParameters.reading = "-" + opParameters.reading;
    }
    else if (opParameters.reading.startsWith("-")) {
        opParameters.reading = opParameters.reading.substring(1);
    }
    showNumber(opParameters.reading);
    showOperation()
}

function handleScroll(dir) {
    if (dir === "ArrowUp"){
        history.scrollTop -= 10;
    } else if (dir === "ArrowDown") {
        history.scrollTop += 10;
    }
}

export const calculatorFunctions = {
    clear: clear,
    clearEntry: clearEntry,
    eraseNumber: eraseNumber,
    handleNumber :  function(number) {
        handleNumber(number)
    },
    handleDecimal: handleDecimal, 
    handleOperationButton: function(operator) {
        handleOperationButton(operator)
    },
    handleEqual : handleEqual,
    handleToggleSign : handleToggleSign,
    handleScroll : function (dir) {
        handleScroll(dir)
    }
}
