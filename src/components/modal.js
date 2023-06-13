class Popup {
     constructor(popupSelector){
        this._element = document.querySelector(popupSelector);
     }

     _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closePopupOverlay(evt) {
        if (this._element.classList.contains('popup_opened')) {
            const popupBorders = this._element.querySelector('.popup__borders');
            const withinPopupBorders = evt.composedPath().includes(popupBorders);
            if (!withinPopupBorders) {
                this.close();
            }
        }
    }

    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
    
    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners(){
        
        this._element.querySelector('.popup__button_type_close').addEventListener('click', this.close.bind(this));

        this._element.addEventListener('click', this._closePopupOverlay.bind(this));
    }
}

export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector)
        this._popupPhotoElement = this._element.querySelector('.popup__photo');
        this._popupTextElement = this._element.querySelector('.popup__description');
    }

    open(link, name) {
        this._popupPhotoElement.src = link;
        this._popupPhotoElement.setAttribute('alt', name);
        this._popupTextElement.textContent = name;
        super.open();
    }
}

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


// export function initPopups() {
//     // Слушатели на закрытие попапов через оверлей и esc
//     document.querySelectorAll('.popup').forEach(popup => {
//         popup.addEventListener('click', closePopupOverlay);

//         const closeButton = popup.querySelector('.popup__button_type_close');
//         closeButton.addEventListener('click', function () {
//             closePopup(popup);
//         })

//     });
// }

// export function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', escapeListener);
// }

// export function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', escapeListener);
// }



// function closePopupOverlay(evt) {
//     const popup = document.querySelector('.popup_opened');
//     if (popup) {
//         const popupBorders = popup.querySelector('.popup__borders');
//         const withinPopupBorders = evt.composedPath().includes(popupBorders);
//         if (!withinPopupBorders) {
//             closePopup(popup);
//         }
//     }
// }