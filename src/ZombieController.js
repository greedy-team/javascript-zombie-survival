import ZombieGame from './ZombieGame.js';

import OutputStat from './views/OutputStat.js';
import Status from './ZombieGame/Status.js';

import InputCard from './views/InputCard.js';
import OutputCard from './views/OutputCard.js';
import Cards from './ZombieGame/Cards.js';

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
        this.ZombieGame = new ZombieGame();

        this.OutputStat = new OutputStat();
        this.Status = new Status();

        this.inputCard = new InputCard();
        this.OutputCard = new OutputCard();
        this.Cards = new Cards();

        this.OutputLogs = new OutputLogs();

        this.initGame();
    }
    
    /**
     * 게임 초기화
     */
    initGame() {
        // 스탯 초기화
        this.Status.initStat();
        this.renderStatus();
        
        // 카드 갯수 초기화
        this.Cards.initCard();
        this.renderCardLeft();

        // 버튼에 이벤트 핸들러 바인딩
        this.inputCard.bindDrawCard(this.drawCard.bind(this));
        this.inputCard.bindRestart(this.restart.bind(this));
        this.inputCard.bindGiveUp(this.giveUp.bind(this));
        this.inputCard.bindDrawChoiceA(this.chooseChoice.bind(this, 'A'));
        this.inputCard.bindDrawChoiceB(this.chooseChoice.bind(this, 'B'));
    }

    /**
     * Status의 정보를 OutputStat에 전달하여 화면에 표시
     */
    renderStatus() {
        this.OutputStat.showStatus(this.Status);
    }

    /**
     * Cards의 스택 정보를 OutputCard에 전달하여 화면에 표시
     */
    renderCardLeft() {
        this.OutputCard.showCardLeft(this.Cards.remainCard);
    }

    /**
     * 카드 드로우
     */
    drawCard() {
        try {
            // 카드 드로우 시 Cards의 남은 카드 수 감소
            this.countCards();

            // 카드 정보 업데이트
            this.ZombieGame.drawCard();   
            
            // 카드 정보 출력
            this.OutputCard.showChoice(
                this.ZombieGame.selectedCard,
                this.ZombieGame.choiceA,
                this.ZombieGame.choiceB,
                this.ZombieGame.benefitA,
                this.ZombieGame.benefitB
            );

            // 로그 출력
            const logMessage = `Day ${this.Status.getDay()}: ${this.ZombieGame.selectedCard} 카드를 뽑았습니다.`;
            this.OutputLogs.addLog(logMessage);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 카드 드로우 시 Cards의 남은 카드 수 감소
     */
    countCards() {
        this.Cards.remainCard -= 1;
        this.renderCardLeft();

        // 카드가 모두 소진되면 초기화
        if(this.Cards.remainCard === 0) {
            this.Cards.remainCard = 20;
        }
    }

    /**
     * 사용자의 선택에 따라 Status 업데이트
     * 
     * @param {*} choice 사용자의 선택 (A 또는 B)
     */
    chooseChoice(choice) {
        const stat = choice === 'A' ? this.ZombieGame.statA : this.ZombieGame.statB;

        this.Status.setHp(this.Status.getHp() + stat[0]);
        this.Status.setFood(this.Status.getFood() + stat[1]);
        this.Status.setInfection(this.Status.getInfection() + stat[2]);
        this.Status.setHeal(this.Status.getHeal() + stat[3]);
        this.Status.setRescue(this.Status.getRescue() + stat[4]);

        this.checkStat();
        this.OutputCard.invalidButton();

        // 선택 결과 출력
        setTimeout(() => {
            this.renderStatus();
        }, 2000);
    }

    /**
     * 게임 종료 조건 체크
     */
    checkStat() {
        this.Status.setDay(this.Status.getDay() + 1);
        this.Status.setFood(this.Status.getFood() - 1);
        this.Status.setInfection(this.Status.getInfection() + 3);

        if(this.Status.getFood() == 0) {
            this.Status.setHp(this.Status.getHp() - 10);
        }

        if (this.Status.getHp() <= 0) {
            this.Status.setHp(0);
            this.OutputCard.endGame("사망", this.Status);
        } else if (this.Status.getInfection() >= 100) {
            this.OutputCard.endGame("좀비화", this.Status);
        } else if (this.Status.getHealSelected() >= 5) {
            this.OutputCard.endGame("치료 성공", this.Status);
        } else if (this.Status.getRescue() >= 3 && this.Status.getDay() >= 10) {
            this.OutputCard.endGame("구조 성공", this.Status);
        } else if (this.Status.getDay() >= 15) {
            this.OutputCard.endGame("구조대 도착", this.Status);
        }

        if (this.Status.getHp() < 0) {
            this.Status.setHp(0);
        }

        if (this.Status.getFood() < 0) {
            this.Status.setFood(0);
        }

        if (this.Status.getInfection() < 0) {
            this.Status.setInfection(0);
        }
    }

    /**
     * 게임 재시작
     */
    restart() {
        this.Status.initStat();
        this.Cards.initCard();
        this.renderStatus();
        this.renderCardLeft();

        this.OutputLogs.clearLogs();
        this.OutputCard.initChoiceButtons();
        this.OutputCard.resultScreen.classList.add('hidden');
    }

    /**
     * 게임 포기
     */
    giveUp() {
        this.OutputCard.endGame("포기", this.Status);
    }
}