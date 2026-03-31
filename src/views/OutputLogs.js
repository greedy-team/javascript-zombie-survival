export default class InputCard {
    constructor() {
        this.initializeCardElements();
    }

    // HTML 요소 초기화
    initializeCardElements() {
        this.log = document.getElementById('log');
    }

    addLog(message) {
        this.log.innerHTML += `<p>${message}</p>`;
    }
}