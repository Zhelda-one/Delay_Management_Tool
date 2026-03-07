function selectableList_onClick(event, callbackFn) {
    if (event.target.tagName === 'LI') {
        const selected = event.currentTarget.querySelector('.selected');
        if (selected) {
            selected.classList.remove('selected');
        }
        event.target.classList.add('selected');

        if(callbackFn !== undefined){
            callbackFn(event.target);
        }
    }
}