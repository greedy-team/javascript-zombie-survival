/**
 * @breif 로그 출력과 관련된 HTML 요소를 관리하는 클래스
 * 
 * OutputLogs 클래스는 로그 출력과 관련된 HTML 요소를 관리
 */
export default class OutputLogs {
    constructor() {
        this.initializeCardElements();
    }

    /**
     * HTML 요소 초기화
     */
    initializeCardElements() {
        this.log = document.getElementById('log');
    }

    /**
     * 로그 초기화
     */
    clearLogs() {
        this.log.innerHTML = '';
    }

    /**
     * 로그 추가
     * 
     * @param {*} message 추가될 로그 메시지
     */
    addLog(message) {
        const p = document.createElement('p');
        p.textContent = message;
        this.log.appendChild(p);
    }
}