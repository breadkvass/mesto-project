import {insertCard} from './components/card.js';

import {initPopups, openPopup, closePopup} from './components/modal.js';

import {enableValidation, hideInputError} from './components/validate.js'

// Основные grid-карточки
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

window.addEventListener('DOMContentLoaded', function () {

    // Константы Профиля
    const profile = document.querySelector('.profile');
    const profileHeader = profile.querySelector('.profile__header');
    const profileDescription = profile.querySelector('.profile__description');
    const editButton = profile.querySelector('.profile__button_type_edit');

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
        insertCard(gridElements, formLinkAddPlace.value, formNameAddPlace.value, cardClickListener)
        closePopup(popupAddPlace);
        formAddPlace.reset();
    });
    
    // Функция открытия попапа Фото
    const cardClickListener = (link, name) => {
        popupPhotoElement.src = link;
        popupPhotoElement.setAttribute('alt', name);
        popupTextElement.textContent = name;
        openPopup(popupPhotoPlace);
    }
    
    // Добавление предсозданных карточек
    initialCards.forEach((item) => {
        insertCard(gridElements, item.link, item.name, cardClickListener)
    });
})
