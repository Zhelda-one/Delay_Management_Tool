class Graph2dElement extends HTMLElement {
    constructor() {
        super();
        this._caption = null;
        this._optionsButton = true;
        this._width = 300;
        this._height = 150;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this._width;
        this.canvas.height = this._height;

        this.webWrapper = new Graph2dWebWrapper(this.canvas);
        this.graph2d = this.webWrapper.graph2d;
    }

    get caption() { return this._caption; }
    set caption(value) {
        if (this._caption !== value) {
            this._caption = value;
            this.setAttribute('caption', value);
        }
    }

    get width() { return this._width; }
    set width(value) {
        value = parseInt(value) || 300;
        if (this._width !== value) {
            this._width = value;
            this.setAttribute('width', value);
        }
    }

    get height() { return this._height; }
    set height(value) {
        value = parseInt(value) || 150;
        if (this._height !== value) {
            this._height = value;
            this.setAttribute('height', value);
        }
    }

    get optionsButton() { return this._optionsButton; }
    set optionsButton(value) {
        const boolValue = value !== 'false' && !!value;
        if (this._optionsButton !== boolValue) {
            this._optionsButton = boolValue;
            this.setAttribute('options-button', boolValue);
        }
    }

    static get observedAttributes() {
        return ['caption', 'options-button', 'width', 'height'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'caption':
                if (this._caption !== newValue) {
                    this._caption = newValue;
                    this.render();
                }
                break;
            case 'options-button':
                const boolValue = newValue !== 'false' && !!newValue;
                if (this._optionsButton !== boolValue) {
                    this._optionsButton = boolValue;
                    this.render();
                }
                break;
            case 'width':
                const widthValue = parseInt(newValue) || 300;
                if (this._width !== widthValue) {
                    this._width = widthValue;
                    this.render();
                }
                break;
            case 'height':
                const heightValue = parseInt(newValue) || 150;
                if (this._height !== heightValue) {
                    this._height = heightValue;
                    this.render();
                }
                break;
        }
    }

    connectedCallback() {
        this.render();
    }

    hide() { this.hidden = true; }
    show() { this.hidden = false; }

    render() {
        this.innerHTML = '';
        this.canvas.width = this._width;
        this.canvas.height = this._height;

        const figure = document.createElement('figure');
        figure.appendChild(this.canvas);

        if (this._optionsButton) {
            const optionsButton = document.createElement('input');
            optionsButton.type = 'image';
            optionsButton.className = 'gear_options';
            optionsButton.src = 'img/gear-icon2.png';
            optionsButton.title = 'graph options';
            optionsButton.onclick = this.webWrapper.onContextMenu;
            figure.appendChild(optionsButton);
        }

        if (this._caption) {
            const figcaption = document.createElement('figcaption');
            figcaption.innerHTML = this._caption;
            figure.appendChild(figcaption);
        }

        this.appendChild(figure);
    }
}

customElements.define('bba-graph2d', Graph2dElement);
