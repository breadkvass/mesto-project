import '../index.css';
import {handleSubmit, UserInfo} from './utils.js'
import {insertCard} from './card.js';
import {PopupWithForm, PopupWithImage} from './modal.js';
import {enableValidation, hideInputError} from './validate.js'
import {getCards, getUserInfo, updateUserInfo, createCard, createCardLike, deleteCardLike, deleteCard, updateUserAvatar} from './api.js';


const validationConfiguration = {
    formSelector: '.form',
    inputSelector: '.form__input',
    formFieldSelector: '.form__field',
    inputErrorSelector: '.form__input-error',
    inputErrorActiveClass: 'form__input-error_active',
    inputErrorClass: 'form__input_type_error',
    sumbmitButtonClass: 'button[type="submit"]'
}

let userId = null;
let deleteData = null;

window.addEventListener('DOMContentLoaded', function () {

    // Константы Профиля
    // const profile = document.querySelector('.profile');
    // const profileHeader = profile.querySelector('.profile__header');
    // const profileDescription = profile.querySelector('.profile__description');
     const editButton = document.querySelector('.profile .profile__button_type_edit');
    // const profileAvatar = profile.querySelector('.profile__avatar');
    const profileAvatarContainer = document.querySelector('.profile__avatar-container');

    // константы для функционирования попапа Редактировать профиль
    // const popupEditProfile = document.querySelector('.popup_editprofile');
    // const popupContainerEditProfile = popupEditProfile.querySelector('.popup__container');
    // const formProfile = popupContainerEditProfile.querySelector('.form');
    // const formNameProfile = formProfile.querySelector('.form__input_type_name');
    // const formDescriptionProfile = formProfile.querySelector('.form__input_type_description');
    // const submitButtonProfile = formProfile.querySelector('.popup__button_type_save');

    // константы для функционирования попапа Новое место
    // const popupAddPlace = document.querySelector('.popup_addplace');
     const addButton = document.querySelector('.profile .profile__button_type_add');
    // const popupContainerAddPlace = popupAddPlace.querySelector('.popup__container');
    // const formAddPlace = popupContainerAddPlace.querySelector('.form')
    // const formNameAddPlace = formAddPlace.querySelector('.form__input_type_name')
    // const formLinkAddPlace = formAddPlace.querySelector('.form__input_type_description');
    // const submitButtonAddPlace = formAddPlace.querySelector('.popup__button_type_save');

    // константы для функционирования попапа Фото
    const gridElements = document.querySelector('.elements-grid');
    // const popupPhotoPlace = document.querySelector('.popup_photo-place');
    // const popupPhotoElement = popupPhotoPlace.querySelector('.popup__photo');
    // const popupTextElement = popupPhotoPlace.querySelector('.popup__description');

    // константы для функционирования попапа Обновить аватар
    // const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
    // const formUpdateAvatar = popupUpdateAvatar.querySelector('.form');
    // const formAvatarLink = formUpdateAvatar.querySelector('.form__input_type_description');
    // const submitButtonUpdateAvatar = formUpdateAvatar.querySelector('.popup__button_type_save');

    // константы для функционирования попапа Удалить карточку
    // const popupDeleteQuestion = document.querySelector('.popup_delete-question');
    // const formDeleteQuestion = popupDeleteQuestion.querySelector('.form');
    // const buttonPopupDeleteQuestion = popupDeleteQuestion.querySelector('.popup__button_type_save');

    // initPopups();

    enableValidation(validationConfiguration);

    //Данные о пользователе
    const userInfo = new UserInfo('.profile .profile__header','.profile .profile__description','.profile .profile__avatar');

    //Коллбэк сабмита формы редактирования данных о пользователе
    const formEditProfileSubmit = (event, inputs) => handleSubmit(event,() => userInfo.setUserInfo(() => updateUserInfo(inputs), popupEditProfile.updateUserInfo));

    const popupEditProfile = new PopupWithForm('.popup_editprofile', formEditProfileSubmit);
    popupEditProfile.setEventListeners();

    // открытие попапа Редактировать профиль
    editButton.addEventListener('click', () => {
        let data = userInfo.getUserInfo();
        const initValus = new Map();
        initValus.set('form_edit-name', data.name);
        initValus.set('form_edit-description', data.about);

        popupEditProfile.open(validate, initValus)
    });

    const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar', formAvatarSubmit);
    popupUpdateAvatar.setEventListeners();

    const formAvatarSubmit = (event, inputs) => handleSubmit(event,() => userInfo.setAvatar(() => updateUserAvatar(inputs)), popupUpdateAvatar.updateAvatar);

    // открытие попапа Обновить аватар
    profileAvatarContainer.addEventListener('click', () => {
        const initValus = new Map();
        initValus.set('form_edit-description-name','');

        popupUpdateAvatar.open(validate, initValus)
    })

    const popupAddPlace = new PopupWithForm('.popup_addplace', formAddPlaceSubmit).setEventListeners();

    const formAddPlaceSubmit = (event, inputs) => {
        handleSubmit(event, () => {
            [place, link] = inputs;
            return createCard(place, link)
                    .then((data) => {
                        insertCard(gridElements, data, userInfo.getUserInfo().id, cardClickListener, deleteHandler, likeHandler);
                    });
        }, 'Создание...');
    }

    // открытие попапа Добавить место
    addButton.addEventListener('click', () => popupAddPlace.open(validate));

    const popupPhotoPlace = new PopupWithImage('.popup_photo-place').setEventListeners();

    // Функция открытия попапа Фото
    const cardClickListener = (link, name) => {
        popupPhotoPlace.open(link, name)
    }

    const validate = (input) => hideInputError(validationConfiguration, input);

    const popupDeleteQuestion = new PopupWithForm('.popup_delete-question', formDeleteQuestionSubmit).setEventListeners();

    // Функция открытия попапа удаления карточки
    const deleteHandler = (cardId, deleteCallback) => {
        deleteData = {
            cardId: cardId,
            deleteCallback: deleteCallback
        };
        popupDeleteQuestion.open();
    }

    // Удаление карточки
    const formDeleteQuestionSubmit = (event) => {
        handleSubmit(event, () => {
            return deleteCard(deleteData.cardId)
                    .then(() => {
                        popupDeleteQuestion.closePopup();
                        deleteData.deleteCallback();
                    });
        }, 'Удаление...');
    };

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
    
    userInfo.initUserInfo(getUserInfo);

    Promise.all([getCards()])
    .then(([cards]) => {
        cards.forEach(item => {
            insertCard(gridElements, item, userId, cardClickListener, deleteHandler, likeHandler);
        });
    })
    .catch((err) => {
        console.log(err);
    });    
})