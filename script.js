class Calculator {
    constructor(prevInput, currentInput) {
        this.prevInput = prevInput;
        this.currentInput = currentInput
        this.clear();
    }

    clear() {
        this.currentOutcome = '';
        this.prevOutcome = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOutcome = this.currentOutcome.slice(0, -1);
    }

    chooseOperation(operation) {
        if(this.currentOutcome === '') return
        if(this.prevOutcome !== '') {
            this.compute()
        }
        this.operation = operation;
        this.prevOutcome = this.currentOutcome;
        this.currentOutcome = '';
    }

    compute() {
        let computation;
        let prev = parseFloat(this.prevOutcome);
        let curr = parseFloat(this.currentOutcome);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOutcome = computation;
        this.prevOutcome = '';
        this.operation = '';
    }

    addNumber(number) {
        if(number === '.' && this.currentOutcome.includes('.')) return
        this.currentOutcome = this.currentOutcome.toString() + number.toString();
    }

    getDisplayNumber(number) {
        let stringNumber = number.toString()
        let integers = parseFloat(stringNumber.split('.')[0]);
        let decimals = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integers)) {
            integerDisplay = ''
        } else {
            integerDisplay = integers.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if(decimals != null) {
            return `${integerDisplay}.${decimals}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        currentInputElement.innerText = this.getDisplayNumber(this.currentOutcome);
        prevInputElement.innerText = this.prevOutcome;
        if(this.operation != null) {
            prevInputElement.innerText = `${this.prevOutcome} ${this.operation}`;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const prevInputElement = document.querySelector('.prev-input');
const currentInputElement = document.querySelector('.current-input');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(prevInputElement, currentInputElement)

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.addNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(operationButton => {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})