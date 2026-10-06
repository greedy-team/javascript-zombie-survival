export const GameCards = [
    {
        name: "생존자 시체",
        description: "길에서 생존자의 시체를 발견했다.",
        count: 4,
        choice: [
            {
                name: "A",
                description: "시체에서 챙길 수 있는 식량을 전부 챙긴다.",
                effectDescription:"식량 +3, 감염 +8",
                effect: {
                    food: 3,
                    infection: 8,
                }
            },
            {
                name: "B",
                description: "시체 주변 식량만 챙긴다.",
                effectDescription:"식량 +1",
                effect: {
                    food: 1
                }
            }
        ]
    },
    {
        name: "부상당한 군인",
        description: "부상당한 군인이 찾아왔다.",
        count: 4,
        choice: [
            {
                name: "A",
                description: "부상당한 군인을 치료해준다.",
                effectDescription:"식량 -1, 감염 -20, 치료 횟수 +1",
                effect: {
                    food: -1,
                    infection: -20,
                    treatmentCount: 1
                }
            },
            {
                name: "B",
                description: "부상당한 군인을 모른척하고 식량을 빼앗는다.",
                effectDescription:"체력 -10, 식량 +2",
                effect: {
                    hp: -10,
                    food: 2
                }
            }
        ]
    },
    {
        name: "임시 수술",
        description: "임시 수술을 받을 기회가 생겼다.",
        count: 3,
        choice: [
            {
                name: "A",
                description: "위험하지만 수술을 받는다.",
                effectDescription:"체력 -25, 감염 -25, 치료 횟수 +1",
                effect: {
                    hp: -25,
                    infection: -25,
                    treatmentCount: 1
                }
            },
            {
                name: "B",
                description: "수술을 포기하고 냅둔다.",
                effectDescription:"체력 -5, 감염 +10",
                effect: {
                    hp: -5,
                    infection: 10
                }
            }
        ]
    },
    {
        name: "군용 차량 행렬",
        description: "마침 군용 차량 행렬이 지나간다.",
        count: 3,
        choice: [
            {
                name: "A",
                description: "군용 차량 행렬을 돕는다",
                effectDescription:"감염 +8, 구조 횟수 +1",
                effect: {
                    infection: 8,
                    rescuePoint: 1
                }
            },
            {
                name: "B",
                description: "모른 척 한다.",
                effectDescription:"체력 +5",
                effect: {
                    hp: 5
                }
            }
        ]
    },
    {
        name: "오염된 웅덩이",
        description: "오염된 웅덩이를 발견했다.",
        count: 3,
        choice: [
            {
                name: "A",
                description: "허기를 달래기 위해 마신다.",
                effectDescription:"체력 +5, 감염 +15",
                effect: {
                    hp: 5,
                    infection: 15
                }
            },
            {
                name: "B",
                description: "허기를 참고 웅덩이를 피해간다.",
                effectDescription:"체력 -10",
                effect: {
                    hp: -10
                }
            }
        ]
    },
    {
        name: "구조 트럭",
        description: "버려진 구조 트럭을 발견했다.",
        count: 3,
        choice: [
            {
                name: "A",
                description: "구조 트럭에서 사람을 구한다.",
                effectDescription:"체력 -20, 구조 횟수 +1",
                effect: {
                    hp: -20,
                    rescuePoint: 1
                }
            },
            {
                name: "B",
                description: "모른척하고 구조물품만을 챙긴다.",
                effectDescription:"체력 +10",
                effect: {
                    hp: 10
                }
            }
        ]
    }
]
