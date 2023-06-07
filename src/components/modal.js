class Popup {
     constructor(popupSelector){
        this._element = document.querySelector(popupSelector);
        this.setEventListeners();
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
        _element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    close() {
        _element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners(){
        this._element.querySelector('.popup__button_type_close').addEventListener('click', () => {
            this.close();
        })

        this._element.addEventListener('click', this._closePopupOverlay);
    }
}

export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector)
        this._popupPhotoElement = this._element.querySelector('.popup__photo');
        this._popupTextElement = this._element.querySelector('.popup__description');
    }

    open(link, name) {
        _popupPhotoElement.src = link;
        _popupPhotoElement.setAttribute('alt', name);
        _popupTextElement.textContent = name;
        super.open();
    }
}

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit){
        super(popupSelector)
        this._form = this._element.querySelector('.form');
        this._formSubmit = formSubmit;
    }

    _getInputValues(){
        return this._form.querySelectorAll('input');
    }

    setEventListeners(){
        this._form.addEventListener('submit', this._formSubmit);
        super.setEventListeners();
    }

    open(initValus, validate){
        this._inputs.forEach(i => {
            if(initValus.has(i.name)){
                i.value = initValus.get(i.name);
                validate(i);
            }
        });
        super.open();
    }

    close(){
        this._inputs.forEach(i => i.value = "");
        super.close();
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