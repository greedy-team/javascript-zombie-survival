import RandomNumber from './utils/RandomNumber.js';
import Card from './ZombieGame/Cards.js';

export default class ZombieGame {
    constructor() {
        this.Card = new Card();
        this.selectedCard = null;
        this.choiceA = null;
        this.benefitA = null;
        this.choiceB = null;
        this.benefitB = null;
    }

    drawCard() {
        const cardNumber = RandomNumber();

        switch (cardNumber) {
            // 1~4가 나왔을 경우
            case 1:
            case 2:
            case 3:
            case 4:
                this.selectedCard = "생존자 시체";
                this.choiceA = "배낭째로 가져온다";
                this.benefitA = "식량 +3, 감염도 +8";
                this.choiceB = "겉에 있는 것만 집는다 (식량 +1)";
                this.benefitB = "식량 +1";
                break;

            // 5~8이 나왔을 경우
            case 5:
            case 6:
            case 7:
            case 8:
                this.selectedCard = "부상당한 군인";
                this.choiceA = "식량을 건네고 약을 받는다";
                this.benefitA = "식량 -1, 감염도 -20";
                this.choiceB = "몸싸움 끝에 식량만 챙기고 떠난다";
                this.benefitB = "체력 -10, 식량 +2";
                break;

            // 9~11가 나왔을 경우
            case 9:
            case 10:
            case 11:
                this.selectedCard = "임시 수술";
                this.choiceA = "감염 부위를 직접 도려낸다";
                this.benefitA = "체력 -25, 감염도 -25";
                this.choiceB = "이를 악물고 참는다";
                this.benefitB = "체력 -5, 감염도 +10";
                break;

            // 12~14가 나왔을 경우
            case 12:
            case 13:
            case 14:
                this.selectedCard = "군용 차량 행렬";
                this.choiceA = "뛰어나가 신호를 보낸다";
                this.benefitA = "구조 포인트 +1, 감염도 +8";
                this.choiceB = "몸을 낮추고 방향만 확인한다";
                this.benefitB = "체력 +5";
                break;

            // 15~17이 나왔을 경우
            case 15:
            case 16:
            case 17:
                this.selectedCard = "오염된 웅덩이";
                this.choiceA = "그냥 마신다. 탈수보다 낫다";
                this.benefitA = "체력 +5, 감염도 +15";
                this.choiceB = "참는다. 빗물을 기다린다";
                this.benefitB = "체력 -10";
                break;

            // 18~20이 나왔을 경우
            case 18:
            case 19:
            case 20:
                this.selectedCard = "구조 트럭";
                this.choiceA = "전력으로 달려간다";
                this.benefitA = "체력 -20, 구조 포인트 +1";
                this.choiceB = "체력을 아끼고 쉰다";
                this.benefitB = "체력 +10";
                break;

            // 난수 에러에 대한 예방조치
            default:
                console.log("error: 잘못된 카드 번호");
                console.log(cardNumber);
        }
    }
}