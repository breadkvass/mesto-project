import {Popup} from './Popup';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit){
        super(popupSelector)
        this._form = this._element.querySelector('.form');
        this._formSubmit = formSubmit;
        this._buttonElement = this._element.querySelector('.popup__button_type_save');
    }

    _getInputsValues(){
        return this._getInputs().map(i => i.value);
    }

    _getInputs(){
        return Array.from(this._form.querySelectorAll('input'));
    }

    setEventListeners(){
        this._form.addEventListener('submit', (event) => {
            this._formSubmit(event, this._getInputsValues()).then(this.close.bind(this));
        });
        super.setEventListeners();
    }

    openWithInitValues(initValus, ){
        if(this._getInputs() && initValus){
            this._getInputs().forEach(i => {
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

    close(){
        this._form.reset();
        super.close();
    }
}