// basic operation functions
function add(a,b) {
    return a + b;
}

function substract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a*b    
}

function divide(a,b) {
    return b === 0 ? "ERROR" : a/b;
}

export function operate(operator,a,b) {
    switch (operator) {
        case "+":
            return add(a,b)
        case "-":
            return substract(a,b)
        case "x":
            return multiply(a,b)
        case "/":
            return divide(a,b)
    }
}