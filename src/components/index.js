import '../index.css';

import {insertCard} from './card.js';

import {initPopups, openPopup, closePopup} from './modal.js';

import {enableValidation, hideInputError} from './validate.js'

import { getCards, getUserInfo, updateUserInfo, createCard, createCardLike, deleteCardLike, deleteCard, updateUserAvatar } from './api';

let userId = null;

window.addEventListener('DOMContentLoaded', function () {

    // Константы Профиля
    const profile = document.querySelector('.profile');
    const profileHeader = profile.querySelector('.profile__header');
    const profileDescription = profile.querySelector('.profile__description');
    const editButton = profile.querySelector('.profile__button_type_edit');
    const profileAvatar = profile.querySelector('.profile__avatar');
    const profileAvatarContainer = profile.querySelector('.profile__avatar-container');

    // константы для функционирования попапа Редактировать профиль
    const popupEditProfile = document.querySelector('.popup_editprofile');
    const popupContainerEditProfile = popupEditProfile.querySelector('.popup__container');
    const formProfile = popupContainerEditProfile.querySelector('.form');
    const formNameProfile = formProfile.querySelector('.form__input_type_name');
    const formDescriptionProfile = formProfile.querySelector('.form__input_type_description');
    const submitButtonProfile = formProfile.querySelector('.popup__button_type_save');

    // константы для функционирования попапа Новое место
    const popupAddPlace = document.querySelector('.popup_addplace');
    const addButton = profile.querySelector('.profile__button_type_add');
    const popupContainerAddPlace = popupAddPlace.querySelector('.popup__container');
    const formAddPlace = popupContainerAddPlace.querySelector('.form')
    const formNameAddPlace = formAddPlace.querySelector('.form__input_type_name')
    const formLinkAddPlace = formAddPlace.querySelector('.form__input_type_description');
    const submitButtonAddPlace = formAddPlace.querySelector('.popup__button_type_save');

    // константы для функционирования попапа Фото
    const gridElements = document.querySelector('.elements-grid');
    const popupPhotoPlace = document.querySelector('.popup_photo-place');
    const popupPhotoElement = popupPhotoPlace.querySelector('.popup__photo');
    const popupTextElement = popupPhotoPlace.querySelector('.popup__description');

    // константы для функционирования попапа Обновить аватар
    const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
    const formUpdateAvatar = popupUpdateAvatar.querySelector('.form');
    const formAvatarLink = formUpdateAvatar.querySelector('.form__input_type_description');
    const submitButtonUpdateAvatar = formUpdateAvatar.querySelector('.popup__button_type_save');

    // константы для функционирования попапа Удалить карточку
    const popupDeleteQuestion = document.querySelector('.popup_delete-question');
    const buttonPopupDeleteQuestion = popupDeleteQuestion.querySelector('.popup__button_type_save');

    initPopups();

    const validationConfiguration = {
        formSelector: '.form',
        inputSelector: '.form__input',
        formFieldSelector: '.form__field',
        inputErrorSelector: '.form__input-error',
        inputErrorActiveClass: 'form__input-error_active',
        inputErrorClass: 'form__input_type_error',
        sumbmitButtonClass: 'button[type="submit"]'
    }

    enableValidation(validationConfiguration);

    // открытие попапа Редактировать профиль
    editButton.addEventListener('click', () => {
        formNameProfile.value = profileHeader.innerText;
        hideInputError(validationConfiguration, formNameProfile);
        formDescriptionProfile.value = profileDescription.innerText;
        hideInputError(validationConfiguration, formDescriptionProfile);
        openPopup(popupEditProfile);
    })

    // сохранить профиль
    formProfile.addEventListener('submit', (event) => {
        event.preventDefault();
        submitButtonProfile.textContent = 'Сохранение...';
        // отправка данных на сервер
        updateUserInfo(formNameProfile.value, formDescriptionProfile.value)
        .then(data => {
            profileHeader.textContent = data.name;
            profileDescription.textContent = data.about;
            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButtonProfile.textContent = 'Создать';
        });
    });

    // открытие попапа Обновить аватар
    profileAvatarContainer.addEventListener('click', evt => {
        formAvatarLink.value = '';
        hideInputError(validationConfiguration, formAvatarLink);
        openPopup(popupUpdateAvatar);
    })

    // обновить аватар
    formUpdateAvatar.addEventListener('submit', (event) => {
        event.preventDefault();
        submitButtonUpdateAvatar.textContent = 'Сохранение...';
        // отправка данных на сервер
        updateUserAvatar(formAvatarLink.value)
        .then(data => {
            profileAvatar.src = formAvatarLink.value;
            closePopup(popupUpdateAvatar);
            formUpdateAvatar.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButtonUpdateAvatar.textContent = 'Сохранить';
        });
        
    });  

    // открытие попапа Добавить место
    addButton.addEventListener('click', () => {
        formNameAddPlace.value = '';
        hideInputError(validationConfiguration, formNameAddPlace);
        formLinkAddPlace.value = '';
        hideInputError(validationConfiguration, formLinkAddPlace);
        formAddPlace.querySelector('button[type="submit"]').disabled = true;
        openPopup(popupAddPlace);
    })

    formAddPlace.addEventListener('submit', (event) => {
        event.preventDefault();
        submitButtonAddPlace.textContent = 'Создание...';
        createCard(formLinkAddPlace.value, formNameAddPlace.value)
        .then(data => {
            insertCard(gridElements, data, userId, cardClickListener, deleteHandler, likeHandler);
            closePopup(popupAddPlace);
            formAddPlace.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButtonAddPlace.textContent = 'Создать';
        }); 
    });
    
    // Функция открытия попапа Фото
    const cardClickListener = (link, name) => {
        popupPhotoElement.src = link;
        popupPhotoElement.setAttribute('alt', name);
        popupTextElement.textContent = name;
        openPopup(popupPhotoPlace);
    }

    

    const deleteHandler = (cardId, deleteCallback) => {
        openPopup(popupDeleteQuestion);
        buttonPopupDeleteQuestion.addEventListener('click', evt => {
            deleteCard(cardId)
            .then(data => {
                popupDeleteQuestion.classList.remove('popup_opened');
                deleteCallback();
            })
            .catch((err) => {
                console.log(err);
            });
        })
    }

    const likeHandler = (cardId, liked, likeCallback) => {
        if (liked) {
            deleteCardLike(cardId)
            .then(data => {
                likeCallback(data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            createCardLike(cardId)
            .then(data => {
                likeCallback(data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
    
    getUserInfo()
    .then(data => {
        profileHeader.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.removeAttribute('src');
        profileAvatar.setAttribute('src', data.avatar);
        userId = data._id;
    })
    .catch((err) => {
        console.log(err);
    });

    getCards().then(data => {
        data.forEach(item => {
            insertCard(gridElements, item, userId, cardClickListener, deleteHandler, likeHandler);
        });
    })
    .catch((err) => {
        console.log(err);
    });



    
})