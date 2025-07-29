class BaseConverter {
    constructor() {
        this.currentValue = 0;
        this.activeInput = null;
        this.bases = {
            binary: { id: 'binary', base: 2, indicator: '₂', maxDigits: 32 },
            octal: { id: 'octal', base: 8, indicator: '₈', maxDigits: 11 },
            decimal: { id: 'decimal', base: 10, indicator: '₁₀', maxDigits: 10 },
            hex: { id: 'hex', base: 16, indicator: '₁₆', maxDigits: 8 },
            roman: { id: 'roman', base: 'roman', indicator: 'ℝ', maxValue: 3999 }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAllDisplays();
    }

    setupEventListeners() {
        // Input field listeners
        Object.keys(this.bases).forEach(baseType => {
            const input = document.getElementById(`${baseType}Input`);
            if (input) {
                input.addEventListener('input', (e) => this.handleInput(e, baseType));
                input.addEventListener('focus', (e) => this.setActiveInput(baseType));
                input.addEventListener('keydown', (e) => this.handleKeydown(e, baseType));
            }
        });

        // Checkbox listeners
        document.getElementById('showBinary').addEventListener('change', (e) => 
            this.toggleSystem('binarySystem', e.target.checked));
        document.getElementById('showOctal').addEventListener('change', (e) => 
            this.toggleSystem('octalSystem', e.target.checked));
        document.getElementById('showDecimal').addEventListener('change', (e) => 
            this.toggleSystem('decimalSystem', e.target.checked));
        document.getElementById('showHex').addEventListener('change', (e) => 
            this.toggleSystem('hexSystem', e.target.checked));
        document.getElementById('showRoman').addEventListener('change', (e) => 
            this.toggleSystem('romanSystem', e.target.checked));

        // Button listeners
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('plusOneBtn').addEventListener('click', () => this.increment());
        document.getElementById('minusOneBtn').addEventListener('click', () => this.decrement());
    }

    handleInput(event, baseType) {
        const input = event.target;
        let value = input.value.toUpperCase();
        
        // Validate input
        if (!this.isValidInput(value, baseType)) {
            input.classList.add('is-invalid');
            this.showError(input, `Ungültige Eingabe für ${this.getBaseLabel(baseType)}`);
            return;
        }

        input.classList.remove('is-invalid');
        this.hideError(input);
        this.setActiveInput(baseType);

        if (value === '') {
            this.currentValue = 0;
        } else {
            if (baseType === 'roman') {
                this.currentValue = this.romanToDecimal(value);
            } else {
                //wandelt eine Eingabe (12) in einer spezifischen base (16) in einen Dezimalzahl um -> 18
                this.currentValue = parseInt(value, this.bases[baseType].base);
            }
        }

        this.updateAllDisplays();
    }

    handleKeydown(event, baseType) {
        // Allow backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].includes(event.keyCode) ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (event.keyCode === 65 && event.ctrlKey) ||
            (event.keyCode === 67 && event.ctrlKey) ||
            (event.keyCode === 86 && event.ctrlKey) ||
            (event.keyCode === 88 && event.ctrlKey) ||
            // Allow home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }

        const char = String.fromCharCode(event.keyCode);
        if (!this.isValidChar(char, baseType)) {
            event.preventDefault();
        }
    }

    isValidInput(value, baseType) {
        if (value === '') return true;
        
        const validChars = this.getValidChars(baseType);
        return [...value].every(char => validChars.includes(char));
    }

    isValidChar(char, baseType) {
        const validChars = this.getValidChars(baseType);
        return validChars.includes(char.toUpperCase());
    }

    getValidChars(baseType) {
        switch (baseType) {
            case 'binary': return ['0', '1'];
            case 'octal': return ['0', '1', '2', '3', '4', '5', '6', '7'];
            case 'decimal': return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            case 'hex': return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
            case 'roman': return ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
            default: return [];
        }
    }

    getBaseLabel(baseType) {
        switch (baseType) {
            case 'binary': return 'Binärsystem';
            case 'octal': return 'Oktalsystem';
            case 'decimal': return 'Dezimalsystem';
            case 'hex': return 'Hexadezimalsystem';
            case 'roman': return 'Römisches Zahlensystem';
            default: return '';
        }
    }

    setActiveInput(baseType) {
        this.activeInput = baseType;
    }


    reset() {
        this.currentValue = 0;
        this.activeInput = null;
        
        // Clear all inputs
        Object.keys(this.bases).forEach(baseType => {
            const input = document.getElementById(`${baseType}Input`);
            if (input) {
                input.value = '';
                input.classList.remove('is-invalid');
                this.hideError(input);
            }
        });

        this.updateAllDisplays();
    }

    increment() {
        this.currentValue = Math.max(0, this.currentValue + 1);
        this.updateAllDisplays();
        this.animateUpdate();
    }

    decrement() {
        this.currentValue = Math.max(0, this.currentValue - 1);
        this.updateAllDisplays();
        this.animateUpdate();
    }

    updateAllDisplays() {
        Object.keys(this.bases).forEach(baseType => {
            this.updateDisplay(baseType);
            this.updateInput(baseType);
        });
    }

    updateDisplay(baseType) {
        const display = document.getElementById(`${baseType}Display`);
        if (!display) return;

        const baseInfo = this.bases[baseType];
        let convertedValue;
        
        if (baseType === 'roman') {
            convertedValue = this.decimalToRoman(this.currentValue);
        } else {
            //wandelt den aktuellen wert in das gewünschte Zahlensystem (base) um.
            convertedValue = this.currentValue.toString(baseInfo.base).toUpperCase();
        }
        
        // Clear previous content
        display.innerHTML = '';

        if (this.currentValue === 0) {
            if (baseType === 'roman') {
                this.createDigitBox(display, 'N');
            } else {
                this.createDigitBox(display, '0');
            }
        } else {
            // Create digit boxes for each character
            [...convertedValue].forEach(char => {
                this.createDigitBox(display, char);
            });
        }
    }

    createDigitBox(container, digit) {
        const digitBox = document.createElement('div');
        digitBox.className = 'digit-box';
        digitBox.textContent = digit;
        container.appendChild(digitBox);
    }


    updateInput(baseType) {
        const input = document.getElementById(`${baseType}Input`);
        if (!input) return;

        // Only update if this is not the active input to avoid cursor jumping
        if (this.activeInput !== baseType) {
            const baseInfo = this.bases[baseType];
            let convertedValue;
            
            if (baseType === 'roman') {
                convertedValue = this.decimalToRoman(this.currentValue);
            } else {
                convertedValue = this.currentValue.toString(baseInfo.base).toUpperCase();
            }
            
            input.value = convertedValue;
        }
    }

    toggleSystem(systemId, show) {
        const system = document.getElementById(systemId);
        if (system) {
            if (show) {
                system.classList.remove('hidden');
            } else {
                system.classList.add('hidden');
            }
        }
    }

    animateUpdate() {
        document.querySelectorAll('.digit-box').forEach(box => {
            box.classList.add('updated');
            setTimeout(() => box.classList.remove('updated'), 300);
        });
    }

    showError(input, message) {
        this.hideError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    hideError(input) {
        const existingError = input.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    // Roman numeral conversion functions
    romanToDecimal(roman) {
        const romanMap = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        };
        
        let result = 0;
        let prevValue = 0;
        
        for (let i = roman.length - 1; i >= 0; i--) {
            const currentValue = romanMap[roman[i]];
            
            if (currentValue < prevValue) {
                result -= currentValue;
            } else {
                result += currentValue;
            }
            
            prevValue = currentValue;
        }
        
        return Math.max(0, Math.min(result, 3999));
    }
    
    decimalToRoman(num) {
        if (num === 0) return 'N';
        if (num > 3999) return 'INVALID';
        
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
        
        let result = '';
        
        for (let i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result += symbols[i];
                num -= values[i];
            }
        }
        
        return result;
    }
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
                
                // Check for updates every time the app loads
                registration.addEventListener('updatefound', function() {
                    console.log('Service Worker update found');
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', function() {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New service worker installed, reloading page');
                            window.location.reload();
                        }
                    });
                });
                
                // Check for updates immediately
                registration.update();
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const app = new BaseConverter();
    
    // Make app globally accessible for debugging
    window.baseConverter = app;
});