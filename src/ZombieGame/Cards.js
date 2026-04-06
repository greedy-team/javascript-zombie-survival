export default class Cards {
    constructor() {
        this.deck = [];
    }

    /**
     * 카드 초기화
     */
    initCard() {
        this.deck = Array.from({ length: 20 }, (_, i) => i + 1);
        this.remainCard = this.deck.length;
    }

    /**
     * 새로운 카드 드로우
     * 
     * @returns {number} 드로운 카드 번호
     */
    drawNewCard() {
        if (this.deck.length === 0) {
            this.initCard();  // 덱 리셋
        }

        // Math.random() 경계값(1)에 대한 방어 처리
        const randomIndex = Math.min(
            Math.floor(Math.random() * this.deck.length),
            this.deck.length - 1,
        );

        const [drawnCard] = this.deck.splice(randomIndex, 1);  // Remove and return in one step
        this.remainCard = this.deck.length;

        return drawnCard;
    }

    cardTitle(cardNumber) {
        const cardTitles = [
            "생존자 시체",
            "부상당한 군인",
            "임시 수술",
            "군용 차량 행렬",
            "오염된 웅덩이",
            "구조 트럭"
        ];
        return cardTitles[cardNumber] || "알 수 없는 카드";
    }

    choiceAText(cardNumber) {
        const choiceATexts = [
            "배낭째로 가져온다",
            "식량을 건네고 약을 받는다",
            "감염 부위를 직접 도려낸다",
            "뛰어나가 신호를 보낸다",
            "그냥 마신다. 탈수보다 낫다",
            "전력으로 달려간다"
        ];
        return choiceATexts[cardNumber] || "알 수 없는 선택지 A";
    }

    benefitAText(cardNumber) {
        const benefitATexts = [
            "식량 +3, 감염도 +8",
            "식량 -1, 감염도 -20",
            "체력 -25, 감염도 -25",
            "구조 포인트 +1, 감염도 +8",
            "체력 +5, 감염도 +15",
            "체력 -20, 구조 포인트 +1"
        ];
        return benefitATexts[cardNumber] || "알 수 없는 효과 A";
    }

    choiceBText(cardNumber) {
        const choiceBTexts = [
            "겉에 있는 것만 집는다",
            "몸싸움 끝에 식량만 챙기고 떠난다",
            "이를 악물고 참는다",
            "몸을 낮추고 방향만 확인한다",
            "참는다. 빗물을 기다린다",
            "체력을 아끼고 쉰다"
        ];
        return choiceBTexts[cardNumber] || "알 수 없는 선택지 B";
    }

    benefitBText(cardNumber) {
        const benefitBTexts = [
            "식량 +1",
            "식량 -10, 감염도 -20",
            "체력 -25, 감염도 -25",
            "구조 포인트 +1, 감염도 +8",
            "체력 -10",
            "체력 +10"
        ];
        return benefitBTexts[cardNumber] || "알 수 없는 효과 B";
    }

    statA(cardNumber) {
        const statAs = [
            [0, 3, 8, 0, 0],
            [0, -1, -20, 1, 0],
            [-25, 0, -25, 0, 0],
            [0, 0, 8, 0, 1],
            [5, 0, 15, 0, 0],
            [-20, 0, 0, 0, 1]
        ];
        return statAs[cardNumber] || [0, 0, 0, 0, 0];
    }
    
    statB(cardNumber) {
        const statBs = [
            [0, 1, 0, 0, 0],
            [-10, 2, 0, 0, 0],
            [-5, 0, 10, 0, 0],
            [5, 0, 0, 0, 0],
            [-10, 0, 0, 0, 0],
            [10, 0, 0, 0, 0]
        ];
        return statBs[cardNumber] || [0, 0, 0, 0, 0];   
    }
}
