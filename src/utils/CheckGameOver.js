/**
 * 게임 종료 상태를 관리하는 클래스
 */
export default class CheckGameOver {
    constructor() {
        this.isGameOver = false;
    }

    getGameOverStatus() {
        return this.isGameOver;
    }

    setGameOverStatus(status) {
        this.isGameOver = status;
    }
}