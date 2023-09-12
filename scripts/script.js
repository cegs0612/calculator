import { calculatorFunctions } from "./logic.js";

//adding the functions to buttons and keys
//adding the function to the number buttons

const numbers = document.querySelectorAll("div.numbers button");
numbers.forEach(number => {
    number.addEventListener('click' , () =>{
        if (number.innerText === ".") calculatorFunctions.handleDecimal();
        if (number.innerText==="+/-") calculatorFunctions.handleToggleSign();
        if (number.innerText !== "." && number.innerText!== "+/-") calculatorFunctions.handleNumber(number.innerText)});
});

//adding the function to the operation buttons
const operators = document.querySelectorAll("div.operators button");
operators.forEach((operator) => {
    operator.addEventListener("click" , ()=>calculatorFunctions.handleOperationButton(operator.innerText))
})

//adding function to the = button
document.getElementById("result").addEventListener("click", () => {calculatorFunctions.handleEqual()})
// adding function to the erase button
document.getElementById("erase").addEventListener("click",() => {calculatorFunctions.eraseNumber()})
// adding function to the clear button
document.getElementById("clear").addEventListener("click", () =>{calculatorFunctions.clear()})
// adding function to the clear-entry button
document.getElementById("clear-entry").addEventListener("click", ()=>{calculatorFunctions.clearEntry()})
//adding the keys

window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if(e.defaultPrevented) return;
    const num = ["0","1","2","3","4","5","6","7","8","9"];
    const oper = ["+","-","/"];
    if (num.includes(e.key))calculatorFunctions.handleNumber(e.key);
    if (oper.includes(e.key))calculatorFunctions.handleOperationButton(e.key);
    switch (e.key) {
        case "*":
            calculatorFunctions.handleOperationButton("x")
            break;
        case ".":
            calculatorFunctions.handleDecimal();
            break;
        case "Enter":
            calculatorFunctions.handleEqual();
            break
        case "Backspace":
            calculatorFunctions.eraseNumber();
            break
        case "Escape":
            calculatorFunctions.clear();
            break
        case "Delete":
            calculatorFunctions.clearEntry();
            break
        case "Shift":
            calculatorFunctions.handleToggleSign();
            break
        case "ArrowUp":
            calculatorFunctions.handleScroll(e.key);
            break
        case "ArrowDown":
            calculatorFunctions.handleScroll(e.key);
    }
    e.preventDefault();
})







