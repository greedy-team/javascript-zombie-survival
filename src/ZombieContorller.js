import ZombieGame from './ZombieGame.js';

import OutputStat from './views/OutputStat.js';
import Status from './ZombieGame/status.js';

import OutputCard from './views/OutputCard.js';
import Cards from './ZombieGame/Cards.js';

export default class ZombieController {
    constructor() {
        this.ZombieGame = new ZombieGame();

        this.OutputStat = new OutputStat();
        this.Status = new Status();

        this.Cards = new Cards();
        this.OutputCard = new OutputCard();

        this.init();
    }
    
    // 게임 초기화
    init() {
        // 스탯 초기화
        this.Status.initStat();
        this.renderStat();
        
        // 카드 갯수 초기화
        this.Cards.initCard();
        this.renderCardLeft();
    }

    // Status의 스택 정보를 OutputStat에 전달하여 화면에 표시
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

    // Cards의 스택 정보를 OutputCard에 전달하여 화면에 표시
    renderCardLeft() {
        this.OutputCard.showCardLeft(this.Cards.remainCard);
    }
}