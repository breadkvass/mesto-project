export class Card {
    constructor(templateSelector, item, userId, photoClickListener, deleteClickListener, likeClickListener) {
        this._templateSelector = templateSelector;
        this._item = item;
        this._userId = userId;
        this._photoClickListener = photoClickListener;
        this._deleteClickListener = deleteClickListener;
        this._likeClickListener = likeClickListener;
    }

    _getCard() {
        return document
                .querySelector(this._templateSelector)
                .content
                .querySelector('.elements-grid__item')
                .cloneNode(true);
    }

    generate() {
        this._element = this._getCard();
        const gridPhoto = this._photo();

        gridPhoto.src = this._item.link;
        gridPhoto.setAttribute('alt', this._item.name);
        this._element.querySelector('.elements-grid__name').textContent = this._item.name;
        this._likeCounter().textContent = this._item.likes.length;

        
        if (this._item.owner._id !== this._userId) {
            this._deleteButton().remove();
        }

        this._likeButton().classList.toggle('elements-grid__button-like_checked', this._hasMyLike(this._item.likes));

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton().addEventListener('click', () => {
            this._likeHandler();
        });

        this._deleteButton()?.addEventListener('click', () => {
            this._deleteHandler();
        });

        this._photo().addEventListener('click', () => {
            this._photoClickHandler();
        });
    }

    _likeHandler() {
        this._likeClickListener(this._item._id, this._isLiked(), (likes) => {
            this._likeButton().classList.toggle('elements-grid__button-like_checked', this._hasMyLike(likes));
            this._likeCounter().textContent = likes.length;
        });
    }

    _deleteHandler() {
        this._deleteClickListener(this._item._id, () => this._element.remove());
    }

    _photoClickHandler(){
        this._photoClickListener(this._item.link, this._item.name);
    }

    _hasMyLike(likes) {
        return likes.filter(user => user._id == this._userId).length > 0
    }
    
    _isLiked() {
        return this._likeButton().classList.contains('elements-grid__button-like_checked');
    }

    _likeButton() {
        return this._element.querySelector('.elements-grid__button-like');
    }

    _deleteButton() {
        return this._element.querySelector('.elements-grid__button-delete');
    }

    _photo() {
        return this._element.querySelector('.elements-grid__photo');
    }

    _likeCounter() {
        return this._element.querySelector('.elements-grid__like-counter');
    }
}
