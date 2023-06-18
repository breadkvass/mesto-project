export class FormValidator {
    constructor(conf, form) {
        this._conf = conf;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(conf.inputSelector));
        this._buttonElement = this._form.querySelector(conf.sumbmitButtonClass);
    }

    enableValidation() {
        // Включение валидации для всех инпутов формы
        
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._isFormValid();
            });
        });
        
        this._form.addEventListener('reset', () => {
            this._inputList.forEach(input => {
                this._hideInputError(input);
            });
        });
    };

    _isValid(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }

    _isFormValid() {
        const hasInvalidInput = this._inputList.some(input => {
            return !input.validity.valid;
        });
        this._buttonElement.disabled = hasInvalidInput;
    };

    _showInputError(input)  {
        const errorMessage = input.closest(this._conf.formFieldSelector).querySelector(this._conf.inputErrorSelector);
        input.classList.add(this._conf.inputErrorClass);
        if (input.validity.patternMismatch) {
            errorMessage.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'; 
        } else {
            errorMessage.textContent = input.validationMessage;
        };
        errorMessage.classList.add(this._conf.inputErrorActiveClass);
    };

    _hideInputError(input) {
        const errorMessage = input.closest(this._conf.formFieldSelector).querySelector(this._conf.inputErrorSelector);
        input.classList.remove(this._conf.inputErrorClass);
        errorMessage.classList.remove(this._conf.inputErrorActiveClass);
        errorMessage.textContent = '';
    }; 
    
}