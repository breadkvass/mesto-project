export class Section {
    constructor({items, renderer}, selector){
        this._items = items.reverse();
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    render() {
        this._items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        })

    }

    addItem(element) {
        this._container.prepend(element);
    }
}