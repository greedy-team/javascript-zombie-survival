import RandomNumber from './utils/RandomNumber.js';

export default class ZombieGame {
    constructor() {
        
    }

    drawCard() {
        const cardNumber = RandomNumber();

        switch (cardNumber) {
            // 1~4가 나왔을 경우
            case 1:
            case 2:
            case 3:
            case 4:
                console.log("🧟 생존자 시체");
                break;

            //  5~8이 나왔을 경우
            case 5:
            case 6:
            case 7:
            case 8:
                console.log("💊 부상당한 군인");
                break;

            // 9~11가 나왔을 경우
            case 9:
            case 10:
            case 11:
                console.log("🔪 임시 수술");
                break;

            // 12~14가 나왔을 경우
            case 12:
            case 13:
            case 14:
                console.log("🚗 군용 차량 행렬");
                break;

            // 15~17이 나왔을 경우
            case 15:
            case 16:
            case 17:
                console.log("💧 오염된 웅덩이");
                break;

            // 18~20이 나왔을 경우
            case 18:
            case 19:
            case 20:
                console.log("🚛 구조 트럭");
                break;

            // 난수 에러에 대한 예방조치
            default:
                console.log("error: 잘못된 카드 번호");
                console.log(cardNumber);
        }
    }
}