import {Popup} from './Popup';

export class PopupWithForm extends Popup {
    constructor(popupSelector){
        super(popupSelector)
        this._form = this._element.querySelector('.form');
        this._inputs = Array.from(this._form.querySelectorAll('input'));
        this._buttonElement = this._element.querySelector('.popup__button_type_save');
    }

    _getInputsValues() {
        return this._inputs.map(i => i.value);
    }

    setSubmitHandler(formSubmitHandler) {
        this._formSubmitHandler = formSubmitHandler;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            this._formSubmitHandler(event, this._getInputsValues());
        });
        super.setEventListeners();
    }

    openWithInitValues(initValus) {
        if (this._inputs && initValus){
            this._inputs.forEach(i => {
                if(initValus.has(i.name)){
                    i.value = initValus.get(i.name);
                }
            });
        }
        super.open();
    }

    disabledSubmitButton() {
        this._buttonElement.disabled = true;
    }

    close() {
        this._form.reset();
        super.close();
    }
}