// действия с карточками
function createCard(link, name, isDeleteable, clickHandler) {
    const gridTemplate = document.querySelector('#template-grid').content;
    const gridElement = gridTemplate.querySelector('.elements-grid__item').cloneNode(true);
    const likeButton = gridElement.querySelector('.elements-grid__button-like');
    const gridPhoto = gridElement.querySelector('.elements-grid__photo');
    const deleteButton = gridElement.querySelector('.elements-grid__button-delete');
    const popupDeleteQuestion = document.querySelector('.popup_delete-question');
    const saveButtonPopupDeleteQuestion = popupDeleteQuestion.querySelector('.popup__button_type_save');

    if (isDeleteable) {
        deleteButton.style.visibility = "visible";

    } else {
        deleteButton.style.visibility = "hidden";
    }


    gridPhoto.src = link;
    gridPhoto.setAttribute('alt', name);
    gridElement.querySelector('.elements-grid__name').textContent = name;
    
    deleteButton.addEventListener('click', function () {
        popupDeleteQuestion.classList.add('popup_opened');
        saveButtonPopupDeleteQuestion.addEventListener('click', evt => {
            gridElement.remove();
            popupDeleteQuestion.classList.remove('popup_opened');
        })
    })
    

    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('elements-grid__button-like_checked');
    })
        
    gridPhoto.addEventListener('click', function () {
        clickHandler(link, name);
    });

    return gridElement;
}

// добавить карточку места
export function insertCard(parent, link, name, isDeleteable, clickHandler) {
    const card = createCard(link, name, isDeleteable, clickHandler);
    parent.prepend(card);
}

