export function enableValidation(conf) {
    // Включение валидации для всех форм
    document.querySelectorAll(conf.formSelector).forEach(form => {
        // Включение валидации для всех инпутов формы
        form.querySelectorAll(conf.inputSelector).forEach(input => {
            input.addEventListener('input', () => {
                isValid(conf, input);
                isFormValid(conf, form);
            });
        })
    });
}

const isValid = (conf, input) => {
    if (!input.validity.valid) {
        showInputError(conf, input);
    } else {
        hideInputError(conf, input);
    }
}; 

const showInputError = (conf, input) => {
    // console.log('showError', input.validity, input.validationMessage);

    const errorMessage = input.closest('.form__field').querySelector('.form__input-error');
    input.classList.add('form__input_type_error');
    if (input.validity.patternMismatch) {
        errorMessage.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'; 
    } else {
        errorMessage.textContent = input.validationMessage;
    }
    errorMessage.classList.add('form__input-error_active');
};
  
export const hideInputError = (conf, input) => {
    // console.log('hideError', input.validity, input.validationMessage);

    const errorMessage = input.closest('.form__field').querySelector('.form__input-error');
    input.classList.remove('form__input_type_error');
    errorMessage.classList.remove('form__input-error_active');
    errorMessage.textContent = '';
}; 

const isFormValid = (conf, form) => {
    const inputs =  Array.from(form.querySelectorAll('.form__input'));
    const hasInvalidInput = inputs.some(input => {
        return !input.validity.valid;
    })
    form.querySelector('button[type="submit"]').disabled = hasInvalidInput;
}