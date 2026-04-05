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

        this.init();
    }
    
    /**
     * 게임 초기화
     */
    init() {
        // 스탯 초기화
        this.Status.initStat();
        this.renderStat();
        
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
     * Status의 스택 정보를 OutputStat에 전달하여 화면에 표시
     */
    renderStat() {
        this.OutputStat.showStat(
            this.Status.day,
            this.Status.hp,
            this.Status.food,
            this.Status.infection,
            this.Status.heal,
            this.Status.rescue
        );
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
            const logMessage = `Day ${this.Status.day}: ${this.ZombieGame.selectedCard} 카드를 뽑았습니다.`;
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
        if (choice === 'A') {
            // Status 업데이트
            this.Status.hp += this.ZombieGame.statA[0];
            this.Status.food += this.ZombieGame.statA[1];
            this.Status.infection += this.ZombieGame.statA[2];
            this.Status.heal += this.ZombieGame.statA[3];
            this.Status.rescue += this.ZombieGame.statA[4];

            // 치료 선택 시 치료 횟수 증가
            if (this.ZombieGame.statA[3] > 0) {
                this.Status.healSelected += 1;
            }
        } else if (choice === 'B') {
            // Status 업데이트
            this.Status.hp += this.ZombieGame.statB[0];
            this.Status.food += this.ZombieGame.statB[1];
            this.Status.infection += this.ZombieGame.statB[2];
            this.Status.heal += this.ZombieGame.statB[3];
            this.Status.rescue += this.ZombieGame.statB[4];

            // 치료 선택 시 치료 횟수 증가
            if (this.ZombieGame.statB[3] > 0) {
                this.Status.healSelected += 1;
            }
        }

        this.checkStat();
        this.OutputCard.invaildButton();

        // 선택 결과 출력
        setTimeout(() => {
            this.renderStat();
        }, 2000);
    }

    /**
     * 게임 종료 조건 체크
     */
    checkStat() {
        this.Status.day += 1;
        this.Status.food -= 1;
        this.Status.infection += 3;

        if(this.Status.food == 0) {
            this.Status.hp -= 10;
        }

        if (this.Status.hp <= 0) {
            this.Status.hp = 0;
            this.OutputCard.endGame("사망", this.Status);
        } else if (this.Status.infection >= 100) {
            this.OutputCard.endGame("좀비화", this.Status);
        } else if (this.Status.healSelected >= 5) {
            this.OutputCard.endGame("치료 성공", this.Status);
        } else if (this.Status.rescue >= 3 && this.Status.day >= 10) {
            this.OutputCard.endGame("구조 성공", this.Status);
        } else if (this.Status.day >= 15) {
            this.OutputCard.endGame("구조대 도착", this.Status);
        }

        if (this.Status.hp < 0) {
            this.Status.hp = 0;
        }

        if (this.Status.food < 0) {
            this.Status.food = 0;
        }

        if (this.Status.infection < 0) {
            this.Status.infection = 0;
        }
    }

    /**
     * 게임 재시작
     */
    restart() {
        this.Status.initStat();
        this.Cards.initCard();
        this.renderStat();
        this.renderCardLeft();

        this.OutputLogs.clearLogs();
        this.OutputCard.init();
        this.OutputCard.resultScreen.classList.add('hidden');
    }

    /**
     * 게임 포기
     */
    giveUp() {
        this.OutputCard.endGame("포기", this.Status);
    }
}