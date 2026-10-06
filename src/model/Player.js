export default class Player {
    constructor() {
        this.hp = 100;
        this.food = 3;
        this.infection = 10;
        this.day = 1;
        this.treatmentCount = 0;
        this.rescuePoint = 0;
    }

    dayEffect() {
        this.day += 1;
        this.infection += 3;
        this.starvation;

        if (this.food > 0) {
            this.food -= 1;
            this.starvation = false;
        }
        else {
            this.hp -= 10;
            this.food = 0;
            this.starvation = true;
        }
        if (this.hp < 0) {
            this.hp = 0;
        }
        return this.starvation;
    }

    applyEffect(effect) {
        const allowedKeys = [
            "hp",
            "food",
            "infection",
            "treatmentCount",
            "rescuePoint",
        ];

        Object.entries(effect).forEach(([key, value]) => {
            if (allowedKeys.includes(key)) {
                this[key] += value;
            }
        });
        if (this.infection < 0) {
            this.infection = 0;
        }
        if (this.hp < 0) {
            this.hp = 0;
        }
        if (this.food < 0) {
            this.food = 0;
        }
    }

    getPlayerState() {
        return {
            hp: this.hp,
            food: this.food,
            infection: this.infection,
            day: this.day,
            treatmentCount: this.treatmentCount,
            rescuePoint: this.rescuePoint
        };
    }

    isGameOver() {
        const failResult = this.isFail();
        const successResult = this.isSuccess();

        if (failResult != null) {
            return {
                isOver: true,
                result: failResult.message
            };
        }
        if (successResult != null) {
            return {
                isOver: true,
                result: successResult.message
            };
        }
        return {
            isOver: false,
            result: null
        };
    }

    isFail() {
        if (this.hp <= 0) {
            return {
                status: "fail",
                message: "사망"
            }
        }
        if (this.infection >= 100) {
            return {
                status: "fail",
                message: "좀비화"
            }
        }
        return null;
    }
    isSuccess() {
        if (this.treatmentCount >= 5) {
            return {
                status: "success",
                message: "치료 성공"
            }
        }
        if (this.rescuePoint>=3 && this.day > 10) {
            return {
                status: "success",
                message: "구조 성공"
            }
        }
        if (this.day > 15) {
            return {
                status: "success",
                message: "생존 성공(구조대 도착)"
            }
        }
        return null;
    }

    endGame() {

    }

    initGame() {
        this.hp = 100;
        this.food = 3;
        this.infection = 10;
        this.day = 1;
        this.treatmentCount = 0;
        this.rescuePoint = 0;
    }
}
