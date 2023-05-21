export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeListener);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeListener);
}

export function initPopups() {
    // Слушатели на закрытие попапов через оверлей и esc
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', closePopupOverlay);

        const closeButton = popup.querySelector('.popup__button_type_close');
        closeButton.addEventListener('click', function () {
            closePopup(popup);
        })

    });
}

const escapeListener = function(evt) {
    if (evt.key === 'Escape') {
        document.querySelectorAll('.popup_opened').forEach(popup => {
            closePopup(popup);
        })
    }
}

function closePopupOverlay(evt) {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
        const popupBorders = popup.querySelector('.popup__borders');
        const withinPopupBorders = evt.composedPath().includes(popupBorders);
        if (!withinPopupBorders) {
            closePopup(popup);
        }
    }
}