const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false ;


function sendNumberValue(number) {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number ;
        awaitingNextValue = false ;
    } else {
        let displayValue = calculatorDisplay.textContent;
        if (displayValue === '0') {
            calculatorDisplay.textContent = number ;
        } else {
            calculatorDisplay.textContent = displayValue + number ;
        };
    }
}

function addDecimal() {
    if (awaitingNextValue) return ;

    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
    
}

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
}
   

function useOperator(operator) {
    if (operatorValue && awaitingNextValue) {
    operatorValue = operator ;
    return;
    }
    let currentValue = Number(calculatorDisplay.textContent);
    if (!firstValue) {
        firstValue = currentValue ; 
    } else {

        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation ;
        firstValue = calculation;
    } 
    awaitingNextValue = true ;
    operatorValue = operator ;
}



inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});


function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNext = false ;
}


    clearBtn.addEventListener('click',() => resetAll());
