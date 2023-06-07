import '../index.css';
import {handleSubmit, UserInfo} from './utils.js'
import {insertCard} from './card.js';
import {PopupWithForm, PopupWithImage, openPopup, closePopup} from './modal.js';
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
     const editButton = profile.querySelector('.profile .profile__button_type_edit');
    // const profileAvatar = profile.querySelector('.profile__avatar');
    const profileAvatarContainer = profile.querySelector('.profile__avatar-container');

    // константы для функционирования попапа Редактировать профиль
    // const popupEditProfile = document.querySelector('.popup_editprofile');
    // const popupContainerEditProfile = popupEditProfile.querySelector('.popup__container');
    // const formProfile = popupContainerEditProfile.querySelector('.form');
    // const formNameProfile = formProfile.querySelector('.form__input_type_name');
    // const formDescriptionProfile = formProfile.querySelector('.form__input_type_description');
    // const submitButtonProfile = formProfile.querySelector('.popup__button_type_save');

    // константы для функционирования попапа Новое место
    // const popupAddPlace = document.querySelector('.popup_addplace');
     const addButton = profile.querySelector('.popup_addplace .profile__button_type_add');
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
    const popupDeleteQuestion = document.querySelector('.popup_delete-question');
    const formDeleteQuestion = popupDeleteQuestion.querySelector('.form');
    const buttonPopupDeleteQuestion = popupDeleteQuestion.querySelector('.popup__button_type_save');

    initPopups();

    enableValidation(validationConfiguration);

    const formEditProfileSubmit = (event, inputs) => handleSubmit(event,() => userInfo.setUserInfo(inputs,updateUserInfo));
    const formAvatarSubmit = (event, inputs) => handleSubmit(event,() => userInfo.setAvatar(inputs,updateUserAvatar));
    const formAddPlaceSubmit = (event, inputs) => {
        handleSubmit(event, () => {
            [place, link] = inputs;
            return createCard(place, link)
                    .then((data) => {
                        insertCard(gridElements, data, userInfo.getUserInfo(getUserInfo)._id, cardClickListener, deleteHandler, likeHandler);
                    });
        }, 'Создание...');
    }

    // Функция открытия попапа Фото
    const cardClickListener = (link, name) => {
        popupPhotoPlace.open(link, name)
    }

    const validate = (input) => hideInputError(validationConfiguration, input);

    const userInfo = new UserInfo('.profile .profile__header','.profile .profile__description','.profile .profile__avatar');
    const popupEditProfile = new PopupWithForm('.popup_editprofile', formEditProfileSubmit).setEventListeners();
    const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar', formAvatarSubmit).setEventListeners();
    const popupAddPlace = new PopupWithForm('.popup_addplace', formAddPlaceSubmit).setEventListeners();

    const popupPhotoPlace = new PopupWithImage('.popup_photo-place').setEventListeners();

    // открытие попапа Редактировать профиль
    editButton.addEventListener('click', () => {
        const ui = userInfo.getUserInfo(getUserInfo);
        const initValus = new Map();
        initValus.set('form_edit-name',ui.name);
        initValus.set('form_edit-description-name',ui.about);

        popupEditProfile.open(validate, initValus)
    });

    // открытие попапа Обновить аватар
    profileAvatarContainer.addEventListener('click', (event) => {
        const initValus = new Map();
        initValus.set('form_edit-description-name','');

        popupUpdateAvatar.open(validate, initValus)
    })

     // открытие попапа Добавить место
     addButton.addEventListener('click', () => popupAddPlace.open(validate));

  

    // открытие попапа Редактировать профиль
    // editButton.addEventListener('click', () => {
    //     formNameProfile.value = profileHeader.innerText;
    //     hideInputError(validationConfiguration, formNameProfile);
    //     formDescriptionProfile.value = profileDescription.innerText;
    //     hideInputError(validationConfiguration, formDescriptionProfile);
    //     openPopup(popupEditProfile);
    // })
    
    // сохранить профиль
    // formProfile.addEventListener('submit', (event) => {
    //     handleSubmit(event, () => {
    //         return updateUserInfo(formNameProfile.value, formDescriptionProfile.value)
    //                 .then((data) => {
    //                     profileHeader.textContent = data.name;
    //                     profileDescription.textContent = data.about;
    //                     closePopup(popupEditProfile);
    //                 });
    //     });
    // });

    // // открытие попапа Обновить аватар
    // profileAvatarContainer.addEventListener('click', (event) => {
    //     formAvatarLink.value = '';
    //     hideInputError(validationConfiguration, formAvatarLink);
    //     formUpdateAvatar.querySelector('button[type="submit"]').disabled = true;
    //     openPopup(popupUpdateAvatar);
    // })

    // // обновить аватар
    // formUpdateAvatar.addEventListener('submit', (event) => {
    //     handleSubmit(event, () => {
    //         return updateUserAvatar(formAvatarLink.value)
    //                 .then((data) => {
    //                     profileAvatar.src = data.avatar;
    //                     closePopup(popupUpdateAvatar);
    //                 });
    //     });
    // });

    // // открытие попапа Добавить место
    // addButton.addEventListener('click', () => {
    //     formNameAddPlace.value = '';
    //     hideInputError(validationConfiguration, formNameAddPlace);
    //     formLinkAddPlace.value = '';
    //     hideInputError(validationConfiguration, formLinkAddPlace);
    //     formAddPlace.querySelector('button[type="submit"]').disabled = true;
    //     openPopup(popupAddPlace);
    // })

    // // Создание карточки
    // formAddPlace.addEventListener('submit', (event) => {
    //     handleSubmit(event, () => {
    //         return createCard(formLinkAddPlace.value, formNameAddPlace.value)
    //                 .then((data) => {
    //                     insertCard(gridElements, data, userId, cardClickListener, deleteHandler, likeHandler);
    //                     closePopup(popupAddPlace);
    //                 });
    //     }, 'Создание...');
    // });
    
    

    // Функция открытия попапа удаления карточки
    const deleteHandler = (cardId, deleteCallback) => {
        deleteData = {
            cardId: cardId,
            deleteCallback: deleteCallback
        };
        openPopup(popupDeleteQuestion);
    }

    // Удаление карточки
    formDeleteQuestion.addEventListener('submit', (event) => {
        handleSubmit(event, () => {
            return deleteCard(deleteData.cardId)
                    .then(() => {
                        closePopup(popupDeleteQuestion);
                        deleteData.deleteCallback();
                    });
        }, 'Удаление...');
    });

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
    
    userInfo.getUserInfo();

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