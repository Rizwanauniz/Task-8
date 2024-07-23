document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (!isNaN(value) || value === '00') {
                handleNumber(value);
            } else if (['+', '-', '*', '/', '×', '÷'].includes(value)) {
                handleOperator(value);
            } else if (value === '=') {
                handleEquals();
            } else if (value === 'C') {
                handleClear();
            } else if (value === '←') {
                handleBackspace();
            } else if (value === '.') {
                handleDot();
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (!isNaN(key)) {
            handleNumber(key);
        } else if (['+', '-', '*', '/', '.', 'Enter', 'Backspace'].includes(key)) {
            if (key === 'Enter') {
                handleEquals();
            } else if (key === 'Backspace') {
                handleBackspace();
            } else if (key === '.') {
                handleDot();
            } else {
                handleOperator(key);
            }
        } else {
            alert('Only numbers are allowed');
        }
    });

    function handleNumber(value) {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }

    function handleOperator(value) {
        if (currentInput !== '') {
            previousInput = currentInput;
            currentInput = '';
            operator = value === '×' ? '*' : value === '÷' ? '/' : value;
        }
    }

    function handleEquals() {
        if (previousInput !== '' && currentInput !== '') {
            let result;
            switch (operator) {
                case '+':
                    result = parseFloat(previousInput) + parseFloat(currentInput);
                    break;
                case '-':
                    result = parseFloat(previousInput) - parseFloat(currentInput);
                    break;
                case '*':
                    result = parseFloat(previousInput) * parseFloat(currentInput);
                    break;
                case '/':
                    result = parseFloat(previousInput) / parseFloat(currentInput);
                    break;
            }
            currentInput = result.toString();
            operator = '';
            previousInput = '';
            updateDisplay(currentInput);
        }
    }

    function handleClear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    function handleBackspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }

    function handleDot() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    }

    function updateDisplay(value) {
        display.value = value;
    }
});