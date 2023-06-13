import '../index.css';
import { handleSubmit } from './utils.js'
import { UserInfo } from './UserInfo.js'
import { Card } from './Card.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { FormValidator } from './FormValidator.js'
import { Api } from './Api.js';
import { Section } from './Section.js';


const validationConfiguration = {
    formSelector: '.form',
    inputSelector: '.form__input',
    formFieldSelector: '.form__field',
    inputErrorSelector: '.form__input-error',
    inputErrorActiveClass: 'form__input-error_active',
    inputErrorClass: 'form__input_type_error',
    sumbmitButtonClass: 'button[type="submit"]'
}

let deleteData = null;
let cardSection = null;

window.addEventListener('DOMContentLoaded', function () {

    // Константы Профиля
    const editButton = document.querySelector('.profile .profile__button_type_edit');
    const profileAvatarContainer = document.querySelector('.profile__avatar-container');

    // константы для функционирования попапа Новое место
    const addButton = document.querySelector('.profile .profile__button_type_add');

    // константы для функционирования попапа Фото
    const gridElements = document.querySelector('.elements-grid');

    const api = new Api('https://nomoreparties.co/v1/plus-cohort-24', '9f994552-1021-4bba-8b8d-5afcdbc277a4');

    // включение валидации для всех форм
    document.querySelectorAll(validationConfiguration.formSelector).forEach(form => {
        const validator = new FormValidator(validationConfiguration, form);
        validator.enableValidation();
    });

    //Данные о пользователе
    const userInfo = new UserInfo('.profile .profile__header','.profile .profile__description','.profile .profile__avatar');

    //Коллбэк сабмита формы редактирования данных о пользователе
    const formEditProfileSubmit = (event, inputs) => {
        handleSubmit(event,() => userInfo.setUserInfo(() => {
            return api.updateUserInfo(inputs)
        }, userInfo.updateUserInfo))
    };

    const popupEditProfile = new PopupWithForm('.popup_editprofile', formEditProfileSubmit);
    popupEditProfile.setEventListeners();

    // открытие попапа Редактировать профиль
    editButton.addEventListener('click', () => {
        let data = userInfo.getUserInfo();
        const initValus = new Map();
        initValus.set('form_edit-name', data.name);
        initValus.set('form_edit-description', data.about);

        popupEditProfile.open(initValus)
    });

    const formAvatarSubmit = (event, inputs) => {
        handleSubmit(event,() => {
            return userInfo.setUserInfo(() => api.updateUserAvatar(inputs), userInfo.updateAvatar)
        })
    };

    const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar', formAvatarSubmit);
    popupUpdateAvatar.setEventListeners();

    // открытие попапа Обновить аватар
    profileAvatarContainer.addEventListener('click', () => {
        const initValus = new Map();
        initValus.set('form_place-description',userInfo.getUserInfo().avatar);

        popupUpdateAvatar.open(initValus)
    })

    const popupPhotoPlace = new PopupWithImage('.popup_photo-place');
    popupPhotoPlace.setEventListeners();

   // Функция открытия попапа Фото
   const cardClickListener = (link, name) => {
        popupPhotoPlace.open(link, name)
    }

    const formAddPlaceSubmit = (event, inputs) => {
        handleSubmit(event, () => {
            let [place, link] = inputs;
            return api.createCard(link, place)
                    .then((data) => {
                        const cardElement = createCard(data);
                        cardSection.addItem(cardElement);
                    });
        }, 'Создание...');
    }

    const createCard = (cardData) => {
        const card = new Card('#template-grid', cardData, userInfo.getUserInfo().id, cardClickListener, deleteHandler, likeHandler);
        const cardElement = card.generate();
        return cardElement;
    }

    const popupAddPlace = new PopupWithForm('.popup_addplace', formAddPlaceSubmit);
    popupAddPlace.setEventListeners();

    // открытие попапа Добавить место
    addButton.addEventListener('click', () => popupAddPlace.open());

    // Удаление карточки
    const formDeleteQuestionSubmit = (event) => {
        handleSubmit(event, () => {
            return api.deleteCard(deleteData.cardId)
                    .then(() => {
                        deleteData.deleteCallback();
                    });
        }, 'Удаление...');
    };

    const popupDeleteQuestion = new PopupWithForm('.popup_delete-question', formDeleteQuestionSubmit);
    popupDeleteQuestion.setEventListeners();

    // Функция открытия попапа удаления карточки
    const deleteHandler = (cardId, deleteCallback) => {
        deleteData = {
            cardId: cardId,
            deleteCallback: deleteCallback
        };
        popupDeleteQuestion.open();
    }

    const likeHandler = (cardId, liked, likeCallback) => {
        if (liked) {
            api.deleteCardLike(cardId)
            .then(data => {
                likeCallback(data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            api.createCardLike(cardId)
            .then(data => {
                likeCallback(data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    userInfo.initUserInfo(api.getUserInfo.bind(api))

    Promise.all([api.getCards()])
    .then(([cards]) => {
        cardSection = new Section({
            items: cards,
            renderer: item => {
                return createCard(item);
            }
        }, '.elements-grid');
        
        cardSection.render();
    })
    .catch((err) => {
        console.log(err);
    });    
});