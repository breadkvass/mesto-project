import './index.css';
import { handleSubmit } from '../utils/utils.js'
import { UserInfo } from '../components/UserInfo.js'
import { Avatar } from '../components/Avatar.js'
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js'
import { Api } from '../components/Api.js';
import { Section } from '../components/Section.js';


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
let cardSection = null;

window.addEventListener('DOMContentLoaded', function () {

    // Кнопка редактирования профиля
    const editButton = document.querySelector('.profile .profile__button_type_edit');

    // Кнопка редактирования аватара
    const profileAvatarContainer = document.querySelector('.profile__avatar-container');

    // Кнопка открытия попапа добавления места
    const addButton = document.querySelector('.profile .profile__button_type_add');

    const api = new Api('https://nomoreparties.co/v1/plus-cohort-24', '9f994552-1021-4bba-8b8d-5afcdbc277a4');

    //Данные о пользователе
    const userInfo = new UserInfo('.profile .profile__header', '.profile .profile__description');
    const avatar = new Avatar('.profile .profile__avatar');

    // включение валидации для всех форм
    document.querySelectorAll(validationConfiguration.formSelector).forEach(form => {
        const validator = new FormValidator(validationConfiguration, form);
        validator.enableValidation();
    });

    // Попап редактирования данных о пользователе
    const popupEditProfile = new PopupWithForm('.popup_editprofile');
    popupEditProfile.setSubmitHandler((event, inputs) => {
        return handleSubmit(event, () => {
            const [name, about] = inputs;
            return api.updateUserInfo(name, about)
                .then(data => {
                    userInfo.setUserInfo(data);
                    popupEditProfile.close();
                });
        })
    });
    popupEditProfile.setEventListeners();

    // открытие попапа Редактировать профиль
    editButton.addEventListener('click', () => {
        const {name, about} = userInfo.getUserInfo();
        const initValus = new Map([
            ['form_edit-name', name],
            ['form_edit-description', about]
        ]);

        popupEditProfile.disabledSubmitButton();
        popupEditProfile.openWithInitValues(initValus)
    });

    // Попап редактирования Аватара
    const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar');
    popupUpdateAvatar.setSubmitHandler((event, inputs) => {
        return handleSubmit(event, () => {
            const [link] = inputs;
            return api.updateUserAvatar(link)
                .then(data => {
                    avatar.setLink(data.avatar);
                    popupUpdateAvatar.close();
                });
        });
    });
    popupUpdateAvatar.setEventListeners();

    // открытие попапа Обновить аватар
    profileAvatarContainer.addEventListener('click', () => {
        popupUpdateAvatar.disabledSubmitButton();
        popupUpdateAvatar.openWithInitValues();
    })

    const popupPhotoPlace = new PopupWithImage('.popup_photo-place');
    popupPhotoPlace.setEventListeners();

   // Функция открытия попапа Фото
   const cardClickListener = (link, name) => {
        popupPhotoPlace.open(link, name)
    }

    const createCard = (cardData) => {
        const card = new Card('#template-grid', cardData, userId, cardClickListener, deleteHandler, likeHandler);
        const cardElement = card.generate();
        return cardElement;
    }

    const popupAddPlace = new PopupWithForm('.popup_addplace');
    popupAddPlace.setSubmitHandler((event, inputs) => {
        return handleSubmit(event, () => {
            const [place, link] = inputs;
            return api.createCard(link, place)
                    .then((data) => {
                        const cardElement = createCard(data);
                        cardSection.addItem(cardElement);
                        popupAddPlace.close();
                    });
        }, 'Создание...');
    });
    popupAddPlace.setEventListeners();

    // открытие попапа Добавить место
    addButton.addEventListener('click', () => {
        popupAddPlace.disabledSubmitButton();
        popupAddPlace.open();
    });

    // Попап удаления карточки
    const popupDeleteQuestion = new PopupWithForm('.popup_delete-question');
    popupDeleteQuestion.setEventListeners();

    // Функция открытия попапа удаления карточки
    const deleteHandler = (cardId, deleteCallback) => {
        popupDeleteQuestion.setSubmitHandler((event) => {
            return handleSubmit(event, () => {
                return api.deleteCard(cardId)
                        .then(() => {
                            deleteCallback();
                            popupDeleteQuestion.close();
                        })
            }, 'Удаление...');
        });
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
    
    Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
            userId = userData._id;
            userInfo.setUserInfo(userData);
            avatar.setLink(userData.avatar);
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