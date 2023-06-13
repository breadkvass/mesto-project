export class Popup {
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