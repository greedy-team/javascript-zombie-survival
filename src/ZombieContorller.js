import ZombieGame from './ZombieGame.js';
import OutputStat from './views/OutputStat.js';
import Status from './ZombieGame/status.js';

export default class ZombieContorller {
    constructor() {
        this.ZombieGame = new ZombieGame();
        this.OutputStat = new OutputStat();
        this.Status = new Status();

        this.init();
    }
    
    // 게임 초기화
    init() {
        this.Status.initStat();
        this.renderStat();
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
}