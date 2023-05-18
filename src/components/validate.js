export function enableValidation(conf) {
    // Включение валидации для всех форм
    document.querySelectorAll(conf.formSelector).forEach(form => {
        // Включение валидации для всех инпутов формы
        form.querySelectorAll(conf.inputSelector).forEach(input => {
            input.addEventListener('input', () => {
                isValid(conf, input);
                isFormValid(conf, form);
            });
        });
    });
};

const isValid = (conf, input) => {
    if (!input.validity.valid) {
        showInputError(conf, input);
    } else {
        hideInputError(conf, input);
    }
}; 

const showInputError = (conf, input) => {
    const errorMessage = input.closest(conf.formFieldSelector).querySelector(conf.inputErrorSelector);
    input.classList.add(conf.inputErrorClass);
    if (input.validity.patternMismatch) {
        errorMessage.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'; 
    } else {
        errorMessage.textContent = input.validationMessage;
    };
    errorMessage.classList.add(conf.inputErrorActiveClass);
};
  
export const hideInputError = (conf, input) => {
    const errorMessage = input.closest(conf.formFieldSelector).querySelector(conf.inputErrorSelector);
    input.classList.remove(conf.inputErrorClass);
    errorMessage.classList.remove(conf.inputErrorActiveClass);
    errorMessage.textContent = '';
}; 

const isFormValid = (conf, form) => {
    const inputs =  Array.from(form.querySelectorAll(conf.inputSelector));
    const hasInvalidInput = inputs.some(input => {
        return !input.validity.valid;
    });
    form.querySelector(conf.sumbmitButtonClass).disabled = hasInvalidInput;
};