import Cards from './ZombieGame/Cards.js';
import { MAX_CARD_NUMBER } from './utils/GameConstants.js';
import Status from './ZombieGame/Status.js';

/**
 * @breif 게임 클래스
 * 
 * 카드 드로우와 선택에 따른 결과 계산을 담당
 * 카드 번호에 따라 선택지와 그에 따른 효과를 설정하는 역할을 수행
 * 게임의 핵심 로직이 담긴 클래스이며, ZombieController에서 사용됨
 */
export default class ZombieGame {
    constructor() {
        this.cards = new Cards();
        this.status = new Status();
        this.reset();
    }

    /**
     * 카드 상태 초기화
     */
    reset() {
        this.status.initStat();
        this.cards.initCard();
        this.currentCard = null;
        this.isGameOver = false;
    }

    /**
     * 상태 객체 반환
     */
    getStatus() {
        return this.status;
    }

    /**
     * 남은 카드 수 반환
     */
    getRemainingCards() {
        return this.cards.remainCard;
    }

    /**
     * 카드 드로우 및 선택지 정보 생성
     * 
     * @returns {object} 카드 표시 정보
     */
    drawCard() {
        if (this.isGameOver) {
            throw new Error('error: 이미 종료된 게임입니다.');
        }

        const cardNumber = this.cards.drawNewCard();
        const choiceIndex = this.resolveChoiceIndex(cardNumber);

        this.currentCard = {
            selectedCard: this.cards.cardTitle(choiceIndex),
            choiceA: this.cards.choiceAText(choiceIndex),
            benefitA: this.cards.benefitAText(choiceIndex),
            choiceB: this.cards.choiceBText(choiceIndex),
            benefitB: this.cards.benefitBText(choiceIndex),
            statA: this.cards.statA(choiceIndex),
            statB: this.cards.statB(choiceIndex),
        };

        return { ...this.currentCard };
    }

    /**
     * 선택 처리
     * 
     * @param {string} choice 사용자가 선택한 값 (A 또는 B)
     * @returns {object} 턴 처리 결과
     */
    choose(choice) {
        if (!this.currentCard) {
            throw new Error('error: 먼저 카드를 뽑아야 합니다.');
        }

        const selectedStat = choice === 'A' ? this.currentCard.statA : this.currentCard.statB;
        this.applyCardEffect(selectedStat);

        const starvationApplied = this.applyDailyChanges();
        this.normalizeStatus();

        const ending = this.evaluateEnding();
        if (ending) {
            this.isGameOver = true;
        }

        return {
            status: this.status,
            selectedCard: this.currentCard.selectedCard,
            selectedChoice: choice,
            starvationApplied,
            isGameOver: this.isGameOver,
            ending,
        };
    }

    /**
     * 포기 처리
     *
     * @returns {object} 종료 결과
     */
    giveUp() {
        this.isGameOver = true;

        return {
            status: this.status,
            ending: '포기',
        };
    }

    /**
     * 카드 번호를 선택지 인덱스로 변환
     *
     * @param {number} cardNumber 카드 번호
     * @returns {number} 선택지 인덱스
     */
    resolveChoiceIndex(cardNumber) {
        if (cardNumber >= 1 && cardNumber <= 4) return 0;
        if (cardNumber >= 5 && cardNumber <= 8) return 1;
        if (cardNumber >= 9 && cardNumber <= 11) return 2;
        if (cardNumber >= 12 && cardNumber <= 14) return 3;
        if (cardNumber >= 15 && cardNumber <= 17) return 4;
        if (cardNumber >= 18 && cardNumber <= MAX_CARD_NUMBER) return 5;

        throw new Error(`error: 잘못된 카드 번호 (${cardNumber})`);
    }

    /**
     * 카드 선택 효과 적용
     *
     * 배열 인덱스: [체력, 식량, 감염도, 치료, 구조 포인트]
     */
    applyCardEffect(stat) {
        this.status.setHp(this.status.getHp() + stat[0]);
        this.status.setFood(this.status.getFood() + stat[1]);
        this.status.setInfection(this.status.getInfection() + stat[2]);
        this.status.setHeal(this.status.getHeal() + stat[3]);
        this.status.setRescue(this.status.getRescue() + stat[4]);
    }

    /**
     * 턴 종료 시 고정 변화 적용
     *
     * @returns {boolean} 기아 데미지 적용 여부
     */
    applyDailyChanges() {
        this.status.setDay(this.status.getDay() + 1);
        this.status.setFood(this.status.getFood() - 1);
        this.status.setInfection(this.status.getInfection() + 3);

        const starvationApplied = this.status.getFood() <= 0;
        if (starvationApplied) {
            this.status.setHp(this.status.getHp() - 10);
        }

        return starvationApplied;
    }

    /**
     * 스탯 최소값 보정
     */
    normalizeStatus() {
        this.status.setHp(Math.max(this.status.getHp(), 0));
        this.status.setFood(Math.max(this.status.getFood(), 0));
        this.status.setInfection(Math.max(this.status.getInfection(), 0));
    }

    /**
     * 엔딩 판정
     *
     * @returns {string|null} 엔딩 결과
     */
    evaluateEnding() {
        if (this.status.getHp() <= 0) {
            this.status.setHp(0);
            return '사망';
        }

        if (this.status.getInfection() >= 100) {
            return '좀비화';
        }

        if (this.status.getHeal() >= 5) {
            return '치료 성공';
        }

        if (this.status.getRescue() >= 3 && this.status.getDay() > 10) {
            return '구조 성공';
        }

        if (this.status.getDay() > 15) {
            return '생존 성공';
        }

        return null;
    }
}
