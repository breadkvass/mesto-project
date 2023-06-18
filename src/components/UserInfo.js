export class UserInfo {
    constructor(headerSelector, descriptionSelector, avatarSelector) {
        this._header = document.querySelector(headerSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector)
    }

    setUserInfo({name, about}) {
        this._header.textContent = name;
        this._description.textContent = about;
    }

    getUserInfo() {
        return {
            name: this._header.innerText,
            about: this._description.innerText
        }
    }
}