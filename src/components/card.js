// действия с карточками
function createCard(item, userId, clickHandler, deleteHandler, likeHandler) {
    const gridTemplate = document.querySelector('#template-grid').content;
    const gridElement = gridTemplate.querySelector('.elements-grid__item').cloneNode(true);
    const likeButton = gridElement.querySelector('.elements-grid__button-like');
    const gridPhoto = gridElement.querySelector('.elements-grid__photo');
    const deleteButton = gridElement.querySelector('.elements-grid__button-delete');
    const likeCounter = gridElement.querySelector('.elements-grid__like-counter');

    gridPhoto.src = item.link;
    gridPhoto.setAttribute('alt', item.name);
    gridElement.querySelector('.elements-grid__name').textContent = item.name;
    likeCounter.textContent = item.likes.length;

    if (item.owner._id == userId) {
        deleteButton.style.visibility = "visible";
    } else {
        deleteButton.style.visibility = "hidden";
    }

    likeButton.classList.toggle('elements-grid__button-like_checked', hasMyLike(item.likes, userId));

    likeButton.addEventListener('click', function () {
        const isLiked = likeButton.classList.contains('elements-grid__button-like_checked');
        likeHandler(item._id, isLiked, (likes) => {
            likeButton.classList.toggle('elements-grid__button-like_checked', hasMyLike(likes, userId));
            likeCounter.textContent = likes.length;
        });
    })

    deleteButton.addEventListener('click', function () {
        deleteHandler(item._id, () => gridElement.remove());
    })
        
    gridPhoto.addEventListener('click', function () {
        clickHandler(item.link, item.name);
    });

    return gridElement;
}

function hasMyLike(likes, userId) {
    return likes.filter(user => user._id == userId).length > 0
}

// добавить карточку места
export function insertCard(parent, item, userId, clickHandler, deleteHandler, likeHandler) {
    const card = createCard(item, userId, clickHandler, deleteHandler, likeHandler);
    parent.prepend(card);
}

