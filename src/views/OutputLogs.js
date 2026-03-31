export default class InputCard {
    constructor() {
        this.initializeCardElements();
    }

    // HTML 요소 초기화
    initializeCardElements() {
        this.log = document.getElementById('log');
    }

    initLog() {
        this.log.innerHTML = '';
    }

    addLog(message) {
        this.log.innerHTML += `<p>${message}</p>`;
        this.log.scrollTop = this.log.scrollHeight;
    }
}