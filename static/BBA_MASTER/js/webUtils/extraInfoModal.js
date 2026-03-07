const extraInfoModal = getElementById('extraInfoModal');

const EXTRA_INFO_STATUS = {
    success: 0,
    error: 1,
    warning: 2,
}

function PropExtraInfo(status, text){
    this.status = status;
    this.text = text;
}

function showModal(event) {
    const hoverElement = event.target;
    const rect = hoverElement.getBoundingClientRect();
    extraInfoModal.style.top = `${rect.bottom + window.scrollY}px`;
    extraInfoModal.style.left = `${rect.left + window.scrollX}px`;
    extraInfoModal.classList.remove('modalHidden');
    extraInfoModal.innerHTML = hoverElement.getAttribute('data-modal-content').replace(/\n/g, '<br>');
}

function hideModal(event) {
    if (!extraInfoModal.contains(event.relatedTarget)) {
        extraInfoModal.classList.add('modalHidden');
    }
}

function keepModalVisible() {
    extraInfoModal.classList.remove('modalHidden');
}