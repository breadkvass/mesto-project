const apiUrl = 'https://nomoreparties.co/v1/plus-cohort-24';
const token = '9f994552-1021-4bba-8b8d-5afcdbc277a4';

export function getCards() {
    return fetch(`${apiUrl}/cards`, {
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function createCard(link, name) {
    return fetch(`${apiUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: link,
            name: name
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function deleteCard (cardId) {
    return fetch(`${apiUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function createCardLike(cardId) {
    return fetch(`${apiUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function deleteCardLike(cardId) {
    return fetch(`${apiUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function getUserInfo() {
    return fetch(`${apiUrl}/users/me`, {
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function updateUserInfo(name, about) {
    return fetch(`${apiUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function updateUserAvatar(link) {
    return fetch(`${apiUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}