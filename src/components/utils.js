import { EPSILON } from "core-js/core/number";

export function checkResponse(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}
  
export function handleSubmit(evt, request, loadingText = "Сохранение...") {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);

    request()
        .then(() => evt.target.reset())
        .catch((err) => console.error(`Ошибка: ${err}`))
        .finally(() => renderLoading(false, submitButton, initialText));
}

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
    }
}

export class UserInfo{
    constructor(headerSelector, descriptionSelector, avatarSelector){
        this._header = document.querySelector(headerSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector)
    }

    getUserInfo(apiFunction){
        apiFunction()
        .then((data) =>{
            this._header.textContent = data.name;
            this._description.textContent = data.about;
            this._avatar.removeAttribute('src');
            this._avatar.setAttribute('src', data.avatar);

            return data;
        });
    }

    setUserInfo([header, description], apiFunction){
        return apiFunction(header, description)
            .then((data) => {
                this._header.textContent = data.name;
                this._description.textContent = data.about;
            });
    }

    setAvatar([link], apiFunction){
        apiFunction(link)
        .then((data) => {
            this._avatar.src = data.avatar;
        });
    }
}