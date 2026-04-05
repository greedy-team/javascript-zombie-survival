/**
 * @breif 게임 클래스
 * 
 * 카드 드로우와 선택에 따른 결과 계산을 담당
 * 카드 번호에 따라 선택지와 그에 따른 효과를 설정하는 역할을 수행
 * 게임의 핵심 로직이 담긴 클래스이며, ZombieController에서 사용됨
 */
export default class ZombieGame {
    constructor() {
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
        switch (cardNumber) {
            // 1~4가 나왔을 경우
            case 1:
            case 2:
            case 3:
            case 4:
                this.selectedCard = "생존자 시체";
                this.choiceA = "배낭째로 가져온다";
                this.benefitA = "식량 +3, 감염도 +8";
                this.choiceB = "겉에 있는 것만 집는다";
                this.benefitB = "식량 +1";
                this.statA = [0, 3, 8, 0, 0];
                this.statB = [0, 1, 0, 0, 0];
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
                this.statA = [0, -1, -20, 1, 0];
                this.statB = [-10, 2, 0, 0, 0];
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
                this.statA = [-25, 0, -25, 0, 0];
                this.statB = [-5, 0, 10, 0, 0];
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
                this.statA = [0, 0, 8, 0, 1];
                this.statB = [5, 0, 0, 0, 0];
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
                this.statA = [5, 0, 15, 0, 0];
                this.statB = [-10, 0, 0, 0, 0]; 
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
                this.statA = [-20, 0, 0, 0, 1];
                this.statB = [10, 0, 0, 0, 0];
                break;

            // 난수 에러에 대한 예방조치
            default:
                console.log("error: 잘못된 카드 번호");
                console.log(cardNumber);
        }
    }
}