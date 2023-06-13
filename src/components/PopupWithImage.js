import { Popup } from './Popup.js';

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