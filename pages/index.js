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

    // константы для функционирования попапа Редактировать профиль
    const profile = document.querySelector('.profile');
    const popupEditProfile = document.querySelector('.popup_editprofile');
    const editButton = profile.querySelector('.profile__button_type_edit');
    const popupContainerEditProfile = popupEditProfile.querySelector('.popup__container');
    const formProfile = popupContainerEditProfile.querySelector('.form');
    const formNameProfile = formProfile.querySelector('.form__input_type_name');
    const formDescriptionProfile = formProfile.querySelector('.form__input_type_description');
    const profileHeader = profile.querySelector('.profile__header');
    const profileDescription = profile.querySelector('.profile__description');
    const closeButtonEditProfile = popupEditProfile.querySelector('.popup__button_type_close');

    // константы для функционирования попапа Новое место
    const popupAddPlace = document.querySelector('.popup_addplace');
    const addButton = profile.querySelector('.profile__button_type_add');
    const closeButtonAddPlace = popupAddPlace.querySelector('.popup__button_type_close');
    const popupContainerAddPlace = popupAddPlace.querySelector('.popup__container');
    const formAddPlace = popupContainerAddPlace.querySelector('.form')
    const formNameAddPlace = formAddPlace.querySelector('.form__input_type_name')
    const formLinkAddPlace = formAddPlace.querySelector('.form__input_type_description');

    const gridElements = document.querySelector('.elements-grid');
    const popupPhotoPlace = document.querySelector('.popup_photo-place');
    const popupPhotoElement = popupPhotoPlace.querySelector('.popup__photo');
    const popupTextElement = popupPhotoPlace.querySelector('.popup__description');
    const closeButtonPhotoPlace = popupPhotoPlace.querySelector('.popup__button_type_close');


    // добавить все карточки из массива на страницу
    initialCards.forEach(function (item) {
        const card = createCard(item.link, item.name);
        gridElements.prepend(card);
    })

    // открытие попапа Редактировать профиль
    editButton.addEventListener('click', function () {
        formNameProfile.value = profileHeader.innerText;
        formDescriptionProfile.value = profileDescription.innerText;
        openPopup(popupEditProfile);
    })

    // сохранить профиль
    function handleProfileFormSubmit(event) {
        event.preventDefault();
        profileHeader.textContent = formNameProfile.value;
        profileDescription.textContent = formDescriptionProfile.value;
        closePopup(popupEditProfile);
    }

    formProfile.addEventListener('submit', handleProfileFormSubmit);

    // закрытие попапа Редактировать профиль
    closeButtonEditProfile.addEventListener('click', function (event) {
        closePopup(popupEditProfile);
    })

    // открытие попапа Добавить место
    addButton.addEventListener('click', function (event) {
        openPopup(popupAddPlace);
    })

    // закрытие попапа Добавить место
    closeButtonAddPlace.addEventListener('click', function () {
        closePopup(popupAddPlace);
    })

    // добавить карточку места
    function handleAddPlaceSubmit(event) {
        event.preventDefault();
        const card = createCard(formLinkAddPlace.value, formNameAddPlace.value);
        gridElements.prepend(card);
        closePopup(popupAddPlace);
        formAddPlace.reset();
    }

    formAddPlace.addEventListener('submit', handleAddPlaceSubmit);

    // Открыть попап
    function openPopup(popup) {
        popup.classList.add('popup_opened');
    }

    // Закрыть попап
    function closePopup(popup) {
        popup.classList.remove('popup_opened');
    }

    // действия с карточками
    function createCard(link, name) {
        const gridTemplate = document.querySelector('#template-grid').content;
        const gridElement = gridTemplate.querySelector('.elements-grid__item').cloneNode(true);
        const likeButton = gridElement.querySelector('.elements-grid__button-like');
        const gridPhoto = gridElement.querySelector('.elements-grid__photo');

        gridPhoto.src = link;
        gridPhoto.setAttribute('alt', name);
        gridElement.querySelector('.elements-grid__name').textContent = name;
        gridElement.querySelector('.elements-grid__button-delete').addEventListener('click', function () {
            gridElement.remove();
        })

        likeButton.addEventListener('click', function () {
            likeButton.classList.toggle('elements-grid__button-like_checked');
        })

        gridPhoto.addEventListener('click', function () {
            popupPhotoElement.src = link;
            popupPhotoElement.setAttribute('alt', name);
            popupTextElement.textContent = name;
            openPopup(popupPhotoPlace);
        })

        return gridElement;
    }

    closeButtonPhotoPlace.addEventListener('click', function () {
        closePopup(popupPhotoPlace);
    })

})
