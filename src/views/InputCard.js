/**
 * @breif 카드에 관한 사용자 입력과 관련된 HTML 요소를 관리하는 클래스
 * 
 * InputCard 클래스는 사용자 입력과 관련된 HTML 요소를 관리
 * 각 버튼에 대한 클릭 이벤트를 바인딩
 */
export default class InputCard {
    constructor() {
        this.initializeCardElements();
    }

    /**
     * HTML 요소 초기화
     */
    initializeCardElements() {
        this.drawButton = document.getElementById('btn-draw');
        this.choiceButtonA = document.getElementById('btn-choice-a');
        this.choiceButtonB = document.getElementById('btn-choice-b');
        this.restartButton = document.getElementById('btn-restart');
        this.giveUpButton = document.getElementById('btn-giveup');
    }

    /**
     * 카드 드로우 버튼 클릭 이벤트 바인딩
     * 
     * @param {*} handler 
     */
    bindDrawCard(handler) {
        this.drawButton.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}

    /**
     * 선택지 A 버튼 클릭 이벤트 바인딩
     * 
     * @param {*} handler 
     */
    bindDrawChoiceA(handler) {
        this.choiceButtonA.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}
    
    /**
     * 선택지 B 버튼 클릭 이벤트 바인딩
     * 
     * @param {*} handler 
     */
    bindDrawChoiceB(handler) {
        this.choiceButtonB.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}

    /**
     * 게임 재시작 버튼 클릭 이벤트 바인딩
     * 
     * @param {*} handler 
     */
    bindRestart(handler) {
        this.restartButton.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}

    /**
     * 포기 버튼 클릭 이벤트 바인딩
     * 
     * @param {*} handler 
     */
    bindGiveUp(handler) {
        this.giveUpButton.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}
    
}