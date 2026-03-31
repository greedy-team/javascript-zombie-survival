import ZombieGame from './ZombieGame.js';

import OutputStat from './views/OutputStat.js';
import Status from './ZombieGame/status.js';

import InputCard from './views/InputCard.js';
import OutputCard from './views/OutputCard.js';
import Cards from './ZombieGame/Cards.js';

import OutputLogs from './views/OutputLogs.js';

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

        this.inputCard.bindDrawCard(this.drawCard.bind(this));
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

            // 카드 드로우 시 ZombieGame의 drawCard 메서드 호출
            this.ZombieGame.drawCard();   
            
            this.OutputCard.showChoice(
                this.ZombieGame.selectedCard,
                this.ZombieGame.choiceA,
                this.ZombieGame.choiceB,
                this.ZombieGame.benefitA,
                this.ZombieGame.benefitB
            );

            this.OutputLogs.addLog(`Day ${this.Status.day}: ${this.ZombieGame.selectedCard} 카드를 뽑았습니다.`);
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

        if(this.Cards.remainCard <= 1) {
            this.Cards.remainCard += 20;
        }
    }

    //TODO: 이렇게 반복 되는걸 좀 줄일 수 없을까..?
    chooseChoice(choice) {
        
        if (choice === 'A') {
            this.Status.hp += this.ZombieGame.statA[0];
            this.Status.food += this.ZombieGame.statA[1];
            this.Status.infection += this.ZombieGame.statA[2];
            this.Status.heal += this.ZombieGame.statA[3];
            this.Status.rescue += this.ZombieGame.statA[4];
        } else if (choice === 'B') {
            this.Status.hp += this.ZombieGame.statB[0];
            this.Status.food += this.ZombieGame.statB[1];
            this.Status.infection += this.ZombieGame.statB[2];
            this.Status.heal += this.ZombieGame.statB[3];
            this.Status.rescue += this.ZombieGame.statB[4];
        }

        this.checkStat();
        this.OutputCard.invaildButton();

        setTimeout(() => {
            this.renderStat();
        }, 2000);
    }

    checkStat() {
        this.Status.day += 1;
        this.Status.food -= 1;
        this.Status.infection += 3;

        if(this.Status.food == 0) {
            this.Status.hp -= 10;
        }

        if (this.Status.hp <= 0) {
            alert('체력이 0이하로 떨어졌습니다. 게임 오버!');
            this.init();
        } else if (this.Status.infection >= 100) {
            alert('감염도가 100이상으로 올라갔습니다. 게임 오버!');
            this.init();
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

}