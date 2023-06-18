export class Avatar {
    constructor(avatarSelector) {
        this._avatar = document.querySelector(avatarSelector);
    }

    setLink(link) {
        this._avatar.removeAttribute('src');
        this._avatar.setAttribute('src', link);
    }
}