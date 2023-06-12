import { checkResponse } from "./utils";

const apiUrl = 'https://nomoreparties.co/v1/plus-cohort-24';
const token = '68fdd3a9-a749-43e0-ad66-26fdd6a6cb73';

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

export function createCard(name, link) {
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
    .then(checkResponse);
}

export function deleteCard (cardId) {
    return fetch(`${apiUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
    })
    .then(checkResponse);
}

export function createCardLike(cardId) {
    return fetch(`${apiUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(checkResponse);
}

export function deleteCardLike(cardId) {
    return fetch(`${apiUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(checkResponse);
}

export function getUserInfo() {
    return fetch(`${apiUrl}/users/me`, {
        headers: {
            authorization: token
        }
    })
    .then(checkResponse);
}

export function updateUserInfo([name, about]) {
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
    .then(checkResponse);
}

export function updateUserAvatar([link]) {
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
    .then(checkResponse);
}