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

window.onload = function() {

    // добавить все карточки из массива на страницу
    initialCards.forEach(function (item) {
        addPlace(item.link, item.name);
    })


    const profile = document.querySelector('.profile');
  

    // открытие попапа Редактировать профиль
    const popupEditProfile = document.querySelector('.popup_editprofile');
    const editButton = profile.querySelector('.profile__button_type_edit');
    editButton.addEventListener('click', function(profileEdit) {
        popupEditProfile.classList.add('popup_opened');
    })


    // сохранить новый профиль
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
        popupEditProfile.classList.remove('popup_opened');
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
        popupAddPlace.classList.add('popup_opened');
    })

    // закрытие попапа Добавить место
    const closeButtonAddPlace = popupAddPlace.querySelector('.popup__button_type_close');
    closeButtonAddPlace.addEventListener('click', closeAddPlacePopup);

    // добавить карточку места
    const popupContainerAddPlace = popupAddPlace.querySelector('.popup__container');
    const formAddPlace = popupContainerAddPlace.querySelector('.form')
    const formNameAddPlace =formAddPlace.querySelector('.form__input_type_name')
    const formLinkAddPlace = formAddPlace.querySelector('.form__input_type_description');

    function addPlaceSubmitHandler(event) {
        event.preventDefault();
        addPlace(formLinkAddPlace.value, formNameAddPlace.value);
        closeAddPlacePopup();
    }
    formAddPlace.addEventListener('submit', addPlaceSubmitHandler);
}

// Закрыть попап добавления места
function closeAddPlacePopup() {
    const popupAddPlace = document.querySelector('.popup_addplace');
    popupAddPlace.classList.remove('popup_opened');
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

        popupPhotoPlace.classList.add('popup_opened');

        const closeButtonPhotoPlace = popupPhotoPlace.querySelector('.popup__button_type_close');
        closeButtonPhotoPlace.addEventListener('click', function() {
            popupPhotoPlace.classList.remove('popup_opened');
        })
    })
}

    