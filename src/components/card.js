// действия с карточками
function createCard(link, name, clickHandler) {
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
        clickHandler(link, name);
    });

    return gridElement;
}

// добавить карточку места
export function insertCard(parent, link, name, clickHandler) {
    const card = createCard(link, name, clickHandler);
    parent.prepend(card);
}

