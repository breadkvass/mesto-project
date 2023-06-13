import {Popup} from './Popup';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit){
        super(popupSelector)
        this._form = this._element.querySelector('.form');
        this._formSubmit = formSubmit;
    }

    _getInputsValues(){
        return this._getInputs().map(i => i.value);
    }

    _getInputs(){
        return Array.from(this._form.querySelectorAll('input'));
    }

    setEventListeners(){
        this._form.addEventListener('submit', (event) => {
            this._formSubmit(event, this._getInputsValues())
            this.close();
        });
        super.setEventListeners();
    }

    open(initValus){
        if(this._getInputs() && initValus){
            this._getInputs().forEach(i => {
                if(initValus.has(i.name)){
                    i.value = initValus.get(i.name);
                }
            });
        }
        super.open();
    }

    close(){
        this._reset.bind(this);
        super.close();
    }

    _reset(){
        this._getInputs().forEach(i => i.value = "");
    }
}