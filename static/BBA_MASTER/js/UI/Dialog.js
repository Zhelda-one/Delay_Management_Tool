let dialog = null;
let dialogs = [];
let dialogsOptions = {};
let dialog_maxLeft = 0;
let dialog_maxTop = 0;
let dialog_mouseOffsetX = 0;
let dialog_mouseOffsetY = 0;

const g_Dialogs = new Map();

class Dialog extends HTMLElement {
    constructor(name){
        super();
        this.name = name;
        this.visible = false;

        // name to snake case
        this.className = "dialog";
        this.hidden = true;

        this.body = null;

        if(g_Dialogs.has(this.id)){
            throw new Error(`Dialog with id "${this.id}" already exists.`);
        }
        g_Dialogs.set(this.id, this);
    }

    getFromUI(){
        throw new Error(`getFromUI() not implemented in ${this.name} dialog`);
    }
    setToUI(){
        throw new Error(`setToUI() not implemented in ${this.name} dialog`);
    }

    onOpen(){
        // override
    }

    onLoad(){
        // override
    }

    open(){
        dialog_open(this.id);
    }
    close(){
        dialog_close(this.id);
    }
    toggle(){
        dialog_toggle(this.id);
    }

    connectedCallback() {
        // Read attributes
        this.alwaysOnTop = this.hasAttribute('alwaysOnTop');
        this.defaultWidth = this.getAttribute('defaultWidth') || "";
        this.defaultHeight = this.getAttribute('defaultHeight') || "";

        dialogsOptions[this.id] = new DialogOptions({
            alwaysOnTop: this.alwaysOnTop,
            defaultWidth: this.defaultWidth,
            defaultHeight: this.defaultHeight
        });

        this.style.width = this.defaultWidth;
        this.style.height = this.defaultHeight;

        this.render();

        // Add event listeners
        this.addEventListener('mousedown', dialog_onMoveDown);
        const header = this.querySelector(`#${this.id}_header`);
        if (header) {
            header.addEventListener('mousedown', dialog_move_onMouseDown);
        }

        dialog_addResizeObserver(this);
    }

    render() {
        const children = Array.from(this.childNodes);
        this.innerHTML = '';

        // Create header
        const header = document.createElement('div');
        header.className = 'dialog_header';
        header.id = `${this.id}_header`;

        const titleSpan = document.createElement('span');
        titleSpan.textContent = this.name;

        const closeImg = document.createElement('img');
        closeImg.className = 'close_dialog';
        closeImg.src = 'img/close.png';
        closeImg.alt = '';
        closeImg.onclick = () => dialog_close(this.id);

        header.appendChild(titleSpan);
        header.appendChild(closeImg);

        // Create body
        this.body = document.createElement('div');
        this.body.className = 'dialog_body';
        children.forEach(child => this.body.appendChild(child));

        this.appendChild(header);
        this.appendChild(this.body);
    }
}

function dialogs_updateOrder() {
    let i = 0;
    for( const dialogName of dialogs ) {
        if(dialogsOptions[dialogName]){
            const alwaysOnTop = dialogsOptions[dialogName].alwaysOnTop;
            getElementById( dialogName ).style.zIndex = ( i++ + 2 + (alwaysOnTop?1000:0) ).toString();
        }
    }
}

function dialog_onMoveDown( e ) {
    let dialogId = e.target.closest( '.dialog' ).id;
    dialogs.splice( dialogs.indexOf( dialogId ), 1 );
    dialogs.push( dialogId );
    dialogs_updateOrder();
    dialog = getElementById( dialogId );
}

function dialog_move_onMouseDown( e ) {
    e.preventDefault();
    e.stopPropagation();

    if( e.button !== 0 ) return;
    dialog_onMoveDown( e );

    dialog_maxLeft = window.innerWidth - dialog.offsetWidth - 1;
    dialog_maxTop = window.innerHeight - dialog.offsetHeight - 1;
    dialog_mouseOffsetX = dialog.offsetLeft - e.clientX;
    dialog_mouseOffsetY = dialog.offsetTop - e.clientY;

    document.onmousemove = dialog_move_onMouseMove;
    document.onmouseup = dialog_move_onMouseUp;
}

function dialog_move_onMouseMove( e ) {
    e.preventDefault();

    let left = e.clientX + dialog_mouseOffsetX;
    let top = e.clientY + dialog_mouseOffsetY;

    if( left < 0 ) { left = 0; }
    else if( left > dialog_maxLeft ) { left = dialog_maxLeft; }

    if( top < 0 ) { top = 0; }
    else if( top > dialog_maxTop ) { top = dialog_maxTop; }

    dialog.style.left = `${ left }px`;
    dialog.style.top = `${ top }px`;
}

function dialog_move_onMouseUp() {
    document.onmousemove = null;
    document.onmouseup = null;
}

function DialogOptions(dialogOptions = null){
    // Default settings
    this.alwaysOnTop = false;

    this.defaultWidth = "";
    this.defaultHeight = "";

    if(dialogOptions !== null){
        if(dialogOptions.hasOwnProperty('alwaysOnTop')) this.alwaysOnTop = dialogOptions.alwaysOnTop;
        if(dialogOptions.hasOwnProperty('defaultWidth')) this.defaultWidth = dialogOptions.defaultWidth;
        if(dialogOptions.hasOwnProperty('defaultHeight')) this.defaultHeight = dialogOptions.defaultHeight;
    }

    return this;
}

function dialog_addResizeObserver(dialog){
    const resizeObserver = new ResizeObserver(() => {
        if (dialog.hidden) return;

        let left = dialog.offsetLeft;
        let top = dialog.offsetTop;
        let width = dialog.offsetWidth;
        let height = dialog.offsetHeight;
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        // Move dialog back into viewport if out of bounds
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left + width > maxWidth) left = Math.max(0, maxWidth - width);
        if (top + height > maxHeight) top = Math.max(0, maxHeight - height);

        // Scale down if still too large
        if (width > maxWidth) {
            width = maxWidth;
            dialog.style.width = `${width}px`;
            left = 0;
        }
        if (height > maxHeight) {
            height = maxHeight;
            dialog.style.height = `${height}px`;
            top = 0;
        }

        dialog.style.left = `${left}px`;
        dialog.style.top = `${top}px`;
    });

    resizeObserver.observe(dialog);
}

function dialog_open( id ) {
    if(g_Dialogs.has(id) === false){
        throw new Error(`Dialog with id "${id}" does not exist.`);
    }
    const d = g_Dialogs.get(id);
    d.onOpen();

    if( !d.hidden ) {
        dialogs.splice( dialogs.indexOf( id ), 1 );
    } else {
        d.hidden = false;
        if( !d.style.top ) {
            d.style.top = `${ ( window.innerHeight - d.clientHeight ) / 2 }px`;
            d.style.left = `${ ( window.innerWidth - d.clientWidth ) / 2 }px`;
        }
    }
    dialogs.push( id );
    dialogs_updateOrder();
}

function dialog_close( id ) {
    if(g_Dialogs.has(id) === false){
        throw new Error(`Dialog with id "${id}" does not exist.`);
    }
    const d = g_Dialogs.get(id);

    if( !d.hidden ) {
        dialogs.splice( dialogs.indexOf( id ), 1 );
        d.hidden = true;
    }
}

function dialog_toggle( id ) {
    if(g_Dialogs.has(id) === false){
        throw new Error(`Dialog with id "${id}" does not exist.`);
    }
    const d = g_Dialogs.get(id);

    if( d.hidden ) dialog_open( id );
    else dialog_close( id );
}