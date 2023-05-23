import '../index.css';

import {insertCard} from './card.js';

import {initPopups, openPopup, closePopup} from './modal.js';

import {enableValidation, hideInputError} from './validate.js'

import { getCards, getUserInfo, updateUserInfo, createCard, createCardLike, deleteCardLike } from './api';

let userId = null;

window.addEventListener('DOMContentLoaded', function () {

    // Константы Профиля
    const profile = document.querySelector('.profile');
    const profileHeader = profile.querySelector('.profile__header');
    const profileDescription = profile.querySelector('.profile__description');
    const editButton = profile.querySelector('.profile__button_type_edit');
    const profileAvatar = profile.querySelector('.profile__avatar');

    // константы для функционирования попапа Редактировать профиль
    const popupEditProfile = document.querySelector('.popup_editprofile');
    const popupContainerEditProfile = popupEditProfile.querySelector('.popup__container');
    const formProfile = popupContainerEditProfile.querySelector('.form');
    const formNameProfile = formProfile.querySelector('.form__input_type_name');
    const formDescriptionProfile = formProfile.querySelector('.form__input_type_description');

    // константы для функционирования попапа Новое место
    const popupAddPlace = document.querySelector('.popup_addplace');
    const addButton = profile.querySelector('.profile__button_type_add');
    const popupContainerAddPlace = popupAddPlace.querySelector('.popup__container');
    const formAddPlace = popupContainerAddPlace.querySelector('.form')
    const formNameAddPlace = formAddPlace.querySelector('.form__input_type_name')
    const formLinkAddPlace = formAddPlace.querySelector('.form__input_type_description');

    // константы для функционирования попапа Фото
    const gridElements = document.querySelector('.elements-grid');
    const popupPhotoPlace = document.querySelector('.popup_photo-place');
    const popupPhotoElement = popupPhotoPlace.querySelector('.popup__photo');
    const popupTextElement = popupPhotoPlace.querySelector('.popup__description');

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
        profileHeader.textContent = formNameProfile.value;
        profileDescription.textContent = formDescriptionProfile.value;
        closePopup(popupEditProfile);
        // отправка данных на сервер
        updateUserInfo(formNameProfile.value, formDescriptionProfile.value).then(data => {
            console.log('отправка данных на сервер', data);
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
        closePopup(popupAddPlace);
        createCard(formLinkAddPlace.value, formNameAddPlace.value)
            .then(data => {
                insertCard(gridElements, data, true, cardClickListener, deleteHandler, likeHandler);
            })
            .catch((err) => {
                console.log(err);
            }); 
        formAddPlace.reset();
    });
    
    // Функция открытия попапа Фото
    const cardClickListener = (link, name) => {
        popupPhotoElement.src = link;
        popupPhotoElement.setAttribute('alt', name);
        popupTextElement.textContent = name;
        openPopup(popupPhotoPlace);
    }

    const popupDeleteQuestion = document.querySelector('.popup_delete-question');
    const saveButtonPopupDeleteQuestion = popupDeleteQuestion.querySelector('.popup__button_type_save');

    const deleteHandler = (deleteCallback) => {
        popupDeleteQuestion.classList.add('popup_opened');
        saveButtonPopupDeleteQuestion.addEventListener('click', evt => {
            popupDeleteQuestion.classList.remove('popup_opened');
            deleteCallback();
        })
    }

    const likeHandler = (cardId, liked, likeCallback) => {
        if (liked) {
            console.log('unlike');
            deleteCardLike(cardId)
            .then(data => {
                likeCallback(data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            console.log('like');
            createCardLike(cardId)
            .then(data => {
                likeCallback(data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
    
    getUserInfo().then(data => {
        console.log('user info', data);
        profileHeader.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.removeAttribute('src');
        profileAvatar.setAttribute('src', data.avatar);
        userId = data._id;
    })

    getCards().then(data => {
        console.log('request cards', data);
        console.log('deleteHandler', deleteHandler);
        data.forEach(item => {
            insertCard(gridElements, item, userId, cardClickListener, deleteHandler, likeHandler)
        });
    });



    
})