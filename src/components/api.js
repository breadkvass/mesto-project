export class Api {
    constructor(baseUrl, token) {
      this.baseUrl = baseUrl;
      this.token = token;
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse);
    }

    createCard(link, name) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: link,
                name: name
            })
        })
        .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
        })
        .then(this._checkResponse);
    }

    createCardLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse);
    }

    deleteCardLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
        .then(this._checkResponse);
    }
    
    updateUserInfo([name, about]) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        })
        .then(this._checkResponse);
    }
    
    updateUserAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}
