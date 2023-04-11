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

const popup = document.querySelector('.popup');


window.addEventListener('DOMContentLoaded', function() {

    // добавить все карточки из массива на страницу
    initialCards.forEach(function (item) {
        addPlace(item.link, item.name);
    })

    // открытие попапа Редактировать профиль
    const profile = document.querySelector('.profile');
    const popupEditProfile = document.querySelector('.popup_editprofile');
    const editButton = profile.querySelector('.profile__button_type_edit');
    editButton.addEventListener('click', function() {
        openPopup(popupEditProfile);
    })


    // сохранить профиль
    const popupContainerEditProfile = popupEditProfile.querySelector('.popup__container');

    const formProfile = popupContainerEditProfile.querySelector('.form');
    const formNameProfile = formProfile.querySelector('.form__input_type_name');
    const formDescriptionProfile = formProfile.querySelector('.form__input_type_description');

    function profileSave(event) {
        event.preventDefault();
        const profileHeader = profile.querySelector('.profile__header');
        const profileDescription = profile.querySelector('.profile__description');
        profileHeader.textContent = formNameProfile.value;
        profileDescription.textContent = formDescriptionProfile.value;
        closePopup(popupEditProfile);
    }

    formProfile.addEventListener('submit', profileSave);

    // закрытие попапа Редактировать профиль
    const closeButtonEditProfile = popupEditProfile.querySelector('.popup__button_type_close');
    closeButtonEditProfile.addEventListener('click', function (event) {
        popupEditProfile.classList.remove('popup_opened');
    })

    // открытие попапа Добавить место
    const popupAddPlace = document.querySelector('.popup_addplace');
    const addButton = profile.querySelector('.profile__button_type_add');
    addButton.addEventListener('click', function(event) {
        openPopup(popupAddPlace);
    })

    // закрытие попапа Добавить место
    const closeButtonAddPlace = popupAddPlace.querySelector('.popup__button_type_close');
    closeButtonAddPlace.addEventListener('click', function() {
        closePopup(popupAddPlace);
    })

    // добавить карточку места
    const popupContainerAddPlace = popupAddPlace.querySelector('.popup__container');
    const formAddPlace = popupContainerAddPlace.querySelector('.form')
    const formNameAddPlace =formAddPlace.querySelector('.form__input_type_name')
    const formLinkAddPlace = formAddPlace.querySelector('.form__input_type_description');

    function addPlaceSubmitHandler(event) {
        event.preventDefault();
        addPlace(formLinkAddPlace.value, formNameAddPlace.value);
        closePopup(popupAddPlace);
    }
    formAddPlace.addEventListener('submit', addPlaceSubmitHandler);
})

// Открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// действия с карточками
function addPlace(link, name) {
    const gridTemplate = document.querySelector('#template-grid').content;
    const gridElement = gridTemplate.querySelector('.elements-grid__item').cloneNode(true);

    gridElement.querySelector('.elements-grid__photo').src = link;
    gridElement.querySelector('.elements-grid__photo').setAttribute('alt', name);
    gridElement.querySelector('.elements-grid__name').textContent = name;
    gridElement.querySelector('.elements-grid__button-delete').addEventListener('click', function() {
        gridElement.remove();
    })
    const likeButton = gridElement.querySelector('.elements-grid__button-like');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('elements-grid__button-like_checked');
    })

    document.querySelector('.elements-grid').prepend(gridElement);

    const popupPhotoPlace = document.querySelector('.popup_photo-place');
    const gridPhoto = document.querySelector('.elements-grid__photo');
    gridPhoto.addEventListener('click', function() {
        
        
        const popupPhotoElement = popupPhotoPlace.querySelector('.popup__photo');
        const popupTextElement = popupPhotoPlace.querySelector('.popup__description');

        popupPhotoElement.src = link;
        popupPhotoElement.setAttribute('alt', name);
        popupTextElement.textContent = name;

        openPopup(popupPhotoPlace);

        const closeButtonPhotoPlace = popupPhotoPlace.querySelector('.popup__button_type_close');
        closeButtonPhotoPlace.addEventListener('click', function() {
            closePopup(popupPhotoPlace);
        })
    })
}

