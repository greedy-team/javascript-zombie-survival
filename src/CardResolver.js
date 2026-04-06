import Cards from './ZombieGame/Cards.js';
import { MAX_CARD_NUMBER } from './utils/GameConstants.js';

/**
 * @breif 게임 클래스
 * 
 * 카드 드로우와 선택에 따른 결과 계산을 담당
 * 카드 번호에 따라 선택지와 그에 따른 효과를 설정하는 역할을 수행
 * 게임의 핵심 로직이 담긴 클래스이며, ZombieController에서 사용됨
 */
export default class ZombieGame {
    constructor() {
        this.resetCardState();

        this.Cards = new Cards();
    }

    /**
     * 카드 상태 초기화
     */
    resetCardState() {
        this.selectedCard = null;
        this.choiceA = null;
        this.benefitA = null;
        this.choiceB = null;
        this.benefitB = null;
        this.statA = null;
        this.statB = null;
    }

    /**
     * 카드 드로우 및 선택지 설정
     * 
     * 배열 인덱스: [체력, 식량, 감염도, 치료, 구조 포인트]
     */
    drawCard(cardNumber) {
        this.resetCardState();

        switch (cardNumber) {
            // 1~4가 나왔을 경우
            case 1:
            case 2:
            case 3:
            case 4:
                applyChoice(0);
                break;

            // 5~8이 나왔을 경우
            case 5:
            case 6:
            case 7:
            case 8:
                applyChoice(1);
                break;

            // 9~11가 나왔을 경우
            case 9:
            case 10:
            case 11:
                applyChoice(2);
                break;

            // 12~14가 나왔을 경우
            case 12:
            case 13:
            case 14:
                applyChoice(3);
                break;

            // 15~17이 나왔을 경우
            case 15:
            case 16:
            case 17:
                applyChoice(4);
                break;

            // 18~20이 나왔을 경우
            case 18:
            case 19:
            case MAX_CARD_NUMBER:
                applyChoice(5);
                break;

            // 난수 에러에 대한 예방조치
            default:
                throw new Error(`error: 잘못된 카드 번호 (${cardNumber})`);
        }
    }

    /**
     * 선택지를 적용
     * 
     * @param {*} choice 카드 번호에 따른 선택지 인덱스 (0~5) 
     */
    applyChoice(choice) {
        this.selectedCard = this.Cards.cardTitle(choice);
        this.choiceA = this.Cards.choiceAText(choice);
        this.benefitA = this.Cards.benefitAText(choice);
        this.choiceB = this.Cards.choiceBText(choice);
        this.benefitB = this.Cards.benefitBText(choice);
        this.statA = this.Cards.statA(choice);
        this.statB = this.Cards.statB(choice);
    }
}
