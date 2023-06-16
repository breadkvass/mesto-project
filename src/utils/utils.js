// import { EPSILON } from "core-js/core/number";

export function handleSubmit(evt, request, loadingText = "Сохранение...") {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);

    return request()
        .then(() => evt.target.reset())
        .then(() => renderLoading(false, submitButton, initialText));
}

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
    }
}