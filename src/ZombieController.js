import ZombieGame from './CardResolver.js';

import OutputStat from './views/OutputStat.js';

import InputCard from './views/InputCard.js';
import OutputCard from './views/OutputCard.js';
import OutputResult from './views/OutputResult.js';

import OutputLogs from './views/OutputLogs.js';

/**
 * @breif 게임 컨트롤러 클래스
 * 
 * 게임의 전반적인 흐름과 상태 관리를 담당
 * 사용자의 입력을 받아 게임 상태를 업데이트하고, 그 결과를 화면에 표시하는 역할을 수행
 * 게임 초기화, 카드 드로우, 선택 처리, 게임 종료 등의 주요 기능을 포함
 */
export default class ZombieController {
    constructor() {
        this.game = new ZombieGame();
        this.OutputStat = new OutputStat();
        this.InputCard = new InputCard();
        this.OutputLogs = new OutputLogs();
        this.OutputCard = new OutputCard(this.OutputLogs);
        this.OutputResult = new OutputResult();

        this.bindEvents();
        this.initGame();
    }
    
    /**
     * 게임 초기화
     */
    initGame() {
        this.game.reset();
        this.renderStatus();
        this.renderCardLeft();

        this.OutputCard.setGameOverState(false);
        this.OutputCard.initChoiceButtons();
        this.OutputResult.showGameScreen();

        this.OutputLogs.clearLogs();
        this.OutputLogs.addLog('Day 1: 감염자의 생존이 시작되었습니다.');
    }

    /**
     * 입력 이벤트 바인딩
     */
    bindEvents() {
        this.InputCard.bindDrawCard(this.getCard.bind(this));
        this.InputCard.bindRestart(this.restart.bind(this));
        this.InputCard.bindGiveUp(this.giveUp.bind(this));
        this.InputCard.bindDrawChoiceA(this.chooseChoice.bind(this, 'A'));
        this.InputCard.bindDrawChoiceB(this.chooseChoice.bind(this, 'B'));
    }

    /**
     * 카드 드로우
     */
    getCard() {
        try {
            const cardInfo = this.game.drawCard();
            this.renderCardLeft();

            this.OutputCard.showChoice(
                cardInfo.selectedCard,
                cardInfo.choiceA,
                cardInfo.choiceB,
                cardInfo.benefitA,
                cardInfo.benefitB,
            );

            const logMessage = `Day ${this.game.getStatus().getDay()}: ${cardInfo.selectedCard} 카드를 뽑았습니다.`;
            this.OutputLogs.addLog(logMessage);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 카드 드로우 시 Cards의 남은 카드 수 감소
     */
    renderCardLeft() {
        this.OutputCard.showCardLeft(this.game.getRemainingCards());
    }

    /**
     * 사용자의 선택에 따라 Status 업데이트
     * 
     * @param {*} choice 사용자의 선택 (A 또는 B)
     */
    chooseChoice(choice) {
        try {
            const turnResult = this.game.choose(choice);

            this.OutputLogs.addLog(`선택 ${choice}: 행동을 수행했습니다.`);
            if (turnResult.starvationApplied) {
                this.OutputLogs.addLog('식량이 없어 체력이 감소합니다.');
            }

            this.OutputCard.invalidButton(turnResult.isGameOver);

            setTimeout(() => {
                this.renderStatus();
                if (turnResult.isGameOver) {
                    this.endGame(turnResult.ending);
                }
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 상태 렌더링
     */
    renderStatus() {
        this.OutputStat.showStatus(this.game.getStatus());
    }

    /**
     * 게임 종료 처리
     * 
     * @param {*} result 종료 결과
     */
    endGame(result) {
        this.OutputCard.setGameOverState(true);
        this.OutputResult.endGame(result, this.game.getStatus());
    }

    /**
     * 게임 재시작
     */
    restart() {
        this.initGame();
    }

    /**
     * 게임 포기
     */
    giveUp() {
        const result = this.game.giveUp();
        this.endGame(result.ending);
    }
}