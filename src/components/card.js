// действия с карточками
function createCard(link, name, isDeleteable, clickHandler, deleteHandler) {
    const gridTemplate = document.querySelector('#template-grid').content;
    const gridElement = gridTemplate.querySelector('.elements-grid__item').cloneNode(true);
    const likeButton = gridElement.querySelector('.elements-grid__button-like');
    const gridPhoto = gridElement.querySelector('.elements-grid__photo');
    const deleteButton = gridElement.querySelector('.elements-grid__button-delete');
    

    if (isDeleteable) {
        deleteButton.style.visibility = "visible";

    } else {
        deleteButton.style.visibility = "hidden";
    }


    gridPhoto.src = link;
    gridPhoto.setAttribute('alt', name);
    gridElement.querySelector('.elements-grid__name').textContent = name;
    
    deleteButton.addEventListener('click', function () {
        console.log(deleteHandler);
        deleteHandler(() => gridElement.remove());
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
export function insertCard(parent, link, name, isDeleteable, clickHandler, deleteHandler) {
    const card = createCard(link, name, isDeleteable, clickHandler, deleteHandler);
    parent.prepend(card);
}

