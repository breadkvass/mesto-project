export class UserInfo{
    constructor(headerSelector, descriptionSelector, avatarSelector){
        this._header = document.querySelector(headerSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector)
    }

    initUserInfo(apiFunction){
        return apiFunction()
        .then((data) => {
            this._header.textContent = data.name;
            this._description.textContent = data.about;
            this._avatar.removeAttribute('src');
            this._avatar.setAttribute('src', data.avatar);
            this._data = {id: data._id, name: data.name, about:data.about, avatar: data.avatar};
        });
    }

    getUserInfo(){
        return this._data;
    }

    updateUserInfo(data) {
        this._data.name = data.name;
        this._data.about = data.about;

        this._header.textContent = data.name;
        this._description.textContent = data.about;
    };

    updateAvatar (data) {
        this._data.avatar = data.avatar;
        this._avatar.src = data.avatar;
    };

    setUserInfo(apiFunction, updateData){
        return apiFunction().then(updateData.bind(this));
    }
}